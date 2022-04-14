import {useState,useEffect} from "react";
import cx from "classnames";
import styles from './Card.module.scss';

const imageMap = {
    assemble:'/images/assemble-card.png',
    englishSupport:'/images/english-support-card.png',
    manouevre:'/images/manoeuvre-card.png',
    negotiate:'/images/negotiate-card.png',
    outmanoeuvre:'/images/outmanoeuvre-card.png',
    scottishSupport:'/images/scottish-support-card.png',
    welshSupport:'/images/welsh-support-card.png',

    moray:'/images/moray-card.png',
    devon:'/images/devon-card.png',
    essex:'/images/essex-card.png',
    gwynedd:'/images/gwynedd-card.png',
    lancaster:'/images/lancaster-card.png',
    northumbria:'/images/northumbria-card.png',
    strathclyde:'/images/strathclyde-card.png',
    warwick:'/images/warwick-card.png',

}

const cardType = {
    action: "actionCard",
    region: "regionCard"
}

const ActionCard = ({cardImage,type,isFaceup})=>{
    const [isFrontSide, setIsFrontSide] = useState(false);

    const handleClick = ()=>{
        setIsFrontSide(!isFrontSide);
    }
    useEffect(() => {
        isFaceup && setIsFrontSide(true);
    }, [isFaceup])

    const cardBackface = type===cardType.action?"/images/backface-card.jpeg":"/images/region-backface-card.png";
    return(
        <button onClick={handleClick}>
            <div className={cx(styles.card,{[styles.flipped]:isFrontSide})}  >
                <div className={cx(styles.front)}style={{backgroundImage:`url("${cardBackface}")`}} >
                    <div className={styles.back} style={{backgroundImage:`url("${cardImage}")`}}/>
                </div>
            </div>
        </button>
    )
}

export default ActionCard;

export const AssembleCard = ({isFaceup})=><ActionCard cardImage={imageMap.assemble} type={cardType.action} isFaceup={isFaceup}/>;
export const EnglishSupportCard = ({isFaceup})=><ActionCard cardImage={imageMap.englishSupport} type={cardType.action} isFaceup={isFaceup}/>;
export const ManouevreCard = ({isFaceup})=><ActionCard cardImage={imageMap.manouevre} type={cardType.action} isFaceup={isFaceup}/>;
export const NegotiateCard = ({isFaceup})=><ActionCard cardImage={imageMap.negotiate} type={cardType.action} isFaceup={isFaceup}/>;
export const OutmanouevreCard = ({isFaceup})=><ActionCard cardImage={imageMap.outmanoeuvre} type={cardType.action} isFaceup={isFaceup}/>;
export const ScottishSupport = ({isFaceup})=><ActionCard cardImage={imageMap.scottishSupport} type={cardType.action} isFaceup={isFaceup}/>;
export const WelshSupport = ({isFaceup})=><ActionCard cardImage={imageMap.welshSupport} type={cardType.action} isFaceup={isFaceup}/>;

export const MorayCard = ({isFaceup})=><ActionCard cardImage={imageMap.moray} type={cardType.region} isFaceup={isFaceup}/>;
export const DevonCard = ({isFaceup})=><ActionCard cardImage={imageMap.devon} type={cardType.region} isFaceup={isFaceup}/>;
export const EssexCard = ({isFaceup})=><ActionCard cardImage={imageMap.essex} type={cardType.region} isFaceup={isFaceup}/>;
export const GwyneddCard = ({isFaceup})=><ActionCard cardImage={imageMap.gwynedd} type={cardType.region} isFaceup={isFaceup}/>;
export const LancasterCard = ({isFaceup})=><ActionCard cardImage={imageMap.lancaster} type={cardType.region} isFaceup={isFaceup}/>;
export const NorthumbriaCard = ({isFaceup})=><ActionCard cardImage={imageMap.northumbria} type={cardType.region} isFaceup={isFaceup}/>;
export const StrathclydeCard = ({isFaceup})=><ActionCard cardImage={imageMap.strathclyde} type={cardType.region} isFaceup={isFaceup}/>;
export const WarwickCard = ({isFaceup})=><ActionCard cardImage={imageMap.warwick} type={cardType.region} isFaceup={isFaceup}/>;