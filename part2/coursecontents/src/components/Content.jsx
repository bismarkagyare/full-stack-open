/* eslint-disable react/prop-types */
const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h4>Total of {totalExercises} exercises</h4>;
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((singleCourse) => (
        <div key={singleCourse.id}>
          <Header course={singleCourse} />
          <Content parts={singleCourse.parts} />
          <Total parts={singleCourse.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
