// Game constants and variables
let inputDir= {x:0,y:0};
const foodSound= new Audio('../soundsandbg/food.mp3');
const gameOverSound= new Audio('../soundsandbg/gameover.mp3');
const moveSound= new Audio('../soundsandbg/move.mp3');
const musicSound= new Audio ('../soundsandbg/music.mp3');
const speed=9;
let score=0;
let lastPaintTime= 0;
let snakeArr= [{x:13,y:15}];
let food= {x:6,y:7};
let scorediv= document.getElementById('score');
let board= document.getElementById('board');
let hiscoreBox= document.getElementById('highscore');
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime- lastPaintTime)/1000<1/speed){
  
    return;
  }
   lastPaintTime=ctime;
   gameEngine();
}

function isCollide(sarr)
{
    // if you bump into yourself

    for(let i=1; i<sarr.length;i++)
    {
        if(sarr[i].x=== sarr[0].x && sarr[i].y=== sarr[0].y){
            return true;
        }
    }

    //if you bump into the wall 

        if(sarr[0].x>= 18 || sarr[0].x<=0 )
        {
            return true;
        }
        if(sarr[0].y>= 18 || sarr[0].y<=0)
        {
            return true;
        }
    
}

function gameEngine(){
    // Part 1: updating the snake array;
      
      if(isCollide(snakeArr))
      {
        score=0;
        scorediv.innerHTML="Score: "+ score;
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! Press any key to restart the game.")
        snakeArr= [{x:13,y:15}];
        musicSound.play();
        score=0;
      }

      // if you have eaten the food, increment the score and regenrate the food

      if(snakeArr[0].y===food.y && snakeArr[0].x=== food.x)
      {
        
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML= "HiScore: "+ hiscoreval
        }
        scorediv.innerHTML="Score: "+ score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food= {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
      }

 // Moving the snake

 for(let i=snakeArr.length-2;i>=0;i--)
 {
    snakeArr[i+1]={...snakeArr[i]};

 }
 snakeArr[0].x+= inputDir.x;
 snakeArr[0].y+= inputDir.y;



    // Part 2: Display the snake and food

    //display the snake
    
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
            
        }
        else 
        {
            snakeElement.classList.add('snake');
        }
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
let hiscore= localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML= "HiScore: "+ hiscoreval
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
    musicSound.play();
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