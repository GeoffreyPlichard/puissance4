export class Player {

    public score: number;

    constructor(public pseudo: string, 
                public color: string, 
                public isPlaying: boolean) {
 
    }
}

/**
* The player tokens grouped by axis 
*   - LD    =    LEFT DOWN
*   - LDRU  =    LEFT DOWN RIGHT UP
*   - DU    =    DOWN UP
*   - LURD  =    LEFT UP RIGHT DOWN
*/
export class PlayerTokens {
    constructor(public LR: number, 
                public LDRU: number, 
                public DU: number, 
                public LURD: number) {

    }
}