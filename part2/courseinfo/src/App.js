const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <strong>total of exercises {sum}</strong>;

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
    const courses = [
        {
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
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    const total = function({parts}){
        console.log(parts);
        return parts.reduce(
            function(previousValue, currentValue){
                return previousValue + currentValue.exercises;
            }, 0
        );
    };

    let returnList = courses.map((entry, index) => {
        return <Course
                 course={entry}
                 total={total(entry)}
                 key={entry.id}
               />;
    });
    
    return (
        <>
          <h1>Web Development Curriculum</h1>
          {returnList}
        </>
    );
};
export default App;
