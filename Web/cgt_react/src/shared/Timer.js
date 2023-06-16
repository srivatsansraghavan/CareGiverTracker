import { useState, useEffect, useRef } from "react";

function Timer({ showTimer, outputId }) {
  const [counter, setCounter] = useState(0);
  let timeTaken = useRef(0);

  useEffect(() => {
    if (showTimer) {
      setTimeout(() => setCounter(counter + 1000), 1000);
    } else {
      timeTaken.current = counter / 1000;
      setCounter(0);
    }
  }, [counter, showTimer, timeTaken]);

  return (
    <div className="timer">
      {showTimer ? (
        <p>
          {Math.floor((counter / (3600 * 1000)) % 24)}:
          {Math.floor((counter / (60 * 1000)) % 60)}:
          {Math.floor((counter / 1000) % 60)}
        </p>
      ) : (
        <div id="timeTaken">
          <span id={outputId}>{timeTaken.current}</span>s
        </div>
      )}
    </div>
  );
}

export default Timer;
