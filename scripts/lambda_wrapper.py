"""
This script is an entry point for an AWS Lambda function to download
H5 files from S3 and create plots using existing functions.
"""


def lambda_gen_fsoi_chart(event, context):
    """
    Create a chart as a PNG based on the input parameters
    :param event: Contains the HTTP request
    :param context: Contains details of the lambda function
    :return: The HTTP response, including Base64-encoded PNG
    """

    request = validate_request(event['queryStringParameters'])
    hash_value = hash_request(request)
    print('Request hash: ' + hash_value)

    key_list = get_cached_object_keys(hash_value)

    if key_list is None:
        prepare_working_dir(request)
        download_s3_objects(request)
        process_bulk_stats(request)
        process_fsoi_summary(request)
        key_list = cache_summary_plots_in_s3(hash_value, request)

    body = create_response_body(key_list)
    return create_response(body)


def validate_request(request):
    """
    Validate and sanitize all of the request parameters
    :param request: The request from the user
    :return: A validated and sanitized request or None
    """
    import os
    # TODO: Validate the request
    request['centers'] = request['centers'].split(',')
    request['cycles'] = request['cycles'].split(',')
    request['root_dir'] = os.environ['FSOI_ROOT_DIR']
    return request


def get_cached_object_keys(hash_value):
    """
    Determine if a request's results are available in the S3 cache
    :param hash_value: The hash value of the request
    :return: A list of object keys or None
    """
    import boto3
    import os

    # get the name of the s3 bucket used for caching results
    bucket = os.environ['CACHE_BUCKET']

    # get an S3 client
    s3 = boto3.client('s3')

    # get a list of objects
    objects = s3.list_objects_v2(Bucket=bucket, Prefix=hash_value)

    # if there are any objects returned
    if objects['KeyCount'] == 0:
        return None

    # extract a list of object keys
    keys = []
    for item in objects['Contents']:
        keys.append(item['Key'])
    return keys


def prepare_working_dir(request):
    """
    Create all of the necessary empty directories
    :param request: {dict} A validated and sanitized request object
    :return: {bool} True=success; False=failure
    """
    import os

    root_dir = request['root_dir']

    required_dirs = [root_dir, root_dir+'/work', root_dir+'/data', root_dir+'/plots/summary']
    for center in request['centers']:
        required_dirs.append(root_dir + '/plots/summary/' + center)

    for required_dir in required_dirs:
        if not os.path.exists(required_dir):
            os.makedirs(required_dir)
        elif os.path.isfile(required_dir):
            return False

    temp_files = [request['root_dir'] + '/work/EMC/dry/group_stats.pkl']
    for temp_file in temp_files:
        if os.path.exists(temp_file):
            os.remove(temp_file)

    return True


def download_s3_objects(request):
    """
    Download all required objects from S3
    :param request: {dict} A validated and sanitized request object
    :return: {bool} True=success; False=failure
    """
    import boto3
    import os

    bucket = os.environ['DATA_BUCKET']
    prefix = os.environ['OBJECT_PREFIX']
    data_dir = request['root_dir'] + '/data'

    get_s3_object_urls(request)
    s3 = boto3.client('s3')

    objs = get_s3_object_urls(request)
    for obj in objs:
        # create the local file name
        local_dir = data_dir+'/'+obj[:obj.rfind('/')]+'/'
        local_file = obj[obj.rfind('/')+1:]

        # create the local directory if needed
        if not os.path.exists(local_dir):
            os.makedirs(local_dir)

        # check to see if we already have the file
        if os.path.exists(local_dir + local_file):
            continue

        # download the file from S3
        print('Downloading S3 object: s3://%s/%s/%s' % (bucket, prefix, obj))
        s3.download_file(Bucket=bucket, Key=prefix+'/'+obj, Filename=local_dir+local_file)
        if not os.path.exists(local_dir + local_file):
            print('Could not download S3 object: s3://%s/%s/%s' % (bucket, prefix, obj))

    return True


def process_bulk_stats(request):
    """
    Run the summary_bulk.py script on the data we have downloaded
    :param request: {dict} A validated and sanitized request object
    :return: None
    """
    import sys
    import os
    from summary_bulk import summary_bulk_main

    # delete previous work file
    work_file = request['root_dir'] + 'work/' + request['centers'][0] + '/dry/bulk_stats.h5'
    if os.path.exists(work_file):
        os.remove(work_file)

    sys.argv = ['script',
                '--center',
                request['centers'][0],
                '--norm',
                request['norm'],
                '--rootdir',
                request['root_dir'],
                '--begin_date',
                request['start_date'] + request['cycles'][0],
                '--end_date',
                request['end_date'] + request['cycles'][0],
                '--interval',
                '24']

    summary_bulk_main()


def process_fsoi_summary(request):
    """
    Run the fsoi_summary.py script on the bulk statistics
    :param request: {dict} A validated and sanitized request object
    :return: None
    """
    import sys
    from summary_fsoi import summary_fsoi_main

    sys.argv = [
        'script',
        '--center',
        request['centers'][0],
        '--norm',
        request['norm'],
        '--rootdir',
        request['root_dir'],
        '--savefigure',
        '--cycle'
    ]
    for cycle in request['cycles']:
        sys.argv.append(cycle)

    summary_fsoi_main()


