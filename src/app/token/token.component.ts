import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  public tokenColor: string;
  public playingPlayer: Player;

  constructor(private playerService: PlayerService) { }

  
  /**
   * We switch the player after the token initialisation
   */
  ngOnInit() {
    this.playingPlayer = this.playerService.getPlayingPlayer();
    console.log("Le " + this.playingPlayer.pseudo + " vient de jouer");
    this.playerService.switchPlayer();
  }

}
