const board = document.getElementById('board')
const startGameBtn = document.getElementById('startGameBtn')
const root = document.getElementById('root')
const startMenu = document.getElementById('startMenu')
const selectPlayer = document.getElementById('selectPlayer')
let gameOptions = document.getElementById('gameOptions')
let currPlayer = 'X';
let player2 = (currPlayer == 'X') ? 'O' : 'X';
let playMethod;
//TODO : Add Message bar right under the board

let restartBtn = document.createElement('button')
restartBtn.textContent = "Restart Game";
restartBtn.id = 'restartBtn';
restartBtn.className = 'button'
root.appendChild(restartBtn)

let messageArea;
// let currPlayer = player;

let _board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];

function showMessage(message){
    messageArea.innerText = `${message}`
}

function isValidClick(cell){
    return (cell.textContent == ' ');
}

function hasFreeSpaces() {
    for(let i = 0;i < _board.length;i++){
        for(let j = 0;j < _board[i].length;j++){
            if(_board[i][j] == ' ') return true;
        }
    }
    return false;
}

function checkWin(){
    let rows = _board.length;
    let cols = _board[0].length;
    let i = 0;
    
    for(i = 0;i < rows;i++){
        if(_board[i][0] == ' ') continue;
        else if((_board[i][0] == _board[i][1]) && (_board[i][0] == _board[i][2])){
            return true;
        }
    }
    
    for(i = 0;i < cols;i++){
        if(_board[0][i] == ' ') continue;
        else if((_board[0][i] == _board[1][i]) && (_board[0][i] == _board[2][i])){
            return true;
        }
    }
    
    if((_board[0][0] != ' ') && (_board[0][0] == _board[1][1] && _board[0][0] == _board[2][2])) return true;
    
    if((_board[0][2] != ' ') && (_board[0][2] == _board[1][1] && _board[0][2] == _board[2][0])) return true;
    
    return false;
}


const endGame = () => {
    if(playMethod == 'playWithFriend')
    board.removeEventListener('click',playWithFriendHandler);
    else board.removeEventListener('click',playWithComputerHandler);
    startMenu.style.display = 'block';
    gameOptions.style.display = 'block';
    restartBtn.style.display = 'block';
}

const handleBoardClick = (e) => {
    if(isValidClick(e.target) == true){
        e.target.innerText = `${currPlayer}`;
        // clear the error area
        messageArea.textContent = '';
        
        _board[Math.floor((parseInt(e.target.id)-1)/3)][Math.floor((parseInt(e.target.id)-1)%3)] = `${currPlayer}`

        if(checkWin() == true){
            if(playMethod == 'playWithFriend')
            showMessage(`Game Over , Player ${currPlayer} won !`);
        else
            showMessage(`Game Over , You Won !`);
            endGame();
        }else if(!hasFreeSpaces()){
            endGame();
            showMessage('Game Over : Draw !');
        }
        changePlayer()
    }else{
        showMessage('Error : Position is already occupied !');
    }
}

function changePlayer() {
    currPlayer = (currPlayer == 'X') ? 'O' : 'X';
}

const playWithFriend = (e) => {
    handleBoardClick(e)
}

function computerMove(){
    return ((Math.floor(Math.random() * 9) % 9 + 1))
}

function markPos(row,col){
    _board[row][col] = `${currPlayer}`
}

function isFreePlace(row,col){
    return (_board[row][col] == 'X' || _board[row][col] == 'O');
}

function validComputerMove(pos) {
    // console.log(`${Math.floor((pos-1)/3)} - ${(pos-1)%3}`);
    return (_board[Math.floor((pos-1)/3)][(pos-1)%3] == ' ');
}

const playWithComputer = (e) => {
    handleBoardClick(e);
    let compMove;
    if(hasFreeSpaces()){
        do{
            compMove = computerMove()
        }while(!validComputerMove(compMove))
    }else{
        showMessage(`Game Over : Draw!`)
        endGame()
    }
    markPos(Math.floor((compMove-1)/3),(compMove-1)%3);
    board.children[compMove].innerText = `${currPlayer}`;
    changePlayer()
    console.log(_board[0]);
    console.log(_board[1]);
    console.log(_board[2]);
    console.log(' ');
}

const handleStart = () => {
    // remove the display button
    startMenu.style.display = 'none';
    messageArea = document.createElement('p');
    messageArea.setAttribute('id','messageArea');
    root.appendChild(messageArea);
    startGame()
}

function playWithComputerHandler(e){
    playWithComputer(e)
}

function playWithFriendHandler(e){
    playWithFriend(e)
}

const startGame = () => {
    messageArea.textContent = ''
    restartBtn.style.display = 'none';
    startGameBtn.style.display = 'none'
    gameOptions.style.display = 'none';
    playMethod = gameOptions.value;
    if(playMethod == 'playWithFriend'){
        board.addEventListener('click',playWithFriendHandler);
    }else{
        board.addEventListener('click',playWithComputerHandler);
    }
    for(let i = 0;i < board.children.length;i++){
        board.children[i].innerText = ' ';
    }
    _board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    currPlayer = selectPlayer.value;
}

restartBtn.addEventListener('click',startGame)
restartBtn.style.display = 'none'
startGameBtn.addEventListener('click',() => handleStart())
