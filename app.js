/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, playerNow, roundFigure, state, prevDice, setWin;

intro();
//setWin = prompt('Set a winning score', '');

//**********Button Roll-dice**********************
document.querySelector('.btn-roll').addEventListener('click', function(){
if(state){
var dice = Math.floor(Math.random()*6)+1;
var dice1= Math.floor(Math.random()*6)+1;

document.querySelector('.dice').style.display = 'block';
document.querySelector('.dice1').style.display = 'block';

//changing the image with dice value
var diceDOM = document.querySelector('.dice');
diceDOM.src = 'dice-'+dice+'.png';
document.querySelector('.dice1').src = 'dice-'+dice1+'.png';


if(prevDice===6 && dice===6){
    scores[playerNow] = 0;
    cpnsole.log(scores[playerNow]);
    document.getElementById('score-'+playerNow).textContent = scores[playerNow];
    nextPlayer(); 
}else if(dice===1 || dice1===1){
    nextPlayer();
}
//same player
else{
    roundFigure += dice + dice1;
    //scores[playerNow] += roundFigure;
    document.getElementById('current-' +playerNow).textContent = roundFigure;
    //scores[playerNow]=roundFigure;
}
prevDice = dice;
}
});

//**************Button Hold**********************
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(state){
    //storing the value to the main board
    scores[playerNow] += roundFigure;
    document.getElementById('score-'+playerNow).textContent = scores[playerNow];

    //getting the value from the input text
    var input = document.querySelector('.final-score').value;
    var winningScore;
    //console.log(input);

    if(input){
       winningScore=input;
    }
   else{
       winningScore=20;
   } 
    //comparing if the value is crossing the winning value
    if(scores[playerNow] >= winningScore){
        winner();
    }
    else{
        nextPlayer();
    }
    }
});

//**********Button new game********************
document.querySelector('.btn-new').addEventListener('click', intro);

function winner(){
   document.querySelector('#name-'+playerNow).textContent = 'Winner!!!';
   document.querySelector('.dice').style.display = 'none';
   document.querySelector('.dice1').style.display = 'none';
   document.querySelector('.player-'+playerNow+'-panel').classList.add('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   state = false;
};

function nextPlayer(){
    //document.getElementById('score-'+playerNow).textContent = scores[playerNow];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    playerNow === 0 ? playerNow = 1 : playerNow = 0;
    roundFigure = 0;

}

function intro(){
    scores = [0,0];
    playerNow = 0;
    roundFigure = 0;
    state = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}