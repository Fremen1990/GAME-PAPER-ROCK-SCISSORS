const summary = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll(".select img")]

function playerChoice() {
    game.playerHand = this.dataset.option;
    console.log(this.dataset.option);
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 10px black";
    return
}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

function gameResult(player, ai) {
    if (player === ai) {
        return "draw"
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win"
    } else return "lose"
}

function showResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai
    document.querySelector('.numbers span').textContent = ++summary.games
    if (result === "draw") {
        document.querySelector('[data-summary="who-win"]').textContent = "IT'S A DRAW ://"
        document.querySelector('[data-summary="who-win"]').style.color = "gray"
        document.querySelector('.draws span').textContent = ++summary.draws
    } else if (result === "win") {
        document.querySelector('[data-summary="who-win"]').textContent = "YOU ARE THE WINNER!!! :)"
        document.querySelector('[data-summary="who-win"]').style.color = "green"
        document.querySelector('.wins span').textContent = ++summary.wins
    } else {
        document.querySelector('[data-summary="who-win"]').textContent = "YOU LOOOSE! :("
        document.querySelector('[data-summary="who-win"]').style.color = "red"
        document.querySelector('.losses span').textContent = ++summary.losses
    }
}

function endGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}

function startGame() {
    if (!game.playerHand) return alert("PLEASE CHOOSE YOUR HAND AND TAKE A CHALLANGE ;)")
    game.aiHand = aiChoice()
    console.log(game.aiHand)
    gameResult(game.playerHand, game.aiHand)
    const result = gameResult(game.playerHand, game.aiHand)
    showResult(game.playerHand, game.aiHand, result)
    console.log(result)
    endGame()
}

document.querySelector(".start").addEventListener("click", startGame)

hands.forEach(hand => hand.addEventListener("click", playerChoice))