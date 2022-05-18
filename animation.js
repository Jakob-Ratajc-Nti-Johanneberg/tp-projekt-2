//https://www.youtube.com/watch?v=3SsYZDJdeXk&t=423s&ab_channel=KnifeCircus insperation

var tubes = document.getElementById("tube1");
var tubes2 = document.getElementById("tube2");
var bird = document.getElementById("bird");
var score = document.getElementById("scoreboard");
var box = document.getElementById("box");
var jumping = 0;
var counter = 0;
var counter2 = 0;
var random = 0;
var speedY = 2; //olika variabler för de olika elementen som används//


tubes.addEventListener("animationiteration", () => {
  random = -(Math.random() * 350 + 150);
  tubes.style.top = random + "px";
  tubes2.style.top = random + 120 + "px"; //skapar ett nytt ställe där hålet hamnar varje gång animationen har körts klart//
  counter++;
  counter2++; //ökar ditt score med 1 för varje gång animationen nollställs//
  document.getElementById("score").textContent = "Score:" + counter; //uppdaterar ditt score live//
});

setInterval(function () { // en loop som utför alla funktioner nedan var tionde milisekund, fortsället för evigt//
  score.style.display='none';
  speedY -= 0.06; //gravitation, läggs till var tionde milisekund//

  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top")); //skaffat top-värdet för fågeln i spelet//

  if (jumping == 0) {
    bird.style.top = birdTop - speedY + "px"; //om man inte hoppar, ökar hastigheten neråt var tionde milisekund//
  }

  var tube1Left = parseInt(
    window.getComputedStyle(tubes).getPropertyValue("left")
  );
  var tube2Left = parseInt(
    window.getComputedStyle(tubes2).getPropertyValue("left")
  );
  var birdLeft =
    parseInt(window.getComputedStyle(bird).getPropertyValue("left")) + 60; //olika värden för att beräkna kolisioner senare//

  var tubesTop = 500 + random;
  var tubesTop2 = 620 + random;




  setTimeout(function(){
    timedOut = true; //workaround för en bugg jag hade som inte gick att fixa, pasuar colision-detectionen i 2,5 sekunder för tuberna, inte för taket och golvet däremot//
  },2500);

    if (
    (birdTop >  530 || birdTop < 0 || 
    ((birdTop - 20 < tubesTop && tube1Left + 350 <= birdLeft) ||
    (birdTop - 10 > tubesTop2 && tube2Left + 350 <= birdLeft)) && timedOut) //If statement för att beräkna om fågeln rör antigen rören eller toppen eller marken//
  ) {
    speedY = 0;
    score.style.display='flex';
    score.style.alignItems = 'center';
    score.style.justifyContent = 'space-evenly';
    score.style.flexDirection = 'column'; // styling för scoreboarden när man förlorar//
    document.getElementById("score2").textContent = "You died! " + "Score:" + counter2; //lägger till ny aktiv scoreboard//
    document.getElementById("score").textContent = null ; //tar bort den aktiva scoreboarden//
    document.querySelector("#bird").style.animationPlayState = 'paused'
    document.querySelector("#tube1").style.animationPlayState = 'paused';
    document.querySelector("#tube2").style.animationPlayState = 'paused';
    document.querySelector("birdTop").style.animationPlayState = null; //om if statementet är uppfyllt, pausar alla animationer och visar upp en scoreboard//
  }
  var restart = 
    document.querySelector("#play").addEventListener('click', function(){ 
    score.style.display = 'none'; // nollställer tubernas animationer//
    tubes.style.animation = 'none';
    tubes2.style.animation = 'none';
    tubes.offsetHeight;
    tubes2.offsetHeight;
    tubes.style.animation = null;
    tubes2.style.animation = null; // nollställer tubernas animationer//
    var el = document.getElementById('bird');
    el.style.animation = 'none'; //nollställer fågeln animation
    el.offsetHeight; 
    el.style.animation = null; //nollställer fågelns animation//
    bird.style.top = 300 + "px"; //nollställer fågeln position//
    speedY = 1;
    counter2 = 0;
    counter = 0;  //variabel för restartknappen, fungerar onclick och nollställer alla animationer och score och återupptar dom därefter för att fortsätta spelet//
  });
  
}, 10);



function jump() {
  speedY = 2.5;
  var el = document.getElementById('bird');
  el.style.animation = 'none';
  el.offsetHeight; 
  el.style.animation = null; //tar bort animationen på fågeln varje gång man hoppar och startar om den därefter, sätter även ens Yspeed på 2,5 vilket får fågeln att åka upp//
};

//document.addEventListener("click", jump);
document.addEventListener("keyup", jump); //om en knapp på tangentbordet klickas, aktiveras funktionen jump//
