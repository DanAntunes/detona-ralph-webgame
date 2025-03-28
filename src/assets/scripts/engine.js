const state = {
  view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values:{
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions:{
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function countDown(){
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime <= 0){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    // biome-ignore lint/style/useTemplate: <explanation>
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function playSound(){
  const audio = new Audio("../sound/src_audios_hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

function randomSquare(){
  // biome-ignore lint/complexity/noForEach: <explanation>
  state.view.squares.forEach((square)=>{
    square.classList.remove("enemy");
  });

  const randomNumber = Math.floor(Math.random() * 9);
  const randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
  // biome-ignore lint/complexity/noForEach: <explanation>
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown",() => {
      if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function main(){
  addListenerHitBox();
}

main();