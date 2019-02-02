import { Component } from '@angular/core';
import { Player } from './player/player';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'P4';
  public playingPlayer: Player;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playingPlayer = this.playerService.getPlayingPlayer();
  }
}
