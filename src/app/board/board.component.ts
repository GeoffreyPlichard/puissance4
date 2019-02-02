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
  }

  public addToken(cell) {
    let targetedColumn = cell.y;
    this.board[5][cell.y].hasToken = true;
  }


  /**
   * Highlight the cell column
   * @param cell hovered cell
   */

  public highlightActiveColumn(cell) {
    this.highlightedColumn = cell.col;
  }

}
