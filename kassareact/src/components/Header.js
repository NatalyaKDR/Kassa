import {useState,useEffect} from "react";
import styles from './Header.module.css'
import { useInterval } from 'react-use';


function Header() {
    const [now,setNow] = useState(new Date())
    useInterval(()=>{setNow(new Date());
        },
        1000)
    return (
        <header className={styles.header}><span className={styles.time}>{now.toLocaleTimeString()}</span></header>

    )

}
export default Header