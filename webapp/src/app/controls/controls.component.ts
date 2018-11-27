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
  c18z = true;

  /* norm options */
  norm = {
    'options': [
      {'name': 'Dry', 'selected': 'true'},
      {'name': 'Moist', 'selected': 'false'}
    ]
  };

  /* center options */
  centers = {
    'options': [
      {'name': 'EMC', selected: 'true'},
      {'name': 'GMAO', selected: 'false'},
      {'name': 'NRL', selected: 'false'},
      {'name': 'JMA_adj', selected: 'false'},
      {'name': 'JMA_ens', selected: 'false'},
      {'name': 'MET', selected: 'false'},
      {'name': 'MeteoFr', selected: 'false'}
    ]
  };

  /* platform options */
  platforms = ['Satellite', 'MODIS Wind'];

  normSummary = '';
  centersSummary = '';
  platformsSummary = '';

  constructor()
  {
  }


  ngOnInit()
  {
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

  showOptionDialog(): void
  {

  }
}
