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
    const course = {
	name: 'Half Stack application development',
	parts: [
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
	]
    };
    return (
        <div>
          <Header course={course.name}/>
          <Content parts={
              {part1:course.parts[0], part2:course.parts[1], part3:course.parts[2]}
}/>
          <Total number={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
        </div>
    );
};

export default App;
