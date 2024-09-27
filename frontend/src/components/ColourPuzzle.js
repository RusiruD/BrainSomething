import "./HackPuzzle.css";
import HackPuzzle from "./HackPuzzle";
import OrderCards from "./OrderCards";
import React, {useState, useEffect, useRef} from 'react';
import ColourPuzzleHelper from './ColourPuzzleHelper';
import ColourPuzzleInfo from "./ColourPuzzleInfo";
import { Link, useLocation } from "react-router-dom";


const ColourPuzzle = ({onGameOver}) => {
   
   const [startNewGame, setStartNewGame] = useState(null);
   const [timeLimit, setTimeLimit] = useState(60);
    const [showInstruction, setShowInstruction] = useState(true);
   
    let PUZZLE_DISPLAY_TIME = 1000*timeLimit;
    
    const [showOrderCards, setShowOrderCards] = useState(true);
    const [timeOver, setTimeOver] = useState(false);
    const [puzzleSolved, setPuzzleSolved] = useState(false);
    const [userInput, setUserInput] = useState();
    const [solution, setSolution] = useState();
    const timerRef = useRef(null);
    const intervalRef = useRef(null);
    const [randomOrderArray, setRandomOrderArray] = useState([]);
    const [remainingTime, setRemainingTime] = useState(PUZZLE_DISPLAY_TIME / 1000);
    const [startTime, setStartTime] = useState(null);
    const [showPuzzle, setShowPuzzle] = useState(false);
    
   useEffect(() => {PUZZLE_DISPLAY_TIME = 1000* timeLimit; 
    setRemainingTime(PUZZLE_DISPLAY_TIME / 1000);
   }, [timeLimit]);
    // timer for the initial order of the puzzle, should be new order everytime the game is played.
     useEffect(() => {
      if(showInstruction){
        
        return;
      }
      
      
        const helper = new ColourPuzzleHelper();
        const orderArray = helper.getRandomOrderArray();
        setRandomOrderArray(orderArray);
        // wait 3 seconds, then show the puzzle and start the timer
        const hideOrderCardsTimer = setTimeout(() => {

            setShowOrderCards(false);
            // show the puzzle
            setShowPuzzle(true);
            // start recording the time it takes to solve the puzzle
            setStartTime(Date.now());

            // Timer to show end screen if time runs out
            timerRef.current = setTimeout(() => {
                gameLost();
            }, PUZZLE_DISPLAY_TIME);

            intervalRef.current = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

        }, 3000);

        // clean up timers when the component unmounts
        return () => {
            if (hideOrderCardsTimer) {
                clearTimeout(hideOrderCardsTimer);
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
 } , [startNewGame, showInstruction]);
    

    
    const getSolution = (sol) => {
        setSolution(sol);
    };

 //change is called whenever the user types into the input box
    const change = event => {
        const inputValue = event.target.value;
        setUserInput(inputValue);
        if (inputValue.trim().toLowerCase() === solution) {
            
            setUserInput("");
            gameWon();
             // Set puzzleSolved to true when the input matches the solution
             
        }
    }

  
    const gameLost = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
            
            setTimeOver(true);
    }

    const gameWon = () => {
        
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        //output the time taken to solve the puzzle in seconds
          const timeTaken = Date.now()-startTime;
         
        onGameOver(timeTaken/1000);
       
        setPuzzleSolved(true);
       
      
     

    }
    const restartGame = () => {

        console.log("restart game");
        
        setPuzzleSolved(false);
        setTimeOver(false);
        setShowPuzzle(false);   
        setShowOrderCards(true);
        setStartNewGame(startNewGame => !startNewGame);
       setRemainingTime(timeLimit);

    }
    

    if(showInstruction){
        console.log('ed');
        return(
            <div> <ColourPuzzleInfo setShowInstruction={setShowInstruction} setTimeLimit={setTimeLimit} restartGame={restartGame}/></div>);}
    
    //display time over screen
    if (timeOver) {

        return(
            <div className="end-screen">
                <div className="end-text">Time ran out. You lost.</div>
                <button onClick={restartGame} className="restart-button">Play again</button>
                <button onClick={()=>setShowInstruction(true)} className="restart-button">Instructions</button>

            </div>
        )
    }
    //display puzzle solved screen
    if (puzzleSolved) {
       

        return(
            <div className="end-screen">
                <div className="end-text">You Won</div>
                <button onClick={restartGame} className="restart-button">Play again</button>
              <button onClick={()=>setShowInstruction(true)} className="restart-button">Instructions</button>

            </div>
        )
    }

    if (showOrderCards && !showInstruction) {
        return (
            <OrderCards
                first={randomOrderArray[0]}
                second={randomOrderArray[1]}
                third={randomOrderArray[2]}
                fourth={randomOrderArray[3]}
            />
        );
    }


   

    return (
        <div>
           
       {/*input area for the user to type in the answer*/}
       {showPuzzle && (<div className="input-area">
            <HackPuzzle onSolutionCalculated={getSolution} randomOrderArray={randomOrderArray}/>
            <input 
                value={userInput} 
                type="text" 
                id="answerBox" 
                placeholder="eg. blue square..."
                onChange={change}
                autoComplete="off"
            />
                       

            <div className="timer">{remainingTime}
          
            </div>
        </div>)}
        </div>
    );
};

export default ColourPuzzle;