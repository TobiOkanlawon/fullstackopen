import React from "react";

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
};

const Content = (props) => {
    return (
        <div>
          <Part part={props.parts.part1.name} exercises={props.parts.part1.exercises}/>
          <Part part={props.parts.part2.name} exercises={props.parts.part2.exercises}/>
          <Part part={props.parts.part3.name} exercises={props.parts.part3.exercises}/>
        </div>
    );
};

const Part = (props) => {
    return (
        <p>
          {props.part} {props.exercises}
        </p>
    );
};

const Total = (props) => {
    return (
        <p>Number of exercises {props.number}</p>
    );
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10,
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
        },
        {
            name: 'State of a component',
            exercises: 14,
        }
    ];
    return (
        <div>
          <Header course={course}/>
          <Content parts={
              {part1:parts[0], part2:parts[1], part3:parts[2]}
}/>
          <Total number={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
        </div>
    );
};

export default App;
