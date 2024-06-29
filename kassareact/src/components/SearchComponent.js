import { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import styles from "./SearchComponent.module.css";
import CategoriesList from "./CategoriesList";
import axiosInstance from "../axios";

function SearchComponent({ onButtonClick, purchases }) {
  let [product, setProduct] = useState("");
  let [products, setProducts] = useState([]);
  let [cat_selected, setCatSelected] = useState("");
  let [categories, setCategories] = useState([]);
  let [switch_to_products, setSwitchToProducts] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (purchases.length === 0) {
      inputRef.current.focus();
    }
  });
  //   useEffect(() => {
  //       fetch(`http://127.0.0.1:8000/api/v1/categories/`)
  //           .then((response) => response.json())
  //           .then((categories) => setCategories(categories));
  //   }, []);
  useEffect(() => {
    axiosInstance.get(`api/v1/categories/`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (cat_selected) {
      getProducts(cat_selected, "cat");
      setSwitchToProducts(true);
    }
  }, [cat_selected]);

  const getProducts = (name, search_param = "product") => {
    setProducts([]);
    axiosInstance
      .get(`api/v1/productlist/?${search_param}=${name}`)
      .then((response) => {
        setProducts(response.data);
      });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (products.length === 1) {
      setProduct("");
      setProducts([]);
      setSwitchToProducts(false);
    }
  }

  let handleFormChange = (event) => {
    const data = event.target.value;
    setProduct(data);
    setProducts([]);
    setCatSelected("");
    getProducts(data);
    if (data) {
      setSwitchToProducts(true);
    } else {
      setSwitchToProducts(false);
    }
  };

  const onCardClick = (cat_title) => {
    setCatSelected(cat_title);
  };

  const handleButtonClick = () => {
    if (products.length === 1) {
      onButtonClick(products[0].title, products[0].price);
    }
  };
  const handlePurchaseClick = (title, price) => {
    onButtonClick(title, price);
  };

  return (
    <div className={styles.searchCcontainer}>
      <div className={styles.FormContainer}>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={product}
            ref={inputRef}
            onChange={handleFormChange}
          />
          <button
            type="submit"
            onClick={handleButtonClick}
          >
            Enter
          </button>
        </form>
        <div>
          {switch_to_products ? (
            <ProductList
              cat_selected={cat_selected}
              products={products}
              onProductCardClick={getProducts}
              onBackClick={setSwitchToProducts}
              onCardClick={onCardClick}
              onPurchase={handlePurchaseClick}
            />
          ) : (
            <CategoriesList
              categories={categories}
              onCardClick={onCardClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
