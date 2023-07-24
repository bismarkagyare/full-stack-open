/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = () => {
    setGood((prevState) => prevState + 1);
    setNeutral((prevState) => prevState + 1);
    setBad((prevState) => prevState + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleClick} />
      <Button text="neutral" />
      <Button text="bad" />
      <h1>statistics</h1>
    </>
  );
};

export default App;
