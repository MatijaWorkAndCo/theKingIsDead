import {useState} from "react";
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

const ActionCard = ({cardImage,type})=>{
    const [isFrontSide, setIsFrontSide] = useState(false);

    const handleClick = ()=>{
        setIsFrontSide(!isFrontSide);
    }
    const cardBackface = type===cardType.action?"/images/backface-card.jpeg":"/images/region-backface-card.png";
    return(
        <>
            <div className={cx(styles.card,{[styles.flipped]:isFrontSide})} onClick={handleClick} >
                <div className={cx(styles.front)}style={{backgroundImage:`url("${cardBackface}")`}} >
                    <div className={styles.back} style={{backgroundImage:`url("${cardImage}")`}}/>
                </div>
            </div>
        </>
    )
}

export default ActionCard;

export const AssembleCard = ()=><ActionCard cardImage={imageMap.assemble} type={cardType.action}/>;
export const EnglishSupportCard = ()=><ActionCard cardImage={imageMap.englishSupport} type={cardType.action}/>;
export const ManouevreCard = ()=><ActionCard cardImage={imageMap.manouevre} type={cardType.action}/>;
export const NegotiateCard = ()=><ActionCard cardImage={imageMap.negotiate} type={cardType.action}/>;
export const OutmanouevreCard = ()=><ActionCard cardImage={imageMap.outmanoeuvre} type={cardType.action}/>;
export const ScottishSupport = ()=><ActionCard cardImage={imageMap.scottishSupport} type={cardType.action}/>;
export const WelshSupport = ()=><ActionCard cardImage={imageMap.welshSupport} type={cardType.action}/>;


export const MorayCard = ()=><ActionCard cardImage={imageMap.moray} type={cardType.region}/>;
export const DevonCard = ()=><ActionCard cardImage={imageMap.devon} type={cardType.region}/>;
export const EssexCard = ()=><ActionCard cardImage={imageMap.essex} type={cardType.region}/>;
export const GwyneddCard = ()=><ActionCard cardImage={imageMap.gwynedd} type={cardType.region}/>;
export const LancasterCard = ()=><ActionCard cardImage={imageMap.lancaster} type={cardType.region}/>;
export const NorthumbriaCard = ()=><ActionCard cardImage={imageMap.northumbria} type={cardType.region}/>;
export const StrathclydeCard = ()=><ActionCard cardImage={imageMap.strathclyde} type={cardType.region}/>;
export const WarwickCard = ()=><ActionCard cardImage={imageMap.warwick} type={cardType.region}/>;