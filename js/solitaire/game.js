// this will contain Game methods for Solitaire.
// see https://en.wikipedia.org/wiki/Klondike_(solitaire) for terminology.

function Game(){
  this.deck = Deck();
  this.deck.shuffle();
  this.foundations = [
    Foundation(),
    Foundation(),
    Foundation(),
    Foundation()
  ];
}

function Foundation(){
  // the stacks of cards you're trying to build
  this.suit = null;
  this.cards = [];
}

Foundation.prototype.addCard = function(){};
Foundation.prototype.removeCard = function(){};
Foundation.prototype.display = function(){};

function Tableau(){
  // the holding area of cards you can use
  this.cards = [];
}

// clearly some repetition here--add some inheritance once we have a better idea of what the functions will look like.
Tableau.prototype.addCard = function(){};
Tableau.prototype.removeCard = function(){};
Tableau.prototype.display = function(){};
