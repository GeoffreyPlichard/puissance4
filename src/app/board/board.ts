import { Player } from '../player/player';

export class BoardConstants {
    public static get BOARD_ROWS(): number { return 6 }
    public static get BOARD_COLUMNS(): number { return 7 }
    public static get BOARD_TOKENS(): number { return 21 }
}

export interface Board {
}


export class Cell {

    public hasToken: boolean = false;
    public player: Player;

    constructor(public col: string, public x: number, public y: number) {

    }
}