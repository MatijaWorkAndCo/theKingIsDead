import {useState} from "react";
import cx from "classnames";
import styles from './Card.module.scss';

const type = "region" | "action";

const Card = ({type})=>{
    const [isFrontSide, setIsFrontSide] = useState(false);

    const handleClick = ()=>{
        setIsFrontSide(!isFrontSide);
    }
    
    return(
        <div className={cx(styles.card,{[styles.flipped]:isFrontSide})} onClick={handleClick} >
            <div className={styles.front}>
                <div className={styles.back}/>
            </div>
        </div>
    )
}

export default Card;