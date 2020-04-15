var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage = "images/dice" + randomNumber1 + ".png";
var images = document.querySelectorAll('img');
images[0].setAttribute("src",randomDiceImage);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
randomDiceImage = "images/dice" + randomNumber2 + ".png";
images[1].setAttribute("src",randomDiceImage);

if(randomNumber1 > randomNumber2){
  document.querySelector("h1").innerHTML = "Player 1 Wins";
}
else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins";
}
else{
  document.querySelector("h1").innerHTML = "Draw";
}
