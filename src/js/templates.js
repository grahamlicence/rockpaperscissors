/**
 * HTML templates for game
 */
const templates = {
    move(params) {
        return `<span class="move__option move__option--player1">${params.option1}</span> 
            ${params.divider} 
            <span class="move__option move__option--player2">${params.option2}</span>`;
    },
    previousMove(params) {
        return `<li class="move">
                    <span class="move__options">${params.option}</span> 
                    <span class="move__result">${params.result}</li>`;
    }
}

export default templates;