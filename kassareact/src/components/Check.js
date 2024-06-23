//import styles from "./Check.module.css";

import money_img from './money.png'
import React, {useEffect, useState} from "react";

function Check(props) {
    const {purchases, dicrementFnc, incrementFnc, setPurchases} = props;
    let [activeMoney, setActiveMoney] = useState(false)
    let [totalCheck, setTotalCheck] = useState(0);
    let [isOpenPopUp, setIsOpenPopUp] = useState(false)

    useEffect(() => {
        let total = 0;
        purchases.forEach(purchase => {
            total += purchase.summPrice;
        });
        total = Math.round(total * 100) / 100
        setTotalCheck(total);
    }, [purchases]);

    const CheckPost = (purchases) => {
        fetch('http://127.0.0.1:8000/api/v1/check_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchases),

        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Saved') {
                    setIsOpenPopUp(true)
                } else {
                    alert('Not saved')
                }
            })
            .catch(error => {
                return error
            })
    }

    const closeModal = () => {
        setIsOpenPopUp(false)
        setActiveMoney(true);
        setTimeout(() => {
            setActiveMoney(false);
            setPurchases([])
        }, 600);
    }

    function updateClass(key) {
        let ob = document.getElementById(key).querySelector('.price');
        if (ob.classList) {
            ob.classList.remove('price');
            requestAnimationFrame(() => {
                ob.classList.add('price');
            });
        }
    }

    return (<>
            {isOpenPopUp && (<>
                    <div className="backdrop"></div>
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Do you want print Check?</h3>
                            <div className="modal-actions">
                                <button onClick={() => closeModal()}>Confirm</button>
                                <button onClick={() => closeModal()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="check-container">
                <h2>Мои покупки</h2>
                <ol>
                    {purchases.map((purchase) => (

                        <li key={purchase.key} id={purchase.key}>{purchase.title}
                            <div style={{textAlign: 'right'}}>{purchase.price}$
                                x {purchase.pcs} --- <span className='price'>{purchase.summPrice}</span>$ <button
                                    onClick={() => (incrementFnc(purchase.title), updateClass(purchase.key))}>+</button>
                                <button onClick={() => (dicrementFnc(purchase.title), updateClass(purchase.key))}>-
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
                {purchases.length > 0 && (
                    <>
                        <div className='total'>Total: <div>{totalCheck}$</div></div>
                        <div className='moneyConfirm'><img
                            // onMouseDown={handleMoneyMouseDown}
                            onMouseUp={() => CheckPost(purchases)}
                            src={money_img} alt='confirmButton'/>
                            <img className={`${activeMoney ? 'activeMoney' : ''}`}
                                 src={money_img}
                                 alt='confirmButton'/></div>
                    </>)}
            </div>
        </>
    );
}

export default Check;
