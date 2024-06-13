import React, { useState } from "react";
import SearchComponent from "./components/SearchComponent";
import Check from "./components/Check";
import "./App.css";

function App() {
  const [purchases, setPurchases] = useState([]);

  const addPurchaseHandler = (title) => {
    const newPurchase = {
      title: title,
    };
    setPurchases([...purchases, newPurchase]);
  };

  return (
    <div className="App">
      <h1>My Kassa</h1>
      <Check purchases={purchases} />
      <SearchComponent onButtonClick={addPurchaseHandler} />
    </div>
  );
}

export default App;
