import {Component, OnInit, ViewChild} from '@angular/core';
import {OptionsComponent} from '../options/options.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit
{
  /* error messages */
  errorMessages = [];

  /* default values are not a valid request */
  invalidRequest = true;

  /* a default start date */
  startDate = new Date(2015, 1, 20); /* 2015-FEB-20 */

  /* a default end date */
  endDate = new Date(2015, 1, 28); /* 2015-FEB-28 */

  /* cycle options */
  c00z = false;
  c06z = false;
  c12z = false;
  c18z = true;

  /* norm options */
  norm = {
    'options': [
      {'name': 'Dry', 'selected': true},
      {'name': 'Moist', 'selected': false}
    ]
  };

  /* center options */
  centers = {
    'options': [
      {'name': 'EMC', 'selected': true},
      {'name': 'GMAO', 'selected': false},
      {'name': 'NRL', 'selected': false},
      {'name': 'JMA', 'selected': false},
      {'name': 'MET', 'selected': false},
      {'name': 'MeteoFr', 'selected': false}
    ]
  };

  /* platform options */
  platforms = {
    'EMC': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'UNKNOWN', 'selected': false}
    ],
    'GMAO': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false}
    ],
    'NRL': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'WindSat', 'selected': false},
      {'name': 'R/S AMV', 'selected': false},
      {'name': 'Aus Syn', 'selected': false},
      {'name': 'UAS', 'selected': false},
      {'name': 'TPW', 'selected': false},
      {'name': 'PRH', 'selected': false}
    ],
    'JMA': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'MTSAT', 'selected': false},
      {'name': 'MVIRI', 'selected': false},
      {'name': 'AMSR', 'selected': false}
    ],
    'MET': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'MTSAT', 'selected': false},
      {'name': 'MVIRI', 'selected': false},
      {'name': 'Ground GPS', 'selected': false}
    ],
    'MeteoFr': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'GOES Wind', 'selected': false},
      {'name': 'GMS Wind', 'selected': false},
      {'name': 'Misc SatWind', 'selected': false},
      {'name': 'METEOSAT Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'Ground GPS', 'selected': false}
    ]
  };

  normSummary = '(0) No selections made';
  centersSummary = '(0) No selections made';
  platformsSummary = '(0) No selections made';

  constructor(public dialog: MatDialog) {}


  ngOnInit()
  {
    this.updateSummaries();
    this.validateRequest();
  }

  updateSummaries(): void
  {
    this.normSummary      = this.createSummary(this.norm);
    this.centersSummary   = this.createSummary(this.centers);
    this.platformsSummary = this.createSummary(this.platforms);
    console.log(this.normSummary);
    console.log(this.centersSummary);
    console.log(this.platformsSummary);
  }

  showCycleHint(cycle): void
  {
    document.getElementById('cycle_hint').setAttribute('src', 'assets/hint-' + cycle + 'z.jpg');
  }

  clearCycleHint(): void
  {
    document.getElementById('cycle_hint').setAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
  }

  /**
   * Look through the data object and create a summary including the number
   * of selected items and a comma-separated list of the selected items.
   *
   * @param data An object from which to create a summary
   */
  createSummary(data: object): string
  {
    let summary = '';
    let count = 0;

    const types = Object.keys(data);
    for (let i = 0; i < types.length; i++)
    {
      for (let j = 0; j < data[types[i]].length; j++)
      {
        const item = data[types[i]][j];

        if (item['selected'] === true)
        {
          count++;
          if (count > 1)
          {
            summary += ', ';
          }
          summary += item['name'];
        }
      }
    }
    return '(' + count + ') ' + summary;
  }


  /**
   * Show a modal dialog with the available options
   */
  showOptionDialog(option: string, selectMultiple: boolean): void
  {
    let data;

    switch (option)
    {
      case 'norm':
        data = this.norm;
        break;
      case 'center':
        data = this.centers;
        break;
      case 'platform':
        data = this.platforms;
        let center = 'EMC';
        for (let i = 0; i < this.centers.options.length; i++)
        {
          if (this.centers.options[i].selected === true)
          {
            center = this.centers.options[i].name;
            break;
          }
        }
        this.platforms['options'] = this.platforms[center];
        break;
    }

    if (data === undefined)
    {
      console.log('Invalid option set: ' + option);
      return;
    }

    const dialogRef = this.dialog.open(OptionsComponent, {
      width: '600px',
      height: '800px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result =>
      {
        console.log('The dialog was closed');
        this.updateSummaries();
        this.validateRequest();
      }
    );
  }

  validateRequest(): void
  {
    this.errorMessages = [];

    /* validate the dates */
    if (this.startDate === undefined || this.endDate === undefined)
    {
      this.errorMessages[this.errorMessages.length] = 'start and end dates are required';
    }
    else if (this.startDate.getTime() >= this.endDate.getTime())
    {
      this.errorMessages[this.errorMessages.length] = 'end date must not be earlier than start date';
    }

    /* validate the cycles */
    if (!this.c00z && !this.c06z && !this.c12z && !this.c18z)
    {
      this.errorMessages[this.errorMessages.length] = 'at least one cycle must be selected';
    }

    /* validate the norms */
    let norms = 0;
    for (let i = 0; i < this.norm['options'].length; i++)
    {
      if (this.norm['options'][i]['selected'])
      {
        norms++;
      }
    }
    if (norms > 1)
    {
      this.errorMessages[this.errorMessages.length] = 'only one norm may be selected';
    }
    else if (norms === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'one norm must be selected';
    }

    /* validate the centers */
    let centers = 0;
    for (let i = 0; i < this.centers['options'].length; i++)
    {
      if (this.centers['options'][i]['selected'])
      {
        centers++;
      }
    }
    if (centers > 1)
    {
      this.errorMessages[this.errorMessages.length] = 'only one center may be selected';
    }
    else if (centers === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'one center must be selected';
    }

    /* validate the platforms */
    let platforms = 0;
    if (this.platforms['options'] !== undefined)
    {
      for (let i = 0; i < this.platforms['options'].length; i++)
      {
        if (this.platforms['options'][i]['selected'])
        {
          platforms++;
        }
      }
    }
    if (platforms === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'one or more platforms must be selected';
    }

    this.invalidRequest = this.errorMessages.length > 0;
  }

  timeout(func, ms): void
  {
    setTimeout(func.bind(this), ms);
  }

  changeDate(event): void
  {
    if (event['targetElement']['placeholder'] === 'Start Date')
    {
      this.startDate = event['value'];
    }
    else if (event['targetElement']['placeholder'] === 'End Date')
    {
      this.endDate = event['value'];
    }
    else
    {
      console.log('Date change event ignored.');
      console.log(event);
    }

    this.validateRequest();
  }

  submitRequest(): void
  {
    let url = 'https://xy4tm62l1a.execute-api.us-east-1.amazonaws.com/b1/chart';

    const startDate = '?start_date=' + this.dateToString(this.startDate);
    const endDate   = '&end_date=' + this.dateToString(this.endDate);
    let centers   = '&centers=';
    let norm      = '&norm=';
    const interval  = '&interval=24';
    let platforms = '&platforms=';
    let cycles    = '&cycles=';

    /* add centers */
    for (let i = 0; i < this.centers['options'].length; i++)
    {
      if (this.centers['options'][i]['selected'] === false)
      {
        continue;
      }

      if (i > 0)
      {
        centers += ',';
      }

      centers += this.centers['options'][i]['name'];
    }

    /* add norms */
    for (let i = 0; i < this.norm['options'].length; i++)
    {
      if (this.norm['options'][i]['selected'] === false)
      {
        continue;
      }

      if (i > 0)
      {
        norm += ',';
      }

      norm += this.norm['options'][i]['name'];
    }

    /* add platforms */
    for (let i = 0; i < this.platforms['options'].length; i++)
    {
      if (this.platforms['options'][i]['selected'] === false)
      {
        continue;
      }

      if (i > 0)
      {
        platforms += ',';
      }

      platforms += this.platforms['options'][i]['name'];
    }

    /* add the cycles */
    if (this.c00z) { cycles += '0,'; }
    if (this.c06z) { cycles += '6,'; }
    if (this.c12z) { cycles += '12,'; }
    if (this.c18z) { cycles += '18,'; }
    cycles = cycles.slice(0, -1);

    url += startDate + endDate + centers + norm + interval + platforms + cycles;
    console.log(url);
  }

  dateToString(date): string
  {
    return date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  }
}
