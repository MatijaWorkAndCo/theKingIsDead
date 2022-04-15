import React, {useState} from "react";
import cx from "classnames";

import styles from "./Hourglass.module.scss";

const Hourglass = ({callToAction})=>{
    const [fireAnimation, setFireAnimation] = useState(false)

    const handleOnClick =()=>{
        callToAction && callToAction();
        setFireAnimation(true);
    }
    const handleOnAnimationEnd = ()=>{
        setFireAnimation(false);
    }
    return(
        <div onAnimationEnd={handleOnAnimationEnd} className={cx(styles.hourglassBackground,{[styles.fireAnimation]:fireAnimation})} onClick={handleOnClick}>
            <div className={styles.hourglassContainer}>
                <div className={styles.hourglassCurves}></div>
                <div className={styles.hourglassCapTop}></div>
                <div className={styles.hourglassGlassTop}></div>
                <div className={styles.hourglassSand}></div>
                <div className={styles.hourglassSandStream}></div>
                <div className={styles.hourglassCapBottom}></div>
                <div className={styles.hourglassGlass}></div>
            </div>
        </div>
    )
}

export default Hourglass;