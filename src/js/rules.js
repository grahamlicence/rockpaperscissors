const rules = {
    rock: {
        paper: false,
        scissors: true,
        lizard: true,
        spock: false
    },
    paper: {
        rock: true,
        scissors: false,
        spock: true,
        lizard: false
    },
    scissors: {
        rock: false,
        paper: true,
        lizard: true,
        spock: false
    },
    lizard: {
        rock: false,
        paper: true,
        spock: true,
        scissors: false
    },
    spock: {
        rock: true,
        scissors: true,
        lizard: false,
        paper: false
    }
}

export default rules;