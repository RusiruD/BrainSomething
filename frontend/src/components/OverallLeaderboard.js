import '../pages/Games.css'; // Import CSS for styling the page
import React,{ useState,useEffect } from "react";

const OverallLeaderboard = () => {
    
    const[userScoresArray, setUserScoresArray] = useState([[]]);
    
    useEffect(() => {
       getUserScores();
      
    }, []);

    const getUserScores = async () => {
        try {
            const response = await fetch('/api/reaction/get-user-scores');
            if (!response.ok) {
                throw new Error('Failed to fetch name scores');
            }
            const data = await response.json();
           
           
            const updatedUserScoresArray = data.map(item => [
                item.name,
                item.dinoJumpScore,
                item.reactionGameScore,
                item.colourPuzzleScore,
                item.chimpTestScore,
                
                //the overall score formula
                (item.dinoJumpScore!=null && item.reactionGameScore!=null && item.colourPuzzleScore!=null && item.chimpTestScore!=null) ? 0.25 * item.dinoJumpScore + 0.1 * item.reactionGameScore + 0.15 * item.colourPuzzleScore + 0.5 * item.chimpTestScore : "N/A"
                   
            ]);
            
            setUserScoresArray(updatedUserScoresArray); // Set the state with the new array

            // Step 1: Sort by the number of non-null attributes descending then  Sort by the overall score descending if both are the same recent results supersede older results
            const sortedUserScoresArray = updatedUserScoresArray.sort((a, b) => {
            const nonNullCountA = a.slice(1, 5).filter(attr => attr !== null).length;
            const nonNullCountB = b.slice(1, 5).filter(attr => attr !== null).length;
            return nonNullCountB - nonNullCountA; 
            }).sort((a, b) => {
        
                    const scoreA = a[5];
                    const scoreB = b[5];
                    const valueA = typeof scoreA === 'number' ? scoreA : -Infinity;
                    const valueB = typeof scoreB === 'number' ? scoreB : -Infinity;

        return valueB - valueA; // Sort by score
    });

// Update the state with the sorted array
setUserScoresArray(sortedUserScoresArray);
        } catch (error) {
            console.error('Error fetching top scores:', error);
        }
    };
    
  
   
    return (
 <div>
    <div>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Overall Score</th>
                <th>Dino Jump Score</th>
                <th>Reaction Game Score</th>
                <th>Colour Puzzle Score</th>
                <th>Chimp Test Score</th>
            </tr>
        </thead>
        <tbody>
        {userScoresArray.length > 0 ? (
                        userScoresArray.map((subArray, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Rank */}
                                <td>{subArray[0]}</td> {/* Name */}
                                <td>{ subArray[5]}</td> {/* Overall Score */}
                                    
                                <td>{(subArray[1]!==undefined && subArray[1]!==null)?(subArray[1]).toFixed(2):null} (s)</td> {/* Dino Jump Score */}
                                <td>{(subArray[2]!==undefined&& subArray[2]!==null)?(subArray[2]).toFixed(2):null} (ms)</td> {/* Reaction Game Score */}
                                <td>{(subArray[3]!==undefined&& subArray[3]!==null)?(subArray[3]).toFixed(2):null} (s)</td> {/* Colour Puzzle Score */}
                                <td>{subArray[4]} (points)</td> {/* Chimp Test Score */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>overall</td>
                            <td>100</td>
                            <td>200</td>
                            <td>300</td>
                            <td>400</td>
                        
                           
                        </tr>
                    )}
        </tbody>
    </table>
    </div>
 <h4>Save your score with a unique name. If you save your score in any game with an existing name the score only appears in the leaderboard if it is higher than the current score for that game.</h4>
</div>
    )
            
            
            };
            export default OverallLeaderboard;
