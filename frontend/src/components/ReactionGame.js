import React, { useState, useEffect } from 'react';
import './ReactionGame.css'; // Styling for the reaction game

const ReactionGame = ({ onGameOver }) => {
    const [color, setColor] = useState('blue'); // Initial color is blue
    const [message, setMessage] = useState('Click this when you are ready.');
    const [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);

    useEffect(() => {
        let timer;
        if (color === 'red') {
            const randomTime = Math.floor(Math.random() * 5000) + 1000;
            timer = setTimeout(() => {
                setColor('green');
                setStartTime(Date.now());
                setMessage('Click now!');
            }, randomTime);
        }
        return () => clearTimeout(timer);
    }, [color]);

    const handleClick = () => {
        if (color === 'blue') {
            setColor('red');
            setMessage('Wait for green...');
        } else if (color === 'red') {
            setColor('blue');
            setMessage('Sorry, too early! Click this when you are ready.');
        } else if (color === 'green') {
            const endTime = Date.now();
            const reactionTime = endTime - startTime;
            setReactionTime(reactionTime);
            setColor('blue');
            setMessage(`Your reaction time is ${reactionTime} ms. Click this when you are ready.`);
          
            onGameOver(reactionTime); // Callback to pass the reaction time to the parent component
        }
    };

    return (
        <div className={`reaction-game-card ${color}`} onClick={handleClick}>
            <p>{message}</p>
        </div>
    );
};

export default ReactionGame;
