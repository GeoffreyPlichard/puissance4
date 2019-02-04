import { Injectable, ViewChild, TemplateRef } from '@angular/core';

import { Cell, BoardConstants } from './board';
import { PlayerService } from '../player/player.service';
import { PlayerTokens, Player } from '../player/player';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public board = [];
  public tokensPerColumn = [];
  public playingPlayer: Player;
  public targetedCell: Cell;
  public totalTokens: number = BoardConstants.BOARD_TOKENS;

  constructor(private playerService: PlayerService) {

  }


  /**
   * Generate the board, a 2D array
   * @param row number of rows
   * @param col number of columns
   * @returns The game board
   */
  public generateBoard(row: number, col: number) {
    this.board = [];
    for(let i = 0; i < row; i++) {
      this.board.push([]);
      for(let j = 0; j < col; j++) {
        this.board[i].push(new Cell("col-" + j, j, i));
      }
    }
    return this.board;
  }

  public removeTokenFromTotal() {
    this.totalTokens --;
  }


  /**
   * Generate an array with the number of tokens available for each column
   * @param row number of rows
   * @param col number of columns
   */
  public generateTokensPerColumn(row: number, col: number) {
    this.tokensPerColumn = [];
    for(let i = 0; i < col; i++) {
      this.tokensPerColumn[i] = row;
    }
  }


  /**
   * Loop around the targeted cell to check if the player has won
   * @returns un boolean
   */
  public checkIfPlayerWon() {
      let playerTokens = new PlayerTokens(0, 0, 0, 0);

      // We loop 3 times to check 3 levels around the current cell
      for(let i = 1; i <=3; i++) {
        // In case we found already 2 tokens in the 1st loop, we do only 2 loops
        // TODO Find a better way to fix this case
        if(i === 2) {
          for(let token in playerTokens) {
            if(playerTokens[token] === 2) {
              i = 4;
            }
          }
        }
        this.checkLeft(this.targetedCell, playerTokens, i);
        this.checkLeftDown(this.targetedCell, playerTokens, i);
        this.checkRightDown(this.targetedCell, playerTokens, i);
        this.checkRight(this.targetedCell, playerTokens, i);
        this.checkRightUp(this.targetedCell, playerTokens, i);
        this.checkUp(this.targetedCell, playerTokens, i);
        this.checkLeftUp(this.targetedCell, playerTokens, i);
      }

       return this.isConnectFour(playerTokens);

  }

  // TODO REFACTOR !

  public checkLeft(currentCell, playerTokens, index) {
    // console.log("CHECK LEFT");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      let leftCell = this.board[currentCell.y][currentCell.x - index];
      // console.log("LEFT CELL", leftCell);
      if(leftCell.player && leftCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["LR"] += 1;
      }
    }
  }

  public checkLeftDown(currentCell, playerTokens, index) {
    // console.log("CHECK LEFT DOWN");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      if(currentCell.y - index >= 0) {
        let leftDownCell = this.board[currentCell.y - index][currentCell.x - index];
        // console.log("LEFT DOWN CELL", leftDownCell);
        if(leftDownCell.player && leftDownCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LDRU"] += 1;
        }
      }
    }
  }

  public checkRightDown(currentCell, playerTokens, index) {
    // console.log("CHECK RIGHT DOWN");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      if(currentCell.y - index >= 0) {
        let rightDownCell = this.board[currentCell.y - index][currentCell.x + index];
        // console.log("RIGHT DOWN CELL", rightDownCell);
        if(rightDownCell.player && rightDownCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LURD"] += 1;
        }
      }
    }
  }

  public checkRight(currentCell, playerTokens, index) {
    // console.log("CHECK RIGHT");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      let rightCell = this.board[currentCell.y][currentCell.x + index];
      // console.log("RIGHT CELL", rightCell);
      if(rightCell.player && rightCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["LR"] += 1;
      }
    }
  }

  public checkRightUp(currentCell, playerTokens, index) {
    // console.log("CHECK RIGHT UP");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x + index < 7) {
      if(currentCell.y + index < 6) {
        let rightUpCell = this.board[currentCell.y + index][currentCell.x + index];
        // console.log("RIGHT UP", rightUpCell);
        if(rightUpCell.player && rightUpCell.player.pseudo === currentCell.player.pseudo) {
          playerTokens["LDRU"] += 1;
        }
      }
    }
  }

  public checkUp(currentCell, playerTokens, index) {
    // console.log("CHECK UP");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.y + index < 6) {
      let upCell = this.board[currentCell.y + index][currentCell.x];
      // console.log("UP", upCell);
      if(upCell.player && upCell.player.pseudo === currentCell.player.pseudo) {
        playerTokens["DU"] += 1;
      }
    }
  }

  public checkLeftUp(currentCell, playerTokens, index) {
    // console.log("CHECK LEFT UP");
    // console.log("CURRENT CELL", currentCell);
    // console.log("PLAYER TOKENS", playerTokens);
    if(currentCell.x - index >= 0) {
      if(currentCell.y + index < 6) {
        let leftUpCell = this.board[currentCell.y + index][currentCell.x - index];
        // console.log("LEFT UP", leftUpCell);
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
