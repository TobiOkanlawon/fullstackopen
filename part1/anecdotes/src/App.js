import { useState } from 'react';

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
    if(!points[selected]){
        return (
            <>
              <div>
                {anecdotes[selected]}
                <p>has no votes</p>
              </div>
              <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
              </div>
            </>
        );
        
    } else if (points[selected] === 1) {
        return (
            <>
              <div>
                {anecdotes[selected]}
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
                {anecdotes[selected]}
                <p>has {points[selected]} votes</p>
              </div>
              <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
              </div>
            </>
        );
    };
};

export default App;