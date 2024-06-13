import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import styles from "./SearchComponent.module.css";
import CategoriesList from "./CategoriesList";

function SearchComponent({ onButtonClick }) {
  let [product, setProduct] = useState("");
  let [products, setProducts] = useState([]);
  let [cat_selected, setCatSelected] = useState("");
  let [categories, setCategories] = useState([]);
  let [switch_to_products, setSwitchToProducts] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/categories/`)
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    if (cat_selected) {
      fetchProducts(cat_selected, "cat");
      setSwitchToProducts(true);
    }
  }, [cat_selected]);

  const fetchProducts = (name, search_param = "product") => {
    setProducts([]);
    fetch(`http://127.0.0.1:8000/api/v1/productlist/?${search_param}=${name}`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    let value = product;
  }

  let handleFormChange = (event) => {
    const data = event.target.value;
    setProduct(data);
    setProducts([]);
    setCatSelected("");
    fetchProducts(data);
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
    onButtonClick(product);
  };

  return (
    <div className={styles.searchCcontainer}>
      <div className={styles.FormContainer}>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={product}
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
              onProductCardClick={fetchProducts}
              onBackClick={setSwitchToProducts}
              onCardClick={onCardClick}
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
