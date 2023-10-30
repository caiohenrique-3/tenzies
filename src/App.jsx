// dependencies
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import Die from "./components/Die";

// css
import "./styles/index.css";

function App() {
  const [allDices, setAllDices] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

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

  useEffect(() => {
    const allIsHeld = (allDices) => allDices.every((dice) => dice.isHeld);

    const allIsSameValue = (allDices) =>
      allDices.every((dice) => dice.value === allDices[0].value);

    if (allIsHeld(allDices) && allIsSameValue(allDices)) {
      setTenzies(true);
      console.log(tenzies);
    }
  }, [allDices]);

  return (
    <>
      <div className="container">
        <main>
          {tenzies && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          <h2>Tenzies</h2>
          <p>
            Roll until all dice are the same. Click each die to freeze at its
            current value between rolls.
          </p>
          <div className="dice-container">
            {diceElements}
          </div>
          <div className="button-container">
            <button onClick={handleButtonClick}>
              {tenzies ? "Reset Game" : "Roll"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
