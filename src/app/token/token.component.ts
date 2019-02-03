import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() valueChange = new EventEmitter();

  constructor(private playerService: PlayerService) { }

  
  /**
   * We switch the player after the token initialisation
   */
  ngOnInit() {
    this.playingPlayer = this.playerService.getPlayingPlayer();
    console.log("Le " + this.playingPlayer.pseudo + " vient de jouer");
    this.playerService.switchPlayer();
    this.valueChange.emit(this.playerService.getPlayingPlayer());
    
  }


  
  // valueChanged() { // You can give any function name
  //   this.valueChange.emit(this.playingPlayer);
  // } 

}
