class Players {
    constructor(p1, p2) {
       this._players = [p1, p2];
       this._turns = [null, null]
    }

    _onTurn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
    }
}

module.exports = Players;