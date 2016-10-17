require('../css/main.scss');

import arena from './arena';

const html = {
    change: document.getElementsByClassName('game__change')[0],
    extend: document.getElementsByClassName('game__extend')[0],
    game: document.getElementsByClassName('game')[0],
    arena: document.getElementsByClassName('game__arena')[0],
    player1: document.getElementsByClassName('player1__options')[0].getElementsByClassName('option'),
    player2: document.getElementsByClassName('player2__options')[0].getElementsByClassName('option'),
    restart: document.getElementsByClassName('game__restart')[0],
    settings: document.getElementsByClassName('game__settings')[0],
    status: {
        moves: document.getElementsByClassName('status__moves')[0],
        round: document.getElementsByClassName('status__round')[0],
        score: document.getElementsByClassName('status__score')[0],
        score2: document.getElementsByClassName('status__score')[1],
        winner: document.getElementsByClassName('status__winner')[0]
    },
    toggle: document.getElementsByClassName('game__toggle')[0],
    type: document.getElementsByClassName('game__type')[0]
};

arena.init(html);
