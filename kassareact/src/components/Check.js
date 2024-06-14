// import styles from "./Check.module.css";

function Check(props) {
    const {purchases, dicrementFnc, incrementFnc} = props;
    console.log(purchases);

    return (
        <div className="check-container">
            <h2>Мои покупки</h2>
            <ol>
                {purchases.map((purchase) => (
                    <li>{purchase.title}
                        <div style={{textAlign: 'right'}}>{purchase.price}$
                            x {purchase.pcs} --- {purchase.summPrice}$ <button
                                onClick={() => incrementFnc(purchase.title)}>+</button>
                            <button onClick={() => dicrementFnc(purchase.title)}>-</button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Check;
