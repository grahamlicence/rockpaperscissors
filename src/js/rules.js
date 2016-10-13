const rules = {
    paper: {
        rock: true,
        scissors: false
    },
    rock: {
        paper: true,
        scissors: false
    },
    scissors: {
        rock: true,
        paper: false
    }
}

export default rules;