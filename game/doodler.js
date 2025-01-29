document.addEventListener("DOMContentLoaded", () => {
    const a = document.querySelector(".grid");
    const doodler = document.createElement("div");
    let doodlerLeftSpace = 50;
    let startpoint=150
    let doodlerBottomSpace = startpoint;
    let isGameOver = false;
    let platforms=[]
    let upTimerId
    let downTimerId
    let isJumping=true
    let isGoingLeft=false
    let isGoingRight=false
    let leftTimerId
    let rightTimerId
    let score=0
    function createDood() {
        a.appendChild(doodler);
        doodler.classList.add("doodler"); 
        doodlerLeftSpace=platforms[0].left
        doodler.style.left = doodlerLeftSpace + "px";
        doodler.style.bottom = doodlerBottomSpace + "px";
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + "px"; 
            visual.style.bottom = this.bottom + 'px';
            a.appendChild(visual);
        }
    }

    function createPlatform() {
        for (let i = 0; i < 5; i++) {
            let platGap = 600 / 5;
            let newPlatBottom = 100 + i * platGap;
            let newPlateform=new Platform(newPlatBottom); 
            platforms.push(newPlateform)
            console.log(platforms)
        }
    }
    function movePlateforms(){
        if(doodlerBottomSpace>200){
           platforms.forEach((platform)=>{
            platform.bottom-=4
            let visual = platform.visual
            visual.style.bottom= platform.bottom + 'px'
            if(platform.bottom<10){
                let firstplatform=platforms[0].visual
                firstplatform.classList.remove('platform')
                score+=1
                platforms.shift()
                let newPlateform=new Platform(600)
                platforms.push(newPlateform)
            }
           })
                
            };
        }
        function jump(){
            clearInterval(downTimerId)
            isJumping=true
            upTimerId=setInterval(()=>{
                doodlerBottomSpace+=5
                doodler.style.bottom=doodlerBottomSpace + 'px'
                if(doodlerBottomSpace>=startpoint+10|| doodlerBottomSpace>=600-85){
                    fall();
                }
            },30)
        }
        function fall(){
            clearInterval(upTimerId)
            isJumping=false
            downTimerId=setInterval(()=>{
                doodlerBottomSpace-=1
                doodler.style.bottom=doodlerBottomSpace+'px';
                if(doodlerBottomSpace<=0){
                    GameOver();
                }
                platforms.forEach(platform=>{
                    if(
                        (doodlerBottomSpace>=platform.bottom)&&(doodlerBottomSpace<=platform.bottom+15)&&((doodlerLeftSpace+60)>=platform.left)&&(doodlerLeftSpace<=(platform.left + 85))&&!isJumping

                    ){
                        console.log('landed')
                        startpoint=doodlerBottomSpace+'px'
                        jump();
                    }
                    
                })
            })
        }
        function GameOver(){
            console.log('game over')
            isGameOver=true
            clearInterval(upTimerId)
            clearInterval(downTimerId)
            clearInterval(leftTimerId)
            clearInterval(rightTimerId)
            while(a.firstChild){
                a.removeChild(a.firstChild)
            }
            a.innerHTML="YOUR SCORE IS: "+score
        }
        function moveLeft(){
            if(isGoingRight){
                clearInterval(rightTimerId)
                isGoingRight=false
            }
            isGoingLeft=true
            leftTimerId=setInterval(()=>{
                if(doodlerLeftSpace>=0){
                    doodlerLeftSpace-=5
                    doodler.style.left=doodlerLeftSpace+'px'
        }else moveRight()},30)

        }
        function moveRight(){
            if(isGoingLeft){
                clearInterval(leftTimerId)
                isGoingLeft=false
            }
            isGoingRight=true
            rightTimerId=setInterval(()=>{
                if(doodlerLeftSpace<=340){
                doodlerLeftSpace+=10
                doodler.style.left=doodlerLeftSpace+'px'
        }else moveLeft()},30)
        }
        function moveStraight(){
            isGoingLeft=false
            isGoingRight=false
            clearInterval(rightTimerId)
            clearInterval(leftTimerId)
        }
        function control(e){
            if(e.key=='Arrowleft'){
                moveLeft()
            }
            else if(e.key=='ArrowRight'){
                moveRight()
            }
            else if(e.key=='ArrowUp'){
                moveStraight()
            }
        }

    function startDoodler() {
        if (!isGameOver) {
            createPlatform();
            createDood();
            movePlateforms();
           setInterval(movePlateforms, 30);
            jump();
            document.addEventListener('keyup',control)
        }
    }

    startDoodler(); 

});

