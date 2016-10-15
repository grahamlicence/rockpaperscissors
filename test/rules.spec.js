import rules from '../src/js/rules';

describe('game rules', () => {

    it('should have rules', () => {
        expect(rules).to.be.a('object');
    });

    it('should have an odd number of rules', () => {
        const isOdd = (Object.keys(rules).length % 2) === 1;
        expect(isOdd).to.be.true;
    });

});
