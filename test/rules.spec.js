import rules from '../src/js/rules';

describe('game rules', () => {

    it('should have rules', () => {
        expect(rules).to.be.a('object');
    });

});
