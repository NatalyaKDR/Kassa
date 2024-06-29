import React, { useState } from "react";
import SearchComponent from "./components/SearchComponent";
import Check from "./components/Check";
import Header from "./components/Header";
import "./App.css";
import "./font.css";
import { nanoid } from "nanoid";

function App() {
  const [purchases, setPurchases] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function modalMessage(boolean, message) {
    setIsOpen(boolean);
    setMessage(message);
  }

  const addPurchaseHandler = (title, price) => {
    const purchaseExist = purchases.find((el) => el.title === title);
    if (!purchaseExist) {
      const newPurchase = {
        key: nanoid(),
        title: title,
        price: price,
        pcs: 1,
        summPrice: price,
      };
      setPurchases([...purchases, newPurchase]);
    } else {
      purchaseExist.pcs++;
      purchaseExist.summPrice =
        Math.round(purchaseExist.price * purchaseExist.pcs * 100) / 100;
      setPurchases([...purchases]);
      let ob = document
        .getElementById(purchaseExist.key)
        .querySelector(".price");
      if (ob.classList) {
        ob.classList.remove("price");
        requestAnimationFrame(() => {
          ob.classList.add("price");
        });
      }
    }
  };

  function closeModal(title) {
    const purchaseExist = purchases.find((el) => el.title === title);
    purchaseExist.pcs++;
    purchaseExist.summPrice =
      Math.round(purchaseExist.price * purchaseExist.pcs * 100) / 100;
    setPurchases([...purchases]);
    setIsOpen(false);
  }

  function confirmModal(title) {
    setPurchases(purchases.filter((el) => el.title !== title));
    setIsOpen(false);
  }

  const dicrementFnc = (title) => {
    const purchaseExist = purchases.find((el) => el.title === title);
    purchaseExist.pcs--;
    if (purchaseExist.pcs === 0) {
      modalMessage(true, title);
    } else {
      purchaseExist.summPrice =
        Math.round(purchaseExist.price * purchaseExist.pcs * 100) / 100;
      setPurchases([...purchases]);
    }
  };
  const incrementFnc = (title) => {
    const purchaseExist = purchases.find((el) => el.title === title);
    purchaseExist.pcs++;
    purchaseExist.summPrice =
      Math.round(purchaseExist.price * purchaseExist.pcs * 100) / 100;
    setPurchases([...purchases]);
  };
  return (
    <>
      <Header />
      <div className="App">
        <Check
          purchases={purchases}
          setPurchases={setPurchases}
          dicrementFnc={dicrementFnc}
          incrementFnc={incrementFnc}
        />
        {isOpen && (
          <>
            <div className="backdrop"></div>
            <div className="modal-overlay">
              <div className="modal">
                <h3>Confirmation</h3>
                <p>Do you want delete {message}?</p>
                <div className="modal-actions">
                  <button onClick={() => confirmModal(message)}>Confirm</button>
                  <button onClick={() => closeModal(message)}>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )}

        <SearchComponent
          purchases={purchases}
          onButtonClick={addPurchaseHandler}
        />
      </div>
    </>
  );
}

export default App;
