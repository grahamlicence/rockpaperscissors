import gamePlay from '../src/js/gamePlay';

describe('game play', () => {

    const players = {
        player1: '',
        player2: ''
    }

    it('should error if no player options set', () => {
        let outcome = gamePlay(players);
        expect(outcome).to.equal('error');
    });

    it('player1 should win with rock if player2 has scissors', () => {
        players.player1 = 'rock';
        players.player2 = 'scissors';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player1');
    });

    it('player1 should loose with rock if player2 has paper', () => {
        players.player2 = 'paper';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player2');
    });

    it('player1 should loose with scissors if player2 has rock', () => {
        players.player1 = 'scissors';
        players.player2 = 'rock';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player2');
    });

    it('player1 should win with scissors if player2 has paper', () => {
        players.player2 = 'paper';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player1');
    });

    it('player1 should loose with paper if player2 has scissors', () => {
        players.player1 = 'paper';
        players.player2 = 'scissors';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player2');
    });

    it('player1 should win with paper if player2 has rock', () => {
        players.player1 = 'paper';
        players.player2 = 'rock';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('player1');
    });

    it('player1 should draw with paper if player2 has paper ', () => {
        players.player1 = 'paper';
        players.player2 = 'paper';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('draw');
    });

    it('player1 should draw with rock if player2 has rock ', () => {
        players.player1 = 'rock';
        players.player2 = 'rock';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('draw');
    });

    it('player1 should draw with scissors if player2 has scissors ', () => {
        players.player1 = 'scissors';
        players.player2 = 'scissors';
        let outcome = gamePlay(players);
        expect(outcome).to.equal('draw');
    });


});
