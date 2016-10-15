const rules = {
    paper: {
        rock: true,
        scissors: false
    },
    rock: {
        paper: false,
        scissors: true
    },
    scissors: {
        rock: false,
        paper: true
    }
}

export default rules;