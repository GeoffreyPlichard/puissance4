import { Component } from '@angular/core';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'P4';

  constructor(private playerService: PlayerService) {
  }
  
  ngOnInit() {
    this.playerService.initPlayers();
  }
}
