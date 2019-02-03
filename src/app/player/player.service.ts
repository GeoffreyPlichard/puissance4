import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public players = [];

  constructor() {}

  public initPlayers() {
    let player1: Player = new Player("Joueur 1", "r", true);
    let player2: Player = new Player("Joueur 2", "y", false);

    this.players.push(player1, player2);
  }

  public getPlayers() {
    return this.players;
  }

  public getPlayingPlayer() {
    for(let player of this.players) {
        if(player.isPlaying === true) {
            return player;
        }
    }
  }

  public switchPlayer() {
    for(let player of this.players) {
      player.isPlaying === true ? player.isPlaying = false : player.isPlaying = true;
    }
  }


}
