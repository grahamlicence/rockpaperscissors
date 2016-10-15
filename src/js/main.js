require('../css/main.scss');

import arena from './arena';

const html = {
    status: {
        score: document.getElementsByClassName('status__score')[0],
        round: document.getElementsByClassName('status__round')[0],
        winner: document.getElementsByClassName('status__winner')[0]
    },
    type: document.getElementsByClassName('game__type')[0],
    player1: document.getElementsByClassName('player1__options')[0].getElementsByClassName('option'),
    player2: document.getElementsByClassName('player2__options')[0].getElementsByClassName('option'),
    restart: document.getElementsByClassName('game__restart')[0]
};

arena.init(html);
