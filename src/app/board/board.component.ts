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

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.board = this.boardService.generateBoard(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
  }

}
