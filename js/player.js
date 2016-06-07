"use strict";

function Player(name, deck){
	this.name = name;
	this.hand = []
	for(var i = 0; i < 2; i++){
		this.hand.push(deck.draw());	
	}
}

Player.prototype.drawCard = function(deck){
	this.hand.push(deck.draw());
}

Player.prototype.getHandValue = function(){
	var handValue = 0; 
	var aces = 0;
	var card;
	for(var i = 0; i < this.hand.length; i++){
		card = this.hand[i];
		if(card.value == 'J' || card.value == 'Q' || card.value == 'K'){
			handValue += 10;
		}
		else if(card.value == 'A'){
			handValue += 11;
			aces ++;
		}
		else{
			handValue += card.value;
		}
	}
	if(aces > 0){
		for(var i = 0; i < aces; i++){
			if(handValue > 21){
				handValue -= 10;
			}
		}  
	} 
	return handValue;	
}


// once bets are finalized, compare hand with dealer
Player.prototype.getOutcome = function(dealer){ // dealer is another player object
	var myHand = this.getHandValue();
	var dealerHand = dealer.getHandValue();
	if(myHand > 21){
		return "Lose";
	} else if(myHand == 21){
		if(dealerHand == 21){
			return "Tie"; 
		}
		else {
			return "Blackjack";
		}
	} else if(dealerHand > 21) {
		return "Win";
	} else {
		if(dealerHand > myHand){
			return "Lose";
		} else if (myHand > dealerHand) {
			return "Win";
		} else {
			return "Tie";
		}
	}
	
}
