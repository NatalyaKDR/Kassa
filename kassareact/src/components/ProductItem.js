import styles from "./ProductItem.module.css";

function ProductItem(props) {
    const {
        title,
        barcode,
        description,
        image,
        category,
        price,
        discount,
        onProductCardClick,
        onCardClick,
        onPurchase,

    } = props;
    let categoryTitle = category.title;
    const onPurchaseClick = (title, price) => (onPurchase(title, price))
    let new_price = Math.round(price * (100 - discount) * 100 / 100) / 100


    return (

        <div className={styles.product_item}>
            {discount !== 0 && (<div className={styles.discount}>
                <span className={styles.discountvalue}>{discount}%</span></div>)}

            <h2>{title}</h2>
            <div
                className={styles.link}
                onClick={() => (
                    onProductCardClick(categoryTitle, "cat"), onCardClick(categoryTitle)
                )}
            >
                {categoryTitle}
            </div>
            <p className={styles.description}>{description}</p>
            <h4>Barcode: {barcode}</h4>

            {discount !== 0 && (<>
                    <h2>{new_price}$ <span className={styles.strikethrough}>{price}$</span></h2>
                </>
            )}
            {discount === 0 && (<h2>{price}$</h2>)}


            <img onClick={() => onPurchaseClick(title, new_price)}
                 className={styles.picture}
                 src={image}
                 alt={title}
            />
        </div>
    );
}

export default ProductItem;
