let chips = Number(localStorage.getItem("chips")) || 0;
let playerName;
let palyerHand = [];
let dealerHand = [];
let playerSum = 0;
let dealerSum = 0;

let cards = Array(4).fill(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']).flat();

function startGame(){
    document.getElementById("start-btn").style.visibility = "hidden";
    document.getElementById("ques").style.visibility = "hidden";
    document.getElementById("chips").textContent = "CHIPS: $" + chips;
    

    document.getElementById("name-input").style.visibility = "visible";
    document.getElementById("direction").style.visibility = "visible";
    document.getElementById("chip-adder").style.visibility = "visible";
    document.getElementById("chips").style.visibility = "visible";
    document.getElementById("save-btn").style.visibility = "visible";

}

function addChip(amount){
    chips += amount;
    document.getElementById("chips").textContent = "CHIPS: $" + chips;
}

function savePlayer(){
    if(chips <= 0){
        alert("Please add some chips before saving.");
        return;
    }
    
    playerName = (document.getElementById("name-input").value || "PLAYER") + ' : '; 

    document.getElementById("name-input").style.visibility = "hidden";
    document.getElementById("direction").style.visibility = "hidden";
    document.getElementById("chip-adder").style.visibility = "hidden";
    document.getElementById("save-btn").style.visibility = "hidden";

    document.getElementById("player-hand").textContent = playerName;
    console.log(playerName);
    document.getElementById("game-area").style.visibility = "visible";
    

    document.getElementById("new-card-btn").style.visibility = "visible";
    document.getElementById("stop-btn").style.visibility = "visible";
    document.getElementById("exit-btn").style.visibility = "visible";

    distCard(2, playerName);
    distCard(2, 'DEALER');
}

function distCard(noOfCards, recipient){
    if (recipient === 'DEALER' && dealerSum > 16){
        let show = showCards(dealerHand);
        document.getElementById("dealer-hand").textContent = "DEALER: " + show + " Total : " + String(total(dealerHand, recipient));
        return;
    }

    for(let i = 0; i < noOfCards; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        let card = cards[randomIndex];
        cards.splice(randomIndex, 1);

        if(recipient === playerName) {
            palyerHand.push(card);
            console.log(palyerHand);
        }
        else{
            dealerHand.push(card);
            console.log(dealerHand);
        }
    }


    if(recipient === playerName){
        let show = showCards(palyerHand);
        document.getElementById("player-hand").textContent = playerName + show + " Total : " + String(total(palyerHand, recipient));
    }
    else if(recipient === 'DEALER' && noOfCards === 2){
        document.getElementById("dealer-hand").textContent = "DEALER: " + dealerHand[0] + ' X '
    }else if(recipient === 'DEALER' && noOfCards === 1){
        let show = showCards(dealerHand);
        document.getElementById("dealer-hand").textContent = "DEALER: " + show + " Total : " + String(total(dealerHand, recipient));
    }

    
}

function total(hand, recipient){
    let sum = 0;
    let aces = 0;

    for(let i = 0; i < hand.length; i++){
        if(hand[i] === 'J' || hand[i] === 'Q' || hand[i] === 'K'){
            sum += 10;
        } else if(hand[i] === 'A'){
            aces += 1;
            sum += 11;
        } else {
            sum += parseInt(hand[i]);
        }
    }

    if (sum > 21 && aces > 0) {
        aces -= 1;
        sum -= 10;
    }

    if(recipient === playerName){
        playerSum = sum;
        return playerSum;
    } else if(recipient === 'DEALER'){
        dealerSum = sum;
        return dealerSum;
    }

}

function newCard(){
    distCard(1, playerName);
    if (playerSum > 21){
        endGame('player bust');
    }else if(playerSum === 21){
        endGame('player blackjack')
    }
    else{
        return;
    }
}

function stop(){
    while(dealerSum < 17){
        distCard(1, 'DEALER');
    }
    if(dealerSum > 21){
        endGame('dealer bust');
    }else if(dealerSum === 21){
        endGame('dealer blackjack');
    }else{
        endGame('compare');
    }
}

function endGame(result){
    if (result === 'player bust'){
        document.getElementById("game-over-text").textContent = "YOU BUST! DEALER WINS!";
        chips *= 0;
        document.getElementById("chips").textContent = "CHIPS: $" + chips;

    }else if(result === 'player blackjack'){
        document.getElementById("game-over-text").textContent = "BLACKJACK! YOU WIN!";
        chips *= 2.5;
        document.getElementById("chips").textContent = "CHIPS: $" + chips;

    }else if(result === 'dealer bust'){
        document.getElementById("game-over-text").textContent = "DEALER BUSTS! YOU WIN!";
        chips *= 2;
        document.getElementById("chips").textContent = "CHIPS: $" + chips;

    }else if(result === 'dealer blackjack'){
        document.getElementById("game-over-text").textContent = "DEALER HAS BLACKJACK! DEALER WINS!";
        chips *= 0;
        document.getElementById("chips").textContent = "CHIPS: $" + chips;

    }else if(result === 'compare'){
        if(playerSum > dealerSum){
            document.getElementById("game-over-text").textContent = "YOU WIN!";
            chips *= 2;
            document.getElementById("chips").textContent = "CHIPS: $" + chips;

        }else if(playerSum < dealerSum){
            document.getElementById("game-over-text").textContent = "DEALER WINS!";
            chips *= 0;
            document.getElementById("chips").textContent = "CHIPS: $" + chips;

        }else{
            document.getElementById("game-over-text").textContent = "IT'S A TIE!";
        }
    }

    document.getElementById("game-over-text").style.visibility = "visible";
    document.getElementById("new-card-btn").style.visibility = "hidden";
    document.getElementById("stop-btn").style.visibility = "hidden";
}

function showCards(cards){
    let show = ''
    console.log(cards.length)
    for (let i = 0; i < cards.length; i++){
        show += ' ' + cards[i]
    }
    return show;
}

function exit(){
    localStorage.setItem('chips', chips);

    location.reload();
}