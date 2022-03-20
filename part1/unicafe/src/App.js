import { useState } from 'react';

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const giveGoodFeedback = function(){
        setGood(good + 1);
        return;
    };

    const giveNeutralFeedback = function(){
        setNeutral(neutral + 1);
        return;
    };

    const giveBadFeedback = function(){
        setBad(bad + 1);
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
            <h2>statistics</h2>
            <div>
              <p>good { good }</p>
              <p>neutral { neutral }</p>
              <p>bad { bad }</p>
            </div>
          </div>
        </div>
    );
};

export default App;
