let deck = ['A','2','3','4','5','6','7','8','9','10','J','K','Q',
            'A','2','3','4','5','6','7','8','9','10','J','K','Q',
            'A','2','3','4','5','6','7','8','9','10','J','K','Q',
            'A','2','3','4','5','6','7','8','9','10','J','K','Q']

let playEl = document.getElementById('play-btn')
let blackjackEl = document.getElementById('blackjack')
let welcomeEl = document.getElementById('welcome')
let gameAreaEl = document.getElementById('game-area')
let newcardEl = document.getElementById('new-card-btn')
let stopEl = document.getElementById('stop-btn')
let newgameEl = document.getElementById('new-game-btn')
let playerNameEl = document.getElementById('player-name')
let chipsEl = document.getElementById('chips')
let chipDisplayEl = document.getElementById('chip-display')
let playerDisplayEl = document.getElementById('player-display')
let playerName
let chips

let playerHand = []
let dealerHand = []

playEl.addEventListener('click', () => {
    playerName = document.getElementById('player-name').value
    chips = parseInt(document.getElementById('chips').value)

    if (playerName.trim().length === 0 || (!chips || chips <= 0)){
        alert('Please enter your name and valid chips to play!')
        return
    }

    playerNameEl.style.visibility = 'hidden'
    chipsEl.style.visibility = 'hidden'

    playEl.style.visibility = 'hidden'
    welcomeEl.style.visibility = 'hidden'

    playerDisplayEl.textContent = `${playerName}: `
    gameAreaEl.style.visibility = 'visible'
    newcardEl.style.visibility = 'visible'
    stopEl.style.visibility = 'visible'
    newgameEl.style.visibility = 'visible'
    chipDisplayEl.style.visibility = 'visible'
    chipDisplayEl.textContent = `Chips: ${chips}`

    distCards('player', 2)
    distCards('dealer', 2)
    showCards('player')
    showCards('dealer', false)
})

function distCards(turn, num){
    for(let i = 0; i < num; i++){
        let randomIndex = Math.floor(Math.random() * deck.length)
        let card = deck[randomIndex]
        if(turn === 'dealer') {hand = dealerHand}
        else {hand = playerHand}
        hand.push(card)
        deck.splice(randomIndex, 1)
    }

    score = calculateScore(hand)
    if (score === 21){
        endGame(turn, 'blackjack')
    }
}

function showCards(turn, reveal=true){
    let handEl = document.getElementById(`${turn}-display`)
    
    if(turn === 'player'){
        handEl.textContent = `${playerName}: ${playerHand.join(', ')} Total: ${calculateScore(playerHand)}`
    }
    else{
        if(reveal){
            handEl.textContent = `Dealer: ${dealerHand.join(', ')} Total: ${calculateScore(dealerHand)}`
        }
        else{
            handEl.textContent = `Dealer: ${dealerHand[0]}, ?`
        }
    }
}

function calculateScore(hand){
    let score = 0
    let aceCount = 0
    for(let card of hand){
        if(card === 'J' || card === 'Q' || card === 'K'){
            score += 10
        }
        else if(card === 'A'){
            aceCount += 1
            score += 11
        }
        else{
            score += parseInt(card)
        }
    }

    while(score > 21 && aceCount > 0){
        score -= 10
        aceCount -= 1
    }
    return score
}

newcardEl.addEventListener('click', () => {
    distCards('player', 1)
    showCards('player')
    plyerScore = calculateScore(playerHand)
    if(plyerScore > 21){
        endGame('dealer', 'bust')
    }
})

stopEl.addEventListener('click', () => {
    if (calculateScore(playerHand) > 21){
        endGame('delear', 'bust')
        return
    }
    dealerPlay()
})

function dealerPlay(){
    dealerScore = calculateScore(dealerHand)
    while(dealerScore < 17){
        distCards('dealer', 1)
        dealerScore = calculateScore(dealerHand)
    }
    showCards('dealer')
    if (dealerScore > 21){
        console.log(dealerScore)
        endGame('player', 'bust')
        return
    }
    endGame()
}

function endGame(winner = null, result = null){
    let gameOverEl = document.getElementById('game-over')
    newcardEl.style.visibility = 'hidden'
    stopEl.style.visibility = 'hidden'
    gameOverEl.style.visibility = 'visible'
    showCards('dealer', true)
    if (winner === 'player'){
        chipDisplayEl.textContent = `Chips: ${chips * 2}`
    }else if (winner === 'dealer'){
        chipDisplayEl.textContent = `Chips: 0`
    }

    if (winner && result === 'bust'){
        if(winner === 'player'){
            gameOverEl.textContent = 'Dealer Busts! You Win!'
        }
        else{
            gameOverEl.textContent = 'You Bust! Dealer Wins!'
        }
        return
    } else if (winner && result === 'blackjack'){
       if (winner === 'player'){
            gameOverEl.textContent = 'Blackjack! You Win!'
       }else{
            gameOverEl.textContent = 'Dealer has Blackjack! Dealer Wins!'
       }
       return
    } else{
        plyerScore = calculateScore(playerHand)
        dealerScore = calculateScore(dealerHand)

        if(plyerScore > dealerScore){
            gameOverEl.textContent = 'You Win!'
            winner = 'player'
        }
        else if(dealerScore > plyerScore){
            gameOverEl.textContent = 'Dealer Wins!'
            winner = 'dealer'
        }
        else{
            gameOverEl.textContent = "It's a Tie!"
        }
    }
    if (winner === 'player'){
        chipDisplayEl.textContent = `Chips: ${chips * 2}`
    }else if (winner === 'dealer'){
        chipDisplayEl.textContent = `Chips: 0`
    }

}

newgameEl.addEventListener('click', () => {
    location.reload()
})
