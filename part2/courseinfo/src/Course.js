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

export default Course;
