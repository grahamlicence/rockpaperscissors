const rules = {
    rock: {
        paper: false,
        scissors: true
    },
    paper: {
        rock: true,
        scissors: false
    },
    scissors: {
        rock: false,
        paper: true
    }
}

export default rules;