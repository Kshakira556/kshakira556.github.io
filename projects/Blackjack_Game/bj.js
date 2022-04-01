let player = {
	name: prompt("Enter your name: "),
	chips: 0
}

let firstCard = 0;
let secondCard = 0;
let cards = []
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let currencyEl = document.getElementById("currency-el")

playerEl.textContent = player.name + ": $" + player.chips + " ";


function getRandomCard(){
	let randomNumber = Math.floor( Math.random() * 13) + 1;
	if (randomNumber === 1) {
		return 11
	} else if (randomNumber > 10) {
		return 10
		} else {
			return randomNumber
		}
}

function startGame() {
	isAlive = true;
	firstCard = getRandomCard();
	secondCard = getRandomCard();
	cards = [firstCard, secondCard]
	sum = firstCard + secondCard;
	renderGame()
}

function renderGame() {
	cardsEl.textContent = "Cards: "
	for (let i = 0; i < cards.length; i++){
		cardsEl.textContent += cards[i] + " ";
	}
	sumEl.textContent = "Sum: " + sum;
	if (sum <= 20) {
		message = "Do you want to draw a new card?";
	} else if (sum === 21) {
		message = "You've got BLACKJACK!";
		hasBlackjack = true;
	} else {
		message = "You're out of the game!";
		isAlive = false;
	}
	messageEl.textContent = message;
}

function newCard() {
	if (isAlive === true && hasBlackjack === false) {
	let thirdCard = getRandomCard();
	sum += thirdCard;
	cards.push(thirdCard);
	renderGame();
	} 
}

// bj/scrimba complete
// Todo-list:
	// 1. add dollar counting function
	// 3. add betting coins
	// 4. HP theme
	// 5. Card counting teacher feature
	// 6. Animate
	// 7. Sound effects
	// 8. Add dealer VS user 
	// 9. Restructure buttons to include "stand", "double", "hit", and "fold"
	// 10. Add deck logic and limitations
	// 11. Correct symbols for A, K, Q, J cards
	
