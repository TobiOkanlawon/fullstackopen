const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => 
      <p>
        {part.name} {part.exercises}
      </p>;

const Content = ({ parts }) =>{
    return (
        <>
          {
              parts.map((element) => <Part key={element.id} part={element}/>)
          }
        </>
    );
};

const Sum = ({sum}) => {
    return (
        <p>total of {sum} exercises</p>
    );
};

const Course = ({course, total})=> {
    return (
        <>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total sum={total}/>
        </>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    };

    const total = course.parts.reduce(
        function(previousValue, currentValue){
            return previousValue + currentValue.exercises;
        },
        0);

    return <Course
             course={course}
             total={total}
           />;
};
export default App;