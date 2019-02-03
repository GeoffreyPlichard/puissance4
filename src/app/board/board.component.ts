import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { BoardConstants, VictoryCase } from './board';
import { Player } from '../player/player';

import { BoardService } from './board.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board = [];
  public highlightedColumn = "";
  VictoryCase = VictoryCase;
  public victoryCase: VictoryCase;
  public playingPlayer: Player;
  public winner: Player;
  public players;

  @ViewChild('playAgainTemplate') playAgainModal: TemplateRef<any>;
  public modalRef: BsModalRef;
  private modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };


  constructor(private boardService: BoardService, 
              private playerService: PlayerService, 
              private modalService: BsModalService) { }


  ngOnInit() {
    this.board = this.boardService.generateBoard(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.boardService.generateTokensPerColumn(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.players = this.playerService.getPlayers();
    this.playingPlayer = this.playerService.getPlayingPlayer();
    console.log("INIT", this.playingPlayer);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  updatePlayingPlayer(playingPlayer) {
    this.playingPlayer = playingPlayer;
  }


  confirm(): void {
    this.startAgain();
    this.modalRef.hide();
  }

  public addToken(cell) {
    let targetedColumn = cell.x;
    let tokensLeftForTargetedColumn = this.boardService.tokensPerColumn;
    
    // Check if the column is not full
    if(tokensLeftForTargetedColumn[targetedColumn] > 0) {
      let targetedCell = this.board[tokensLeftForTargetedColumn[targetedColumn] - 1][targetedColumn];
      targetedCell.hasToken = true;
      this.playingPlayer = this.playerService.getPlayingPlayer();
      targetedCell.player = this.playingPlayer;

      this.boardService.tokensPerColumn[targetedColumn] --;
      this.boardService.removeTokenFromTotal();
      this.boardService.targetedCell = targetedCell;
      this.boardService.playingPlayer = this.playerService.getPlayingPlayer();
      this.isEnd();
    }

  }

  public getTokenLeft() {
    return this.boardService.totalTokens;
  }

  /**
   * Highlight the cell column
   * @param cell hovered cell
   */

  public highlightActiveColumn(cell) {
    this.highlightedColumn = cell.col;
  }


  /**
   * Check if the game is over
   */
  public isEnd() {
    if(this.boardService.checkIfPlayerWon()) {
      this.playingPlayer.score ++;
      this.winner = this.playingPlayer;
      this.victoryCase = VictoryCase.Win;
      this.openModal(this.playAgainModal);
    } else if(this.boardService.totalTokens <= 0) {
      this.victoryCase = VictoryCase.Draw;
      this.openModal(this.playAgainModal);
    }
  }

  public startAgain() {
    this.board = this.boardService.generateBoard(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.boardService.generateTokensPerColumn(BoardConstants.BOARD_ROWS, BoardConstants.BOARD_COLUMNS);
    this.boardService.totalTokens = BoardConstants.BOARD_TOKENS;
    this.playerService.initPlayingPlayerTo1();
    this.playingPlayer = this.playerService.getPlayingPlayer();
  }
}
