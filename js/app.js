/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var scores, roundScore, activePlayer, goalScore, gamePlaying;
let scores, roundScore, activePlayer, gamePlaying;

const  goalScore = 5;

//Set values to 0
// init();

(function init(){
    scores = [0 , 0]; //Scores of the players
    roundScore = 0; //Round score
    activePlayer = 0;   //Current players
    // goalScore = 20; //Score for win
    gamePlaying = true; //State variable for check if the game is over

    //score, current, players name, winner and active class

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner', 'active');
    document.querySelector('.player-1-panel').classList.remove('winner', 'active');
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none'
})();


document.querySelector('.btn-roll').addEventListener('click', function(){

   if(gamePlaying){
        // 1. Random number
        // var dice = Math.floor(Math.random() * 6) + 1;
        const dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        // var diceDOM = document.querySelector('.dice');
        const diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        // diceDOM.src = '../img/dice-' + dice + ".png";
        diceDOM.src = `./img/dice-${dice}.png`;

        //3. Update the round score if the rolled number was NOT a 1
        if(dice != 1){
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;

            return;
        }

        //Agregar una forma de espera....
        // el Dado #1 no se muestra porque se ejecuta inmediatamente nextPlayer()

        //setTimeout es una opcion

        setTimeout(()=> {
            alert("Oh no! You rolls a 1, it's the next player's turn");
            nextPlayer();
        }, 500);
   }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //if(!gamePlaying) return ;

    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        scores[activePlayer] >= goalScore ? winnerFunction() : nextPlayer();
    }

});

function nextPlayer(){
    //Reset the round score
    roundScore = 0;
    // document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

    //Next player turn
    // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //Display the current player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function winnerFunction(){
    gamePlaying = false;

    //use string interpolation....
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';

    alert('The game is over, Player ' + (activePlayer + 1) + ' is the winner');
}

document.querySelector('.btn-new').addEventListener('click', init);