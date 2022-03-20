import { useState } from 'react';

const Statistics = ({good, neutral, bad, all, average, positive, display}) => {
    if(display){
        return(
            <>
              <h2>statistics</h2>
              <div>
                <p>good { good }</p>
                <p>neutral { neutral }</p>
                <p>bad { bad }</p>
                <p>all {all}</p>
                <p>average {average}</p>
                <p>positive {positive}%</p>
              </div>
            </>
        );
    } else {
        return (
            <>
              <h2>statistics</h2>
              <p>No feedback given!</p>
            </>
        );
    };
};


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [all, setAll] = useState(good+neutral+bad);
    const [average, setAverage] = useState(0);
    const [positive, setPositive] = useState(0);
    const [display, setDisplay] = useState(false);

    const recomputeOtherValues = function(){
        let numberOfAll = good + neutral + bad;
        setAverage((good * 1) + (neutral * 0) + (bad * -1)/numberOfAll || 1);
        setPositive((good/numberOfAll || 1)*100);
        // divide by one to avoid division by zero and the NaN problem
        setAll(numberOfAll);
    };
    const giveGoodFeedback = function(){
        setGood(good + 1);
        recomputeOtherValues();
        return;
    };

    const giveNeutralFeedback = function(){
        setNeutral(neutral + 1);
        recomputeOtherValues();
        return;
    };

    const giveBadFeedback = function(){
        setBad(bad + 1);
        recomputeOtherValues();
        return;
    };

    return (
        <div>
          <div>
            <h2>Give Feedback</h2>
            <div>
              <button onClick={giveGoodFeedback}>good</button>
              <button onClick={giveNeutralFeedback}>neutral</button>
              <button onClick={giveBadFeedback}>bad</button>
            </div>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              all={all}
              average={average}
              positive={positive}
              display={display}
            />
          </div>
        </div>
    );
};

export default App;
