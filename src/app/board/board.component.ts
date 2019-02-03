import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { BoardConstants } from './board';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board = [];
  public highlightedColumn = "";
  public playingPlayer: Player;

  constructor(private boardService: BoardService, private playerService: PlayerService) { }

  ngOnInit() {
    this.board = this.boardService.generateBoard(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.boardService.generateTokensPerColumn(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.playingPlayer = this.playerService.getPlayingPlayer();
  }

  public addToken(cell) {
    let targetedColumn = cell.x;
    let tokensLeftForTargetedColumn = this.boardService.tokensPerColumn;
    let targetedCell = this.board[tokensLeftForTargetedColumn[targetedColumn] - 1][targetedColumn];

    // Check if the column is not full
    if(tokensLeftForTargetedColumn[targetedColumn] > 0) {
      targetedCell.hasToken = true;
      this.playingPlayer = this.playerService.getPlayingPlayer();
      targetedCell.player = this.playingPlayer;
      this.boardService.tokensPerColumn[targetedColumn] --;
      this.boardService.checkIfPlayerWon(targetedCell, this.playingPlayer);
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
