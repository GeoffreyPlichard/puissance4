import { Injectable } from '@angular/core';
import { Cell } from './board';
import { PlayerService } from '../player/player.service';
import { PlayerTokens } from '../player/player';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public board = [];
  public tokensPerColumn = [];

  constructor(private playerService: PlayerService) { }


  /**
   * Generate the board, a 2D array
   * @param row number of rows
   * @param col number of columns
   * @returns The game board
   */
  public generateBoard(row: number, col: number) {
    for(let i = 0; i < row; i++) {
      this.board.push([]);
      for(let j = 0; j < col; j++) {
        this.board[i].push(new Cell("col-" + j, j, i));
      }
    }
    console.log(this.board);
    return this.board;
  }


  /**
   * Generate an array with the number of tokens available for each column
   * @param row number of rows
   * @param col number of columns
   */
  public generateTokensPerColumn(row: number, col: number) {
    for(let i = 0; i < col; i++) {
      this.tokensPerColumn[i] = row;
    }
  }

  public checkIfPlayerWon(currentCell, playingPlayer) {
      let playerTokens = new PlayerTokens(0, 0, 0, 0);
      console.log("PLAYER", playerTokens);

      // We loop 3 times to check 3 levels around the current cell
      for(let i = 1; i <=3; i++) {
        this.checkLeft(currentCell, playerTokens, i);
        this.checkLeftDown(currentCell, playerTokens, i);
        this.checkRightDown(currentCell, playerTokens, i);
        this.checkRight(currentCell, playerTokens, i);
        this.checkRightUp(currentCell, playerTokens, i);
        this.checkUp(currentCell, playerTokens, i);
        this.checkLeftUp(currentCell, playerTokens, i);
      }

      if(this.isConnectFour(playerTokens)) {
        alert('YOU WON BITCH');
      }

       console.log("PLAYER APRES", playerTokens);

  }

  public checkLeft(currentCell, playerTokens, index) {
    console.log("CHECK LEFT");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      let leftCell = this.board[currentCell.y][currentCell.x - index];
      console.log("LEFT CELL", leftCell);
      if(leftCell.player && leftCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["LR"] += 1;
      }
    }
  }

  public checkLeftDown(currentCell, playerTokens, index) {
    console.log("CHECK LEFT DOWN");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      if(currentCell.y - index >= 0) {
        let leftDownCell = this.board[currentCell.y - index][currentCell.x - index];
        console.log("LEFT DOWN CELL", leftDownCell);
        if(leftDownCell.player && leftDownCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LDRU"] += 1;
        }
      }
    }
  }

  public checkRightDown(currentCell, playerTokens, index) {
    console.log("CHECK RIGHT DOWN");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      if(currentCell.y - index >= 0) {
        let rightDownCell = this.board[currentCell.y - index][currentCell.x + index];
        console.log("RIGHT DOWN CELL", rightDownCell);
        if(rightDownCell.player && rightDownCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LURD"] += 1;
        }
      }
    }
  }

  public checkRight(currentCell, playerTokens, index) {
    console.log("CHECK RIGHT");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      let rightCell = this.board[currentCell.y][currentCell.x + index];
      console.log("RIGHT CELL", rightCell);
      if(rightCell.player && rightCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["LR"] += 1;
      }
    }
  }

  public checkRightUp(currentCell, playerTokens, index) {
    console.log("CHECK RIGHT UP");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      if(currentCell.y + index < 6) {
        let rightUpCell = this.board[currentCell.y + index][currentCell.x + index];
        console.log("RIGHT UP", rightUpCell);
        if(rightUpCell.player && rightUpCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LDRU"] += 1;
        }
      }
    }
  }

  public checkUp(currentCell, playerTokens, index) {
    console.log("CHECK UP");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.y + index < 6) {
      let upCell = this.board[currentCell.y + index][currentCell.x];
      console.log("UP", upCell);
      if(upCell.player && upCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["DU"] += 1;
      }
    }
  }

  public checkLeftUp(currentCell, playerTokens, index) {
    console.log("CHECK LEFT UP");
    console.log("CURRENT CELL", currentCell);
    console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      if(currentCell.y + index < 6) {
        let leftUpCell = this.board[currentCell.y + index][currentCell.x - index];
        console.log("LEFT UP", leftUpCell);
        if(leftUpCell.player && leftUpCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LURD"] += 1;
        }
      }
    }
  }


  /**
   * Check the player number of tokens
   * @param playerTokens The player tokens related to X(LR), Y(DU), XY(LURD), YX(LDRU)
   * @returns boolean
   */
  public isConnectFour(playerTokens: PlayerTokens) {
    for(let token in playerTokens) {
      if(playerTokens[token] === 3) {
        return true;
      }
    }
    return false;
  }



}
