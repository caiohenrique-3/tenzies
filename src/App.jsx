// dependencies
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import Die from "./components/Die";
import Header from "./components/Header";
import HelpPopup from "./components/HelpPopup";

// css
import "./styles/index.css";

function App() {
  const [allDices, setAllDices] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [record, setRecord] = useState(() =>
    localStorage.getItem("personalRecord") || 0
  );

  function allNewDice() {
    const diceArr = [...Array(10)].map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    }));
    return diceArr;
  }

  function handleButtonClick() {
    setRolls((prevState) => prevState + 1);

    if (!tenzies) {
      const updatedDices = [...allDices];
      for (let z = 0; z < allDices.length; z++) {
        if (!updatedDices[z].isHeld) {
          updatedDices[z] = {
            ...updatedDices[z],
            value: Math.floor(Math.random() * 6) + 1,
          };
        }
      }

      setAllDices(updatedDices);
    } else {
      setTenzies(false);
      setAllDices(allNewDice());
      setRolls(0);
    }
  }

  function handleDieClick(index) {
    const updatedDices = [...allDices];
    updatedDices[index] = {
      ...updatedDices[index],
      isHeld: !updatedDices[index].isHeld,
    };
    setAllDices(updatedDices);
  }

  const diceElements = allDices.map((die, index) => {
    return (
      <Die
        key={index}
        id={index}
        isHeld={die.isHeld}
        number={die.value}
        handleDieClick={handleDieClick}
      />
    );
  });

  function handleHelpClick() {
    setShowHelp((prevState) => !prevState);
  }

  function handleClosePopup() {
    setShowHelp(false);
  }

  useEffect(() => {
    const allIsHeld = (allDices) => allDices.every((dice) => dice.isHeld);

    const allIsSameValue = (allDices) =>
      allDices.every((dice) => dice.value === allDices[0].value);

    if (allIsHeld(allDices) && allIsSameValue(allDices)) {
      setTenzies(true);
    }
  }, [allDices]);

  useEffect(() => {
    if (tenzies) {
      if (record === 0) {
        setRecord(rolls);
        localStorage.setItem("personalRecord", rolls);
      } else {
        if (rolls < record) {
          setRecord(rolls);
          localStorage.setItem("personalRecord", rolls);
        }
      }
    }
  }, [tenzies]);

  useEffect(() => {
    function handleEscKey(event) {
      if (event.keyCode === 27) {
        setShowHelp(false);
      }
    }

    function handleClickOutside(event) {
      if (event.target.className === "popup") {
        setShowHelp(false);
      }
    }

    if (showHelp) {
      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showHelp]);

  return (
    <>
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Header handleHelpClick={handleHelpClick} />
      {showHelp && <HelpPopup handleClosePopup={handleClosePopup} />}
      <div className="container">
        <main>
          <p id="record-label">🥇 Personal Record: {record} ⏰ Best time</p>
          <h2>Tenzies • Rolls {rolls}</h2>
          <div className="dice-container">
            {diceElements}
          </div>
          <div className="button-container">
            <button id="roll-button" onClick={handleButtonClick}>
              {tenzies ? "Reset Game" : "Roll"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
