import styles from "./ProductItem.module.css";

function CategoryItem(props) {
  const { title, image, onCardClick } = props;
  return (
    <div
      onClick={() => onCardClick(title)}
      className={`${styles.product_item} ${styles.cat}`}
      style={{ cursor: "pointer" }}
    >
      <h2>{title}</h2>
      <img
        className={styles.picture}
        src={image}
        alt={title}
      />
    </div>
  );
}

export default CategoryItem;
