import CategoryItem from "./CategoryItem";
import styles from "./ProductList.module.css";

function CategoriesList(props) {
  const { categories, onCardClick } = props;
  return (
    <div className={styles.product_list}>
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            onCardClick={onCardClick}
            {...category}
          />
        ))}
    </div>
  );
}
export default CategoriesList;
