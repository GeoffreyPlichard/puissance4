import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { BoardConstants } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board = [];
  public highlightedColumn = "";

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.board = this.boardService.generateBoard(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.boardService.generateTokensPerColumn(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
  }

  public addToken(cell) {
    let targetedColumn = cell.y;
    let tokensLeftForTargetedColumn = this.boardService.tokensPerColumn;

    if(tokensLeftForTargetedColumn[targetedColumn] > 0) {
      this.board[tokensLeftForTargetedColumn[targetedColumn] - 1][cell.y].hasToken = true;
      this.boardService.tokensPerColumn[targetedColumn] --;
    }
  }


  /**
   * Highlight the cell column
   * @param cell hovered cell
   */

  public highlightActiveColumn(cell) {
    this.highlightedColumn = cell.col;
  }

}
