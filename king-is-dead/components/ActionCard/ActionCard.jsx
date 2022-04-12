import {useState} from "react";
import cx from "classnames";
import styles from './ActionCard.module.scss';

const imageMap = {
    assemble:'/images/assemble-card.png',
    englishSupport:'/images/english-support-card.png',
    manouevre:'/images/manoeuvre-card.png',
    negotiate:'/images/negotiate-card.png',
    outmanoeuvre:'/images/outmanoeuvre-card.png',
    scottishSupport:'/images/scottish-support-card.png',
    welshSupport:'/images/welsh-support-card.png'
}

const ActionCard = ({cardImage})=>{
    const [isFrontSide, setIsFrontSide] = useState(false);

    const handleClick = ()=>{
        setIsFrontSide(!isFrontSide);
    }

    return(
        <>
            <div className={cx(styles.card,{[styles.flipped]:isFrontSide})} onClick={handleClick} >
                <div className={cx(styles.front)} >
                    <div className={styles.back} style={{backgroundImage:`url("${cardImage}")`}}/>
                </div>
            </div>
        </>
    )
}

export default ActionCard;

export const AssembleCard = ()=><ActionCard cardImage={imageMap.assemble}/>;
export const EnglishSupportCard = ()=><ActionCard cardImage={imageMap.englishSupport}/>;
export const ManouevreCard = ()=><ActionCard cardImage={imageMap.manouevre}/>;
export const NegotiateCard = ()=><ActionCard cardImage={imageMap.negotiate}/>;
export const OutmanouevreCard = ()=><ActionCard cardImage={imageMap.outmanoeuvre}/>;
export const ScottishSupport = ()=><ActionCard cardImage={imageMap.scottishSupport}/>;
export const WelshSupport = ()=><ActionCard cardImage={imageMap.welshSupport}/>;
