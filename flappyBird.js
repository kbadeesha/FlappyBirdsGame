var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d")

//load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "assets/sprites/bird.png";
bg.src = "assets/sprites/background1.png";
fg.src = "assets/sprites/base.png";
pipeNorth.src = "assets/sprites/pipe2a.png";
pipeSouth.src = "assets/sprites/pipe1a.png";

//other variables

var gap = 85;
var constant = 242 + gap;

var bX = 10; 
var bY = 150;

var gravity = 1.5 ;
var score =0;

//on key down
document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
}

//pipe coordinates
var pipe=[];

pipe[0] = {
    x : cvs.width, 
    y : 0

}

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);

    

    for(var i=0 ; i< pipe.length;i++)
    {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*180)-165
                
            }); 
        }
        // detect collision
        
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && 
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant)){
            location.reload(); //reload page
        }

        if(pipe[i].x == 5){
            score ++;
        }

    }
    
    
    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY = bY + gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " +score,10,cvs.height-20);
    
    
    window.requestAnimationFrame(draw);
}

draw();