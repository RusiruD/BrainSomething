import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";

// resources
import dinosaurIcon from "../resources/images/dinosaur.png";
import eyeIcon from "../resources/images/eyeicon.png";
import reactionIcon from "../resources/images/reactionClock.png"; // Add an icon for the reaction game
import monkeyIcon from "../resources/images/monkey.png";
import OverallLeaderboard from "../components/OverallLeaderboard.js";




// components
const Home = () => {
 

  return (
      <div className="home">
        <div>
       
        <div className="cards-container">
          {/* Card for Game 1 */}
          <div className="card">
            <h3>Dino Jump</h3>
            <img src={dinosaurIcon} alt="Dinosaur" className="card-icon" />
            <p>A fun jumping game</p>
            <Link to="/game/1" className="play-link"> Play Dino Jump</Link>
          </div>

          {/* Card for Reaction Game */}
          <div className="card">
            <h3>Reaction Game</h3>
            <img src={reactionIcon} alt="Reaction" className="card-icon" />
            <p>Test your reaction speed</p>
            <Link to="/game/2" className="play-link"> Play Reaction Game</Link>
          </div>
          {/* Card for colour puzzle */}
        <div className="card">
          <h3>Colour Puzzle</h3>
          <img src={eyeIcon} alt="Eye" className="card-icon" />
          <p>A tricky observation game</p>
          <Link to="/game/3" className="play-link"> Play Colour Puzzle</Link>
        </div>

          {/* Card for Chimp Test Game */}
          <div className="card">
            <h3>Chimp Test</h3>
            <img src={monkeyIcon} alt="Monkey" className="card-icon" />
            <p>Is your memory better than a monkey's?</p>
            <Link to="/game/4" className="play-link"> Play Chimp Test</Link>
          
          </div>
       
        </div>
        <OverallLeaderboard />
        </div>
        
      </div>
  );
};

export default Home;
