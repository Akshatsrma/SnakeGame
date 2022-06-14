// Game constants and variables
let inputDir= {x:0,y:0};
const foodSound= new Audio('../soundsandbg/food.mp3');
const gameOverSound= new Audio('../soundsandbg/gameover.mp3');
const moveSound= new Audio('../soundsandbg/move.mp3');
const musicSound= new Audio ('../soundsandbg/music.mp3');
const speed=2;
let score=0;
let lastPaintTime= 0;
let snakeArr= [{x:13,y:15}];
let food= {x:6,y:7};
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime- lastPaintTime)/1000<1/speed){
  
    return;
  }
   lastPaintTime=ctime;
   gameEngine();
}

function gameEngine(){
    // Part 1: updating the snake array;
      
      if(isCollide(snakeArr))
      {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! Press any key to restart the game.")
        snakeArr= [{x:13,y:15}];
        musicSound.play();
        score=0;
      }



    // Part 2: Display the snake and food

    //display the snake
    let board= document.getElementById('board');
    board.innerHtml="";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })

    // display the food
    
        foodElement= document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{

    inputDir= {x:0,y:1} // start the game
    moveSound.play();
switch (e.key){
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x= 0;
        inputDir.y= -1;
        break;

    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x= 0;
        inputDir.y= 1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x=-1;
        inputDir.y=0;
        break;

    case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x=1;
        inputDir.y=0;
        break;
        default:
            break;
}
})