import templates from '../src/js/templates';

describe('html templates', () => {

    it('should return populated markup', () => {
        const params = {
                divider: '<',
                option1: 'rock',
                option2: 'paper'
            },

            // clear any whitespace for comparison
            move = templates.move(params).replace(/ /g, ''),
            expectedMove = `<span class="move__option move__option--player1">rock</span> 
                < 
                <span class="move__option move__option--player2">paper</span>`.replace(/ /g, '');
        
        expect(move).to.equal(expectedMove);
    });

});
