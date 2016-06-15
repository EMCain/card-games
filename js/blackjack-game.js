
function Game(){
	this.deck = new Deck();
	this.deck.shuffle();
	this.dealer = new Player("Dealer", this.deck);
	this.player1 = new Player("player 1", this.deck);
	this.players = [this.dealer, this.player1];
	// could add the ability to have any number of players
}

var gameOutcomes = {
  "-1": "Dealer wins",
	"0": "Push",
	"1": "You win",
	"1.5": "You win - Blackjack!"
};

Game.prototype.getBetMultiplier = function(yourname){
	var outcomes = {};
	for (i = 0; i < this.players.length; i++){
		var player = this.players[i];
		outcomes[player.name] = player.getOwnOutcome();
	}
	if(outcomes[yourname] == outcomes["Dealer"]){
		return 0;
	} else if (outcomes["Dealer"] > outcomes[yourname] || outcomes[yourname] == "Bust" || outcomes["Dealer"] == "Blackjack"){
		return -1;
	} else if (outcomes[yourname] == "Blackjack"){
		return 1.5;
	} else {
		return 1;
	}
}

Game.prototype.getGameWinner = function(multiplier){
	return gameOutcomes[multiplier];
}

Game.prototype.calculateWinnings = function(bet, multiplier){
	return bet*parseFloat(multiplier);
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
	playerArea.append('<div class="purse">$' + player.purse + "</div>");
	playerArea.append('<h3>Outcome: '
		+ player.getOwnOutcome()
		+ '</h3>');
	for(var i = 0; i < player.hand.length; i++){
		playerArea.append(getCardSpan(player.hand[i]));
	}
}

function play(myGame){
	if(myGame.deck.cards.length < 52){
		myGame.deck = new Deck();
		myGame.deck.shuffle();
		for(i = 0; i < myGame.players.length; i++){
			myGame.players[i].deck = myGame.deck;
		}
	}
	var dealerArea = $("#dealer_area");
	dealerArea.empty();
	var dealer = myGame.dealer;
	dealer.newHand();
	dealerArea.append('<h2>' + dealer.name + '</h2>');
	dealerArea.append('<div class="purse">$' + dealer.purse + "</div>");
	dealerArea.append(getCardSpan(dealer.hand[0]));
	dealerArea.append("<span class='card back'>&#9733;</span>");
	var playerArea = $("#player_1_area");
	playerArea.empty();
	var player = myGame.player1;
	player.newHand();
	fillPlayerArea(playerArea, player);
	$("#bet").prop("max", player.purse);
}


function stand(myGame){
	var dealerArea = $("#dealer_area");
	var dealer = myGame.dealer;
	if(dealer.getHandValue() < 17){
		dealer.drawCard(myGame.deck);
	}
	fillPlayerArea(dealerArea, dealer);
	var multiplier = myGame.getBetMultiplier("player 1");
	myGame.player1.purse +=  myGame.calculateWinnings($("#bet").val(), multiplier);
	$("#player_1_area").find(".purse").text("$" + myGame.player1.purse);
	myGame.dealer.purse -=  myGame.calculateWinnings($("#bet").val(), multiplier);
	$("#dealer_area").find(".purse").text("$" + myGame.dealer.purse);
  $("#winner").text(myGame.getGameWinner(multiplier));
}

function hit(myGame){
	var playerArea = $("#player_1_area");
	var player = myGame.player1;
	if(player.getHandValue() < 21){
		player.drawCard(myGame.deck);
		fillPlayerArea(playerArea, player);
	}
}
