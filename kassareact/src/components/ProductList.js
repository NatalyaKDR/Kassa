import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function ProductList(props) {
  const {
    products,
    onProductCardClick,
    cat_selected,
    onBackClick,
    onCardClick,
  } = props;
  return (
    <div>
      {cat_selected && (
        <div>
          <h2>Выбрана категория: {cat_selected} </h2>
          <span>Для разврата нажмите </span>
          <button onClick={() => onBackClick(false)}>Back</button>
        </div>
      )}
      <div className={styles.product_list}>
        {products &&
          products.map((product) => (
            <ProductItem
              key={product.id}
              onProductCardClick={onProductCardClick}
              onCardClick={onCardClick}
              {...product}
            />
          ))}
      </div>
    </div>
  );
}
export default ProductList;
