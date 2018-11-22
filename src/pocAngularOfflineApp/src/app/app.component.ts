import { HockeyPlayer } from './swagger-generated/model/hockeyPlayer';
import { Component } from '@angular/core';
import { HockeyPlayersService } from './swagger-generated/api/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pocAngularOfflineApp';

  isDataAvailable: Boolean = false;
  refreshDate: Date = null;
  hockeyPlayers: HockeyPlayer[];

  constructor(private hockeyPlayersService: HockeyPlayersService) { }

  handleButtonClick(event: any) {
    console.log('Button clicked');
    this.hockeyPlayersService.getHockeyPlayers()
      .subscribe(
        hockeyPlayers => {
          this.hockeyPlayers = hockeyPlayers;
          this.refreshDate = new Date();
          this.isDataAvailable = this.hockeyPlayers && this.hockeyPlayers.length > 0;
        }
      );
  }

}
