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

  function allNewDice() {
    const diceArr = [...Array(10)].map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    }));
    return diceArr;
  }

  function handleButtonClick() {
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
      console.log(tenzies);
    }
  }, [allDices]);

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
      <Header handleHelpClick={handleHelpClick} />
      {showHelp && <HelpPopup handleClosePopup={handleClosePopup} />}
      <div className="container">
        <main>
          {tenzies && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          <h2>Tenzies</h2>
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
