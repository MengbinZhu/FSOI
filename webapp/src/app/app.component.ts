import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  viewMode = 'open';

  toggleViewMode()
  {
    this.viewMode = (this.viewMode === 'open' ? 'collapsed' : 'open');
  }
}
