"use strict";

var suits = ['S', 'C', 'D', 'H'];

var nnv = ['A', 'J', 'Q', 'K'];// non-number values

function Card(value, suit){	
	this.value = value; // could be int or string
	this.suit = suit;
}

function Deck(){
	this.cards = [];
	var i; 
	var j; 
	var k; 
	for (i = 0; i < suits.length; i++){
		for (j = 2; j <= 10; j++){
			var card = new Card(j, suits[i]);
			this.cards.push(card);
		}
		for (k = 0; k < nnv.length; k++){
			card = new Card(nnv[k], suits[i]);
			this.cards.push(card);
		}
	}
}

Deck.prototype.shuffle = function(){
	var i; 
	for(i = this.cards.length - 1; i > 0; i--){
		var j = Math.floor(Math.random()*(i+1));
		var temp = this.cards[i];
		this.cards[i] = this.cards[j];
		this.cards[j] = temp;
	}
}

Deck.prototype.draw = function(){
	return this.cards.pop();
}