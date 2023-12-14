const root = document.getElementById('root')
const board = document.getElementById('board')
const playerSelectionArea = document.querySelector('.playerSelectionArea')
const startGameBtn = document.getElementById('startGameBtn')
const gameTypes = document.getElementById('gameTypes')
const selectedPlayer = document.getElementById('selectedPlayer')

//TODO : Complete the handlerForComputer function

//   <--- Global Variables --->
let currPlayer;
let _board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
let messageArea;

function changePlayerSelectionOptions(value){
    if(value == 'play-with-friend'){
        selectedPlayer.innerHTML = `<option value="X">X</option>
        <option value="O">O</option>`;
    }else{
        selectedPlayer.innerHTML = `<option value="X">X</option>
        <option value="Computer">Computer</option>`
    }
}

function isCellEmpty(cell) {
    return cell.textContent == ' ';
}

function hasFreeSpaces() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (_board[i][j] == ' ') return true;
        }
    }
    return false;
}

function checkWin() { 
    let i;
    for (i = 0; i < 3; i++) {
        if (_board[i][0] == ' ') continue;
        else if ((_board[i][0] == _board[i][1]) && (_board[i][0] == _board[i][2])) {
            return true;
        }
    }
    
    for (i = 0; i < 3; i++) {
        if (_board[0][i] == ' ') continue;
        else if ((_board[0][i] == _board[1][i]) && (_board[0][i] == _board[2][i])) {
            return true;
        }
    }
    
    if ((_board[0][0] != ' ') && (_board[0][0] == _board[1][1] && _board[0][0] == _board[2][2])) return true;
    
    if ((_board[0][2] != ' ') && (_board[0][2] == _board[1][1] && _board[0][2] == _board[2][0])) return true;
    
    return false;
}

function showMessage(message) {
    messageArea.innerText = `${message}`
}

function clearMessages() {
    messageArea.textContent = '';
}

function changePlayer() {
    currPlayer = (currPlayer == 'X') ? 'O' : 'X';
}

function handleBoardClick(event) {
    if(!(isCellEmpty(event.target))){
        showMessage(`ERROR : Position already occupied !`)
        return
    }

    clearMessages()
    event.target.innerText = `${currPlayer}`;

    _board[Math.floor((parseInt(event.target.id)-1)/3)][(parseInt(event.target.id)-1)%3] = `${currPlayer}`
}

function endGame(gameType) {
    if(gameType == 'play-with-friend')
        board.removeEventListener('click',handlerForFriend)
    else
        board.removeEventListener('click',handlerForComputer)

    startGameBtn.innerText = `Restart Game`
    showEnvironment()
}

function handlerForFriend(clickEvent) {
    handleBoardClick(clickEvent)
    if(checkWin() == true){
        showMessage(`Game Over : Player ${currPlayer} Won !`);
        endGame()
    }
    else if(!hasFreeSpaces()){
        showMessage(`Game Over : Draw !`)
        endGame()
    }
    changePlayer()
}

function getRandomMove(){
    let randomMove;
    do{
        randomMove = Math.floor(Math.random() * 9)
        if(randomMove == 0) randomMove++
    }while(!isCellEmpty(board.children[randomMove]))

}

function handlerForComputer(clickEvent) {
    console.log('In comp handler');

}

function refreshVariables() {
    console.log('Refresh inside');
    // Empty Board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            _board[i][j] = ' '
            board.children[((i*3)+j)].textContent = ' ';
        }
    }
    // Refresh currPlayer
    currPlayer = selectedPlayer.value
}

function showEnvironment() {
    startGameBtn.style.display = 'block';
    playerSelectionArea.style.display = 'block';
    gameTypes.style.display = 'block';
}

function clearEnvironment() {
    clearMessages()
    startGameBtn.style.display = 'none';
    playerSelectionArea.style.display = 'none';
    gameTypes.style.display = 'none';
}

function startGame(gameType) {
    if (gameType == 'play-with-friend') {
        board.addEventListener('click', handlerForFriend)
    }
    else if(gameType == 'play-with-computer'){
        board.addEventListener('click', handlerForComputer)
    }
}

// Cleans the game environment and call startGame function
function handleStartClick() {
    clearEnvironment()
    refreshVariables()
    startGame(gameTypes.value)
}

startGameBtn.addEventListener('click', handleStartClick);

messageArea = document.createElement('p')
messageArea.className = 'messageArea'
root.appendChild(messageArea)