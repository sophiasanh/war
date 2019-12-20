/*----- constants -----*/
const cardValues = {
    'ace': 14,
    'king': 13,
    'queen': 12,
    'jack': 11
}
const DECK = makeDeck();
const callToAction = ['win', 'war', 'score', 'shuffle', 'deal', 'war pop up']


/*----- declare app's state (variables) -----*/
let message;
let player1Card;
let player2Card;
let player1Deck;
let player2Deck;
let gameDeck;
let cardImage;
let cardsLeft;
let p1Score = 0
let p2Score = 0





/*----- cached element references -----*/

const gameMessage = document.getElementById('gameMessage')
const dealBtn = document.getElementById('deal')
const columnOne = document.getElementById('column-one')
const columnTwo = document.getElementById('column-two')
const columnThree = document.getElementById('column-three')
const player1CardImage = document.querySelector('.player-1-card')
const player2CardImage = document.querySelector('.player-2-card')
const player1Score = document.getElementById('player-1-score')
const player2Score = document.getElementById('player-2-score')
const cardsLeft1 = document.getElementById('cards-left-1')
const cardsLeft2 = document.getElementById('cards-left-2')
const warSound = document.getElementById('warSound');
const winSound = document.getElementById('winSound');


/*----- event listeners -----*/
dealBtn.addEventListener('click', deal)


/*----- functions -----*/

function init() {
    gameDeck = [...shuffleDeck([...DECK])]
    console.log(gameDeck);
    message = "Good Luck"
    player1Deck = [...gameDeck.splice(0, Math.ceil(gameDeck.length / 2))]; // split deck
    player2Deck = [...gameDeck]; 
    render();
}

init()

function render() {

    gameMessage.innerText = message
    player1CardImage.src = `images/PNG-cards-1.3/${player1Card.imgUrl}`
    player2CardImage.src = `images/PNG-cards-1.3/${player2Card.imgUrl}`
    cardsLeft1.innerText = `CARDS LEFT ${player1Deck.length}`
    cardsLeft2.innerText = `CARDS LEFT ${player2Deck.length}`
    player1Score.innerText = `PLAYER 1 SCORE: ${p1Score}`
    player2Score.innerText = `PLAYER 2 SCORE: ${p2Score}`
    // playWarSound.src = '423115__ogsoundfx__guns-explosions-album-machine-gun-1.wav: ${warSound}'
    // playWinSound.src = '495005__0ev__win-video-game-sound.wav: ${winSound}'

  
}

function Shuffledeck() {
    var i = 0
      , j = 0
      , temp = null
  
    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
  }

function deal(){
    player1Card = player1Deck.pop()
    player2Card = player2Deck.pop()
    // message = `${player1Card}`
    // cardImage = player1Card
    compare();
}

function compare() {
    let winner = player1Card.value > player2Card.value ? "player 1" : "player 2"
    message = `winner ${winner}`
    if(winner === "player 1") {
        p1Score++
        player1Deck.unshift(player2Card, player1Card)
    } else {
        p2Score++
        player2Deck.unshift(player2Card, player1Card)
    }
    checkForWinner()
    render();
}


function makeDeck() {    
    const deck = []
    const cardGame = {
        suit: ['spades', 'hearts', 'diamonds', 'clubs'],
        cards: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
    };
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 13; j++) {
            deck.push({
                imgUrl: `${cardGame.cards[j]}_of_${cardGame.suit[i]}.png`,
                value: isNaN(cardGame.cards[j]) 
                    ? cardValues[cardGame.cards[j]] 
                    : cardGame.cards[j]
            })
        }
    }
    return deck
}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function checkForWinner() {
    // if either deck is empty, game over, player 1 or player 2 wins
    if( player1Deck.length === 0 || player2Deck.length === 0 ){
        if( player2Deck.length === 0 ) {
        console.log('Player1 Won');
        } else {
        console.log('Player2 Won');
        }
        return false;
    }
    winSound.play()
}

function checkScore () {
    if( player1Card > player2Card ) {
        console.log(player1Card)
        return callToAction = "score"
    }
    else if( player2Card > player1Card ) {   
        return callToAction = "score"
    }
    else if( player1Card >= player2Card) {
        warSound.play()
        return callToAction = "war" 
    }
}
    // $(".495005__0ev__win-video-game-sound.wav").trigger('load');

// function playWinSound(play) {
//     if( player1Card > player2Card) {
//                $(".495005__0ev__win-video-game-sound.wav").trigger('winSound')
//                return callToAction = "score"
//     }
//     else if( player2Card > player1Card) {
//         $(".495005__0ev__win-video-game-sound.wav").trigger('winSound')
//         return callToAction = "winSound"
//     }
//  }

    




    

