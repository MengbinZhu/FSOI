import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit
{
  /* a default start date */
  startDate = new Date(2015, 1, 20); /* 2015-FEB-20 */

  /* a default end date */
  endDate = new Date(2015, 1, 28); /* 2015-FEB-28 */

  /* cycle options */
  c00z = false;
  c06z = false;
  c12z = false;
  c18z = false;

  /* norm options */
  norm = {
    'options': [
      {'name': 'Dry', 'selected': 'false'},
      {'name': 'Moist', 'selected': 'false'}
    ]
  };

  /* center options */
  centers = {
    'options': [
      {'name': 'EMC', 'selected': 'false'},
      {'name': 'GMAO', 'selected': 'false'},
      {'name': 'NRL', 'selected': 'false'},
      {'name': 'JMA', 'selected': 'false'},
      {'name': 'MET', 'selected': 'false'},
      {'name': 'MeteoFr', 'selected': 'false'}
    ]
  };

  /* platform options */
  platforms = {
    'EMC': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'NEXRAD Wind', 'selected': 'false'},
      {'name': 'Geo Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'RAPIDSCAT Wind', 'selected': 'false'},
      {'name': 'Ozone', 'selected': 'false'},
      {'name': 'TMI Rain Rate', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'},
      {'name': 'UNKNOWN', 'selected': 'false'}
    ],
    'GMAO': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'NEXRAD Wind', 'selected': 'false'},
      {'name': 'Geo Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'RAPIDSCAT Wind', 'selected': 'false'},
      {'name': 'Ozone', 'selected': 'false'},
      {'name': 'TMI Rain Rate', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'}
    ],
    'NRL': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'NEXRAD Wind', 'selected': 'false'},
      {'name': 'Geo Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'RAPIDSCAT Wind', 'selected': 'false'},
      {'name': 'Ozone', 'selected': 'false'},
      {'name': 'TMI Rain Rate', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'},
      {'name': 'LEO-GEO', 'selected': 'false'},
      {'name': 'WindSat', 'selected': 'false'},
      {'name': 'R/S AMV', 'selected': 'false'},
      {'name': 'Aus Syn', 'selected': 'false'},
      {'name': 'UAS', 'selected': 'false'},
      {'name': 'TPW', 'selected': 'false'},
      {'name': 'PRH', 'selected': 'false'}
    ],
    'JMA': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'NEXRAD Wind', 'selected': 'false'},
      {'name': 'Geo Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'RAPIDSCAT Wind', 'selected': 'false'},
      {'name': 'Ozone', 'selected': 'false'},
      {'name': 'TMI Rain Rate', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'},
      {'name': 'LEO-GEO', 'selected': 'false'},
      {'name': 'MTSAT', 'selected': 'false'},
      {'name': 'MVIRI', 'selected': 'false'},
      {'name': 'AMSR', 'selected': 'false'}
    ],
    'MET': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'NEXRAD Wind', 'selected': 'false'},
      {'name': 'Geo Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'RAPIDSCAT Wind', 'selected': 'false'},
      {'name': 'Ozone', 'selected': 'false'},
      {'name': 'TMI Rain Rate', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'},
      {'name': 'LEO-GEO', 'selected': 'false'},
      {'name': 'MTSAT', 'selected': 'false'},
      {'name': 'MVIRI', 'selected': 'false'},
      {'name': 'Ground GPS', 'selected': 'false'}
    ],
    'MeteoFr': [
      {'name': 'Radiosonde', 'selected': 'false'},
      {'name': 'Dropsonde', 'selected': 'false'},
      {'name': 'Ship', 'selected': 'false'},
      {'name': 'Buoy', 'selected': 'false'},
      {'name': 'Land Surface', 'selected': 'false'},
      {'name': 'Aircraft', 'selected': 'false'},
      {'name': 'PIBAL', 'selected': 'false'},
      {'name': 'GPSRO', 'selected': 'false'},
      {'name': 'Profiler Wind', 'selected': 'false'},
      {'name': 'GOES Wind', 'selected': 'false'},
      {'name': 'GMS Wind', 'selected': 'false'},
      {'name': 'Misc SatWind', 'selected': 'false'},
      {'name': 'METEOSAT Wind', 'selected': 'false'},
      {'name': 'MODIS Wind', 'selected': 'false'},
      {'name': 'AVHRR Wind', 'selected': 'false'},
      {'name': 'ASCAT Wind', 'selected': 'false'},
      {'name': 'Synthetic', 'selected': 'false'},
      {'name': 'AIRS', 'selected': 'false'},
      {'name': 'AMSUA', 'selected': 'false'},
      {'name': 'MHS', 'selected': 'false'},
      {'name': 'ATMS', 'selected': 'false'},
      {'name': 'CrIS', 'selected': 'false'},
      {'name': 'HIRS', 'selected': 'false'},
      {'name': 'IASI', 'selected': 'false'},
      {'name': 'GOES', 'selected': 'false'},
      {'name': 'Seviri', 'selected': 'false'},
      {'name': 'SSMIS', 'selected': 'false'},
      {'name': 'Ground GPS', 'selected': 'false'}
    ]
  };

  normSummary = '(0) No selections made';
  centersSummary = '(0) No selections made';
  platformsSummary = '(0) No selections made';

  constructor()
  {
  }


  ngOnInit()
  {
    this.normSummary      = this.createSummary(this.norm);
    this.centersSummary   = this.createSummary(this.centers);
    this.platformsSummary = this.createSummary(this.platforms);
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

        console.log(item['selected']);
        if (item['selected'] === 'true')
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
  showOptionDialog(selectMultiple: boolean): void
  {

  }
}
