/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood((prevState) => prevState + 1);
  };

  const handleNeutralClick = () => {
    setNeutral((prevState) => prevState + 1);
  };

  const handleBadClick = () => {
    setBad((prevState) => prevState + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics text="good" value={good} />
      <Statistics text="neutral" value={neutral} />
      <Statistics text="bad" value={bad} />
    </>
  );
};

export default App;
