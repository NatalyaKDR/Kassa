// import styles from "./Check.module.css";

import {useEffect, useState} from "react";

function Check(props) {
    const {purchases, dicrementFnc, incrementFnc, setPurchases} = props;
    let [activeMoney, setActiveMoney] = useState(false)
    let [totalCheck, setTotalCheck] = useState(0);

    useEffect(() => {
        let total = 0;
        purchases.forEach(purchase => {
            total += purchase.summPrice;
        });
        total = Math.round(total * 100) / 100
        setTotalCheck(total);
    }, [purchases]);

    const CheckPost = (purchases)=>{
        fetch('http://127.0.0.1:8000/api/v1/check_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchases),
      });
    }

    const handleMoneyMouseDown = () => {
        setActiveMoney(true);
    };

    const handleMoneyMouseUp = () => {
        setTimeout(() => {
            setActiveMoney(false);
            CheckPost(purchases);
            setPurchases([])

        }, 600);
    };


    function updateClass(key) {
        let ob = document.getElementById(key).querySelector('.price')
        ob.classList.remove('price')
        setTimeout(() => {
            ob.classList.add('price')
        }, 1);
    }

    return (
        <div className="check-container">
            <h2>Мои покупки</h2>
            <ol>
                {purchases.map((purchase) => (
                    <li id={purchase.key}>{purchase.title}
                        <div style={{textAlign: 'right'}}>{purchase.price}$
                            x {purchase.pcs} --- <span className='price'>{purchase.summPrice}</span>$ <button
                                onClick={() => (incrementFnc(purchase.title), updateClass(purchase.key))}>+</button>
                            <button onClick={() => (dicrementFnc(purchase.title), updateClass(purchase.key))}>-</button>
                        </div>
                    </li>
                ))}
            </ol>
            {purchases.length > 0 && (
                <>
                    <div className='total'>Total: <div>{totalCheck}$</div></div>
                    <div className='moneyConfirm'><img
                        onMouseDown={handleMoneyMouseDown}
                        onMouseUp={handleMoneyMouseUp}
                        src={'http://127.0.0.1:8000/media/money.png'} alt='confirmButton'/>
                        <img className={`${activeMoney ? 'activeMoney' : ''}`}
                             src={'http://127.0.0.1:8000/media/money.png'}
                             alt='confirmButton'/></div>
                </>)}
        </div>
    );
}

export default Check;
