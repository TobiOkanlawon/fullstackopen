import { useState } from 'react';

const Statistics = ({feedback, statistics, display}) => {
    if(display){
        return(
            <>
              <h2>statistics</h2>
              <div>
                <StatisticsLine text={'good'} value={feedback.good} />
                <StatisticsLine text={'neutral'} value={feedback.neutral} />
                <StatisticsLine text={'bad'} value={feedback.bad} />
                <StatisticsLine text={'all'} value={statistics.all} />
                <StatisticsLine text={'average'} value={statistics.average}/>
                <StatisticsLine text={'positive'} value={statistics.positive + '%'} />
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

const Button = ({clickHandler, text}) => {
    return (
        <button onClick={clickHandler}>
          {text}
        </button>
    );
};

    const StatisticsLine = ({text, value}) => {
    return (
        <>
          <p>{text} {value}</p>
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });
    
    const [statistics, setStatistics] = useState({
	average: 0,
	positive: 0,
	all: 0,
    });
    
    const [display, setDisplay] = useState(false);

    const computeStastics = function(newFeedback){
        const newStatistics = {};
        // 'all' has to be computed first.
        newStatistics.all = newFeedback.good + newFeedback.bad + newFeedback.neutral;
        newStatistics.average = ((newFeedback.good * 1) + (newFeedback.bad * -1)) / newStatistics.all;
        newStatistics.positive = newFeedback.good * 100 / newStatistics.all;

        setStatistics(newStatistics);
    };
    
    const giveGoodFeedback = function(){
        const newFeedback = {...feedback, good: feedback.good + 1};
        computeStastics(newFeedback);
        setFeedback(newFeedback);
        setDisplay(true);
    };

    const giveNeutralFeedback = function(){
        const newFeedback = {...feedback, neutral: feedback.neutral + 1};
        computeStastics(newFeedback);
        setFeedback(newFeedback);
        setDisplay(true);
    };

    const giveBadFeedback = function(){
        const newFeedback = {...feedback, bad: feedback.bad + 1};
        computeStastics(newFeedback);
        setFeedback(newFeedback);
        setDisplay(true);
    };

    return (
        <>
          <div>
            <h2>Give Feedback</h2>
            <div>
              <Button text={'good'} clickHandler={giveGoodFeedback} />
              <Button text={'neutral'} clickHandler={giveNeutralFeedback} />
              <Button text={'bad'} clickHandler={giveBadFeedback} />
            </div>
            <Statistics
              feedback={feedback}
	      statistics={statistics}
              display={display}
            />
          </div>
        </>
    );
};

export default App;
