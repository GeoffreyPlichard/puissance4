import { Injectable } from '@angular/core';
import { Cell } from './board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public board = [];
  public tokensPerColumn = [];

  constructor() { }

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
        this.board[i].push(new Cell("col-" + j, i, j));
      }
    }
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


}
