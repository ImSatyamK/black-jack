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

let playerHand = []
let dealerHand = []

playEl.addEventListener('click', () => {
    playEl.style.visibility = 'hidden'
    welcomeEl.style.visibility = 'hidden'

    gameAreaEl.style.visibility = 'visible'
    newcardEl.style.visibility = 'visible'
    stopEl.style.visibility = 'visible'
    newgameEl.style.visibility = 'visible'

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
        endGame()
    }
}

function showCards(turn, reveal=true){
    let handEl = document.getElementById(`${turn}-hand`)
    
    if(turn === 'player'){
        handEl.textContent = `You: ${playerHand.join(', ')} Total: ${calculateScore(playerHand)}`
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
        endGame()
    }
})

stopEl.addEventListener('click', () => {
    dealerPlay()
    endGame()
})

function dealerPlay(){
    dealerScore = calculateScore(dealerHand)
    while(dealerScore < 17){
        distCards('dealer', 1)
        dealerScore = calculateScore(dealerHand)
    }
    showCards('dealer')
}

function endGame(){
    newcardEl.style.visibility = 'hidden'
    stopEl.style.visibility = 'hidden'
    plyerScore = calculateScore(playerHand)
    dealerScore = calculateScore(dealerHand)
    let gameOverEl = document.getElementById('game-over')
    if(plyerScore > 21){
        gameOverEl.textContent = 'You Bust! Dealer Wins!'
    }
    else if(dealerScore > 21){
        gameOverEl.textContent = 'Dealer Busts! You Win!'
    }
    else if(plyerScore > dealerScore){
        gameOverEl.textContent = 'You Win!'
    }
    else if(dealerScore > plyerScore){
        gameOverEl.textContent = 'Dealer Wins!'
    }
    else{
        gameOverEl.textContent = "It's a Tie!"
    }
    gameOverEl.style.visibility = 'visible'
}

newgameEl.addEventListener('click', () => {
    location.reload()
})
