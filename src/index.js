import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const boardStyle = {
  backgroundColor: "skyblue",
  margin: 10,
  padding: 20
}

const Board = () => {

  const initialSquares = Array(9).fill(null);
  const [squares,setSquares] = useState(initialSquares);
  const [xIsNext,setXIsNext ] = useState(true);

const handleClickEvent = (i) => {
  //1.make a copy of squares state array
    const newSquares = [...squares]
    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i]);
     if (winnerDeclared || squareFilled) {
       return;
     }
  //2.Mutate the copy, setting the i-th element to 'X'
    newSquares[i] = xIsNext ? 'X' : 'O';
  //3. call the setsquares function with the mutated copy
    setSquares(newSquares);
    setXIsNext(!xIsNext);
}

  const renderSquare = (i) =>{
    return (

      <Square 
      value = {squares[i]}
      onClickEvent = {() => handleClickEvent(i)}
      />
    )
  }
  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div style={boardStyle}>
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
      {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
      {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}
const Square = (props) => {
  return (
    <button 
    
    className = "square"
    onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  )
}
const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board/>
    </div>
  );
};
ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
function  calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for(let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
    return null;
  
}  