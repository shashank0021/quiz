import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=9&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          setQuestions(data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (index < 9) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex < 8 ? prevIndex + 1 : prevIndex));
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [index]);

  function validateAnswer(selectedAnswer) {
    if (selectedAnswer === questions[index].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectCount((prevCount) => prevCount + 1);
    }
    setIndex((prevIndex) => (prevIndex < 8 ? prevIndex + 1 : 9));
  }

  return (
    <div>
      {index < 9 ? (
        <div>
          <h1>Let's have a quiz, Question : {index + 1}</h1>
          {questions.length > 0 ? (
            <div>
              <p>{questions[index].question}</p>
              {[...questions[index].incorrect_answers, questions[index].correct_answer]
                .sort()
                .map((answer, ind) => (
                  <button key={ind} onClick={() => validateAnswer(answer)}>
                    {answer}
                  </button>
              ))}
            </div>
          ) : null}
          <br />
          <button onClick={() => setIndex((prevIndex) => (prevIndex < 8 ? prevIndex + 1 : 9))}>Skip Question</button>
        </div>
      ) : (
        <div>
          <h1>Quiz is Over</h1>
          <p>Score: {score}/9</p>
          <p>Correct Answers: {correctCount}</p>
          <p>Incorrect Answers: {incorrectCount}</p>
        </div>
      )}
    </div>
  );
}

export default App;