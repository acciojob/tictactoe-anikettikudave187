//your JS code here. If required.

let startBtn=document.getElementById('submit');

startBtn.addEventListener("click",()=>{
    const userName1=document.getElementById('player-1').value;
    const userName2=document.getElementById('player-2').value;

    let players=document.querySelector('.players');
    players.classList.add('hide');

    let board=document.querySelector('.board');
    board.classList.remove('hide');

    let boxes=document.querySelectorAll('.cells');
    let resetBtn=document.getElementById('reset');

    let msg=document.getElementById('winner');
    msg.classList.remove('hide');
    msg.innerText=`${userName1}, you're up`;

    let turnX=true;
    let count=0;
    const winningPatterns=[
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ];

    function resetGame(){
        turnX=true;
        count=0;
        enableBoxes();
    }

    boxes.forEach((box)=>{

        box.addEventListener("click",()=>{
            if(turnX){
                msg.innerText=`${userName2},you're up`;
                box.innerText="X";
                turnX=false;
            }else{
                msg.innerText=`${userName1},you're up`;
                box.innerText="O";
                turnX=true;
            }
            box.disabled=true;
            count++;

            let checkWinner=isWinner();

            if(count===9 && !checkWinner){
                gameDraw();
            }

        });
    });

    function isWinner(){
        for(let pattern of winningPatterns){
            let pos1=boxes[pattern[0]].innerText;
            let pos2=boxes[pattern[1]].innerText;
            let pos3=boxes[pattern[2]].innerText;

            if(pos1!="" && pos2!="" && pos3!=""){
                if(pos1===pos2 && pos2===pos3){
                    if(pos1==='X'){
                        showWinner(userName1);
                    }else{
                        showWinner(userName2);
                    }
                    return true;
                }
            }
        }
    }

    function showWinner(winnerName){
        msg.innerText=`${winnerName}, Congratulations you won !`;
        msg.classList.remove('hide');
        disableBoxes();
        setTimeout(newGame,2000);

    }

    function gameDraw(){
        msg.innerText=`game is draw`;
        msg.classList.remove('hide');
        disableBoxes();
        setTimeout(newGame,2000);
    }

    function disableBoxes(){
        for(let box of boxes){
            box.disabled=true;
        }
    }

    function enableBoxes(){
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    }

    function newGame(){
        enableBoxes();
        resetGame();

        players.classList.remove('hide');
        board.classList.add('hide');
        msg.classList.add('hide');
        document.getElementById('player-1').value="";
        document.getElementById('player-2').value="";
    }

    resetBtn.addEventListener("click",resetGame);

});