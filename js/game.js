
function Game(){
	this.deck = new Deck();
	this.deck.shuffle();
	this.dealer = new Player("Dealer", this.deck);
	this.player1 = new Player("player 1", this.deck);
}



function getCardSpan(card){
	var suits_symbols = {'S' : '&spades;', 'C' : '&clubs;', 'D' : '&diams;' , 'H' : '&hearts;' };
	var span_text = "<span class='card"
	if(card.suit == 'D' || card.suit == 'H'){
		span_text += " red"
	}
	span_text += "'>" + suits_symbols[card.suit] + " " + card.value + "</span>";
	return span_text;
}

function fillPlayerArea(playerArea, player){
	playerArea.empty();
	playerArea.append('<h2>' + player.name + '</h2>');
	for(var i = 0; i < player.hand.length; i++){	
		playerArea.append(getCardSpan(player.hand[i]));
	} 
	
}

function play(myGame){
	var dealerArea = $("#dealer_area");
	var dealer = myGame.dealer;
	dealerArea.append('<h2>' + dealer.name + '</h2>');
	dealerArea.append(getCardSpan(dealer.hand[0]));
	dealerArea.append("<span class='card back'>&#9733;</span>");
	var playerArea = $("#player_1_area"); 
	var player = myGame.player1;
	fillPlayerArea(playerArea, player);
}


function stand(myGame){
	var dealerArea = $("#dealer_area");
	var dealer = myGame.dealer;
	if(dealer.getHandValue() < 17){
		dealer.drawCard(myGame.deck);
	}
	fillPlayerArea(dealerArea, dealer);
	dealerArea.append('<span>' + myGame.player1.getOutcome(dealer) + "<span>"); 
}

function hit(myGame){
	var playerArea = $("#player_1_area"); 
	var player = myGame.player1;
	player.drawCard(myGame.deck);
	fillPlayerArea(playerArea, player);
}
