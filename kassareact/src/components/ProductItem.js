import styles from "./ProductItem.module.css";

function ProductItem(props) {
  const {
    title,
    barcode,
    description,
    image,
    category,
    price,
    onProductCardClick,
    onCardClick,
  } = props;
  let categoryTitle = category.title;
  return (
    <div className={styles.product_item}>
      <h2>{title}</h2>
      <div
        className={styles.link}
        onClick={() => (
          onProductCardClick(categoryTitle, "cat"), onCardClick(categoryTitle)
        )}
      >
        {categoryTitle}
      </div>
      <p>{description}</p>
      <h4>Barcode: {barcode}</h4>
      <h2>{price}$</h2>

      <img
        className={styles.picture}
        src={image}
        alt={title}
      />
    </div>
  );
}

export default ProductItem;