def dates_in_range(start_date, end_date):
    """
    Get a list of dates in the range
    :param start_date: {str} yyyyMMdd
    :param end_date:  {str} yyyyMMdd
    :return: {list} List of dates in the given range (inclusive)
    """
    from datetime import datetime as dt

    start_year = int(start_date[0:4])
    start_month = int(start_date[4:6])
    start_day = int(start_date[6:8])
    start = dt(start_year, start_month, start_day)
    s = int(start.timestamp())

    end_year = int(end_date[0:4])
    end_month = int(end_date[4:6])
    end_day = int(end_date[6:8])
    end = dt(end_year, end_month, end_day)
    e = int(end.timestamp())

    dates = []
    for ts in range(s, e + 1, 86400):
        d = dt.utcfromtimestamp(ts)
        dates.append('%04d%02d%02d' % (d.year, d.month, d.day))

    return dates


def get_s3_object_urls(request):
    """
    Get a list of the S3 object URLs required to complete this request
    :param request: {dict} A validated and sanitized request object
    :return: {list} A list of S3 object URLs
    """
    start_date = request['start_date']
    end_date = request['end_date']
    centers = request['centers']
    norm = request['norm']
    cycles = request['cycles']

    s3_objects = []
    for date in dates_in_range(start_date, end_date):
        for center in centers:
            for cycle in cycles:
                s3_objects.append('%s/%s.%s.%s%s.h5' % (center, center, norm, date, cycle))

    return s3_objects


def create_response(body):
    """
    Create a successful response with the given body
    :param body: The body of the response message
    :return: An HTTP response message
    """
    import base64

    response = dict()
    response['isBase64Encoded'] = True
    response['headers'] = {}
    response['headers']['Content-Type'] = 'text/json'
    response['headers']['Content-Encoding'] = 'utf-8'
    response['headers']['Access-Control-Allow-Origin'] = '*'
    response['headers']['Access-Control-Allow-Credentials'] = True
    response['body'] = base64.b64encode(body.encode('utf-8')).decode('utf-8')

    return response


def create_response_body(key_list):
    """
    Create a response body with URLs to all created images
    :param key_list: {list} A list of S3 keys to images
    :return: {str} A JSON string to be used for a response body
    """
    import os
    import json

    # get values from the environment
    bucket = os.environ['CACHE_BUCKET']
    region = os.environ['REGION']

    # create an empty response
    response = {'images': []}

    # add each key in the list to the response
    for key in key_list:
        center = key.split('/')[1].split('_')[0]
        typ = key.split('/')[1].split('_')[1]
        url = 'http://%s.s3-website-%s.amazonaws.com/%s' % (bucket, region, key)
        response['images'].append({'center': center, 'type': typ, 'url': url})

    # return the response body as a string
    return json.dumps(response)


def cache_summary_plots_in_s3(hash_value, request):
    """
    Copy all of the new summary plots to S3
    :param hash_value: {str} The hash value of the request
    :param request: {dict} The full request
    :return: None
    """
    import boto3
    import os

    # retrieve relevant environment variables
    bucket = os.environ['CACHE_BUCKET']
    root_dir = os.environ['FSOI_ROOT_DIR']
    img_dir = root_dir + '/plots/summary'

    # list of files to cache
    files = [
        img_dir + '/__CENTER__/__CENTER___ImpPerOb_18Z.png',
        img_dir + '/__CENTER__/__CENTER___FracImp_18Z.png',
        img_dir + '/__CENTER__/__CENTER___ObCnt_18Z.png',
        img_dir + '/__CENTER__/__CENTER___TotImp_18Z.png',
        img_dir + '/__CENTER__/__CENTER___FracNeuObs_18Z.png',
        img_dir + '/__CENTER__/__CENTER___FracBenObs_18Z.png'
    ]

    # create the s3 client
    s3 = boto3.client('s3')

    # loop through all centers and files
    key_list = []
    for center in request['centers']:
        for file in files:
            # replace the center in the file name
            filename = file.replace('__CENTER__', center)
            if os.path.exists(filename):
                print('Uploading %s to S3...' % filename)
                key = hash_value + '/' + filename[filename.rfind('/') + 1:]
                s3.upload_file(Filename=filename, Bucket=bucket, Key=key)
                key_list.append(key)

    return key_list


def hash_request(request):
    """
    Create a hash of the request data
    :param request: {dict} A validated and sanitized request object
    :return:
    """
    import json
    import base64
    import hashlib

    req_str = json.dumps(request)
    hasher = hashlib.sha256()
    hasher.update(req_str.encode('utf-8'))
    return base64.b16encode(hasher.digest()).decode()


if __name__ == '__main__':
    import json

    global_event = {
        'queryStringParameters': {
            'start_date': '20150220',
            'end_date': '20150222',
            'centers': 'EMC',
            'norm': 'dry',
            'interval': '24',
            'platforms': 'ASCAT Wind,Satellite Wind,MODIS Wind',
            'cycles': '18'
        }
    }

    global_response = lambda_gen_fsoi_chart(global_event, None)
    print(json.dumps(global_response, indent='  '))
