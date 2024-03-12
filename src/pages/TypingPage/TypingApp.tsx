import React, { useState, useEffect } from "react";
import Detector from "./Detector";
import Timer from "./Timer";
import { BsFillKeyboardFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";

const AVG_WORD_LEN = 5;

function TypingApp() {
  const [text, setText] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(60);
  const [userInput, setUserInput] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [correctWordCount, setCorrectWordCount] = useState<number>(0);
  const [totalWordCount, setTotalWordCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchQuote = async () => {
          const response = await fetch('https://api.quotable.io/random');
          if (!response.ok) {
            throw new Error('Failed to fetch quote');
          }
          const data = await response.json();
          return data.content;
        };
  
        const fetchMultipleQuotes = async () => {
          const newQuotes = [];
          for (let i = 0; i < 10; i++) {
            const quote = await fetchQuote();
            newQuotes.push(quote);
          }
          return newQuotes;
        };
  
        const quotes = await fetchMultipleQuotes(); // Fetch 10 random quotes
        setText(quotes);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };
  
    fetchData();
  }, []);
  
  function onRestart() {
    setCorrectWordCount(0);
    setTotalWordCount(0);
    setUserInput("");
    setStarted(false);
    setFinished(false);
  }

  function onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    const isCorrect = v === text.join("").slice(0, v.length);
    handleWordCount(isCorrect);
    startTimer();
    setUserInput(v);
    checkIfFinished(v);
  }

  function startTimer() {
    setStarted(true);
  }

  function checkIfFinished(input: string) {
    if (input === text.join("")) {
      setFinished(true);
    }
  }

  function handleWordCount(isCorrect: boolean) {
    if (!started) return;
    if (isCorrect) {
      setCorrectWordCount((prev) => prev + 1);
    }
    setTotalWordCount((prev) => prev + 1);
  }

  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center min-h-screen text-white font-bold text-xl">
      <header className="flex w-full max-w-6xl items-center justify-between">
        <div className="flex space-x-1 px-3 py-3 items-center ">
          <p className="w-max font-bold flex items-center justify-center gap-2 animate-pulse"><BsFillKeyboardFill className="text-2xl" /> Speed Typo</p>
        </div>
        <div className="flex items-center justify-center animate-pulse"> <IoIosTimer className="text-2xl"/><Timer
          timer={timer}
          setTimer={setTimer}
          started={started}
          finished={finished}
          handleTimerExpiry={() => {
            setFinished(true);
          }}
        /></div>
      </header>
      <main className="w-full flex-1 max-w-6xl flex flex-col items-center justify-center px-4 space-y-4">
      {loading && <p>Please Wait Text is Loading...</p>}
      {!loading && finished && (
            <div className="w-full text-center space-y-4 mb- animate-bounce">
            <h2 className="font-bold text-xl">Stats:</h2>
            <div className="flex flex-col w-full justify-between items-center space-y-4 sm:flex-row">
              <div className="sm:text-left">
                <p className="text-4xl">
                  {Math.round(
                    correctWordCount / (AVG_WORD_LEN * (1 - timer / 60))
                  ) || 0}
                </p>
                <p> words per minute</p>
              </div>
              <div className="sm:text-right">
                <p className="text-4xl">
                  {Math.round((correctWordCount / totalWordCount) * 100) || 0}%
                </p>
                <p>Accuracy</p>
              </div>
            </div>
          </div>
        )}

        <Detector text={text.join("")} userInput={userInput} />
        <textarea
          className="w-full px-3 py-3 resize-none text-black"
          placeholder="Start typing..."
          value={userInput}
          onChange={onInputChange}
          readOnly={finished}
        />
        <div className="flex w-full items-center justify-center">
          <button
            className="rounded bg-green-600 disabled:bg-red-500 disabled:cursor-not-allowed px-2 py-2 text-white self-end"
            onClick={onRestart}
            disabled={!started}
          >
            Restart
          </button>
        </div>
      </main>
    </div>
  );
}

export default TypingApp;
