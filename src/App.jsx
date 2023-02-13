import { useState } from "react";
import "./App.css";

function App() {
  const [cellData, setCellData] = useState(["A", "B", "C"]);
  const [finalWord, setFinalWord] = useState("Try entering and hit Finish");

  function handleInputChange(cellIdx, value) {
    // const newCellData = [...cellData];
    // newCellData[cellIdx] = value;
    // setCellData(newCellData);

    // ---------or--------

    setCellData((prevCellData) => {
      return prevCellData.map((cell, idx) =>
        idx === cellIdx ? value.toUpperCase() : cell
      );
    });
  }

  function addLeftCell(cellIdx) {
    const newCellData = [
      ...cellData.slice(0, cellIdx),
      " ",
      ...cellData.slice(cellIdx),
    ];
    setCellData(newCellData);
  }

  function addRightCell(cellIdx) {
    const newCellData = [
      ...cellData.slice(0, cellIdx + 1),
      " ",
      ...cellData.slice(cellIdx + 1),
    ];
    setCellData(newCellData);
  }

  return (
    <div className="App">
      <div className="cell-container">
        {cellData.map((cell, cellIdx) => (
          <div className="cell" key={cellIdx}>
            <span
              className="hidden"
              onClick={() => addLeftCell(cellIdx)}
            ></span>
            <input maxLength={1}
              key={cellIdx}
              onChange={(e) => handleInputChange(cellIdx, e.target.value)}
              value={cell}
            ></input>
            <span
              className="hidden"
              onClick={() => addRightCell(cellIdx)}
            ></span>
          </div>
        ))}
      </div>
      <button onClick={() => setFinalWord(cellData.join(""))}>Finish</button>
      {finalWord && <h2>{finalWord}</h2>}
    </div>
  );
}

export default App;
