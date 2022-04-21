import {useState,useEffect} from "react";
import cx from "classnames";
import styles from './Card.module.scss';
import { NegotiationDisc } from "../Disc/Disc";

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

// const  actionCards = ["assemble","englishSupport","manouevre","negotiate","outmanouevre","scottishSupport","welshSupport","assemble"];

const ActionCard = ({cardImage,type,isFaceup=true,consumeCard,actionCardName,withNegotiationDisc})=>{
    const [isFrontSide, setIsFrontSide] = useState(isFaceup);
    
    const handleClick = ()=>{
        setIsFrontSide(!isFrontSide);
        type === cardType.action && consumeCard && consumeCard(actionCardName);
    }

    // useEffect(() => {
    //     isFaceup && setIsFrontSide(true);
    //     console.log("bambula")
    // }, [isFaceup])

    const cardBackface = type===cardType.action?"/images/backface-card.jpeg":"/images/region-backface-card.png";

    return(
        <button onClick={handleClick}>
            <div className={cx(styles.card,{[styles.flipped]: type === cardType.action ? true : isFrontSide})}  >
                <div className={cx(styles.front)}style={{backgroundImage:`url("${cardBackface}")`}} >
                    <div className={styles.back} style={{backgroundImage:`url("${cardImage}")`}}/>
                </div>
            {withNegotiationDisc && 
                <div className={styles.negotiationDisc}>
                    <NegotiationDisc/>
                </div>
            }
            </div>
        </button>
    )
}

export default ActionCard;

export const AssembleCard = ({isFaceup,consumeCard})=><ActionCard actionCardName={'assemble'} cardImage={imageMap.assemble} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const EnglishSupportCard = ({isFaceup,consumeCard})=><ActionCard actionCardName={'englishSupport'} cardImage={imageMap.englishSupport} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const ManouevreCard = ({isFaceup,consumeCard})=><ActionCard actionCardName={'manouevre'} cardImage={imageMap.manouevre} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const NegotiateCard = ({isFaceup,consumeCard})=><ActionCard actionCardName={'negotiate'} cardImage={imageMap.negotiate} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const OutmanouevreCard = ({isFaceup,consumeCard})=><ActionCard actionCardName={'outmanouevre'} cardImage={imageMap.outmanoeuvre} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const ScottishSupport = ({isFaceup,consumeCard})=><ActionCard actionCardName={'scottishSupport'} cardImage={imageMap.scottishSupport} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;
export const WelshSupport = ({isFaceup,consumeCard})=><ActionCard actionCardName={'welshSupport'} cardImage={imageMap.welshSupport} type={cardType.action} isFaceup={isFaceup} consumeCard={consumeCard} withNegotiationDisc={false}/>;

export const MorayCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.moray} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const DevonCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.devon} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const EssexCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.essex} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const GwyneddCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.gwynedd} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const LancasterCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.lancaster} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const NorthumbriaCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.northumbria} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const StrathclydeCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.strathclyde} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;
export const WarwickCard = ({isFaceup,withNegotiationDisc})=><ActionCard cardImage={imageMap.warwick} type={cardType.region} isFaceup={isFaceup} withNegotiationDisc={withNegotiationDisc}/>;