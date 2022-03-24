import { useState } from 'react';

const MostVotes = ({anecdote, numberOfVotes}) => {
    if(numberOfVotes === 0){
        return (
            <>
              <p>There are currently no votes on any anecdotes</p>
            </>
        );
    } else {
        return (
            <div>
              <p>{ anecdote }</p>
              <p>has { numberOfVotes } votes</p>
            </div>
        );
    };
};

const AnecdoteOfTheDay = ({anecdote, numberOfVotes, handleVote, handleNext}) => {
    if(numberOfVotes === 0){
        return (
            <>
              <div>
                {anecdote}
                <p>has no votes</p>
              </div>
              <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
              </div>
            </>
        );
        
    } else if (numberOfVotes === 1) {
        return (
            <>
              <div>
                {anecdote}
                <p>has 1 vote</p>
              </div>
              <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
              </div>
            </>
        );
        
    } else {
        return (
            <>
              <div>
                {anecdote}
                <p>has {numberOfVotes} votes</p>
              </div>
              <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
              </div>
            </>
        );
    };
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ];
    
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState({});

    const handleVote = function(){
        const newPoints = {
            ...points
        };
        // if undefined set as zero
        newPoints[selected] = (points[selected] || 0) + 1;
        setPoints(newPoints);
    };

    const handleNext = function(){
        if(selected >= anecdotes.length - 1) {
            setSelected(0);
        } else {
            setSelected(selected + 1);
        }
    };

    let max = {id: null, points: 0 };

    // computes the max;
    (function(){
        const keys = Object.keys(points);
        for(let i = 0; i < keys.length; i++){
            if(points[keys[i]] >= max.points){
                max = {id:i,  points: points[keys[i]]};
            }
        };
    })();
    
    return (
        <main>
          <div>
            <h2>Anecdote of the Day</h2>
            <AnecdoteOfTheDay
              handleVote={handleVote}
              handleNext={handleNext}
              anecdote={anecdotes[selected]}
              numberOfVotes={points[selected] || 0}
            />
          </div>
          <div>
            <h2>Anecdote with the Most Votes</h2>
            <MostVotes
              anecdote={anecdotes[max.id]}
              numberOfVotes={points[max.id] || 0}
            />
          </div>
        </main>
    );
};

export default App;
