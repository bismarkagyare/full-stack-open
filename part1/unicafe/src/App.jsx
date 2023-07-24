/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const totalFeedback = good + neutral + bad;
  if (totalFeedback === 0) {
    return <p>No feedback received</p>;
  }

  const average = (good - bad) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100;

  return (
    <table>
      <tbody>
        <tr>
          <td>Good:</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral:</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad:</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Total feedbacks:</td>
          <td>{totalFeedback}</td>
        </tr>
        <tr>
          <td>Average score:</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>Positive feedback percentage:</td>
          <td>{positivePercentage}%</td>
        </tr>
      </tbody>
    </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
