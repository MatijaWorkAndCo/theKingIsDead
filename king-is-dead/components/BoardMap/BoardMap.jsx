import {useEffect,useState} from 'react';
import cx from 'classnames';

import { EnglishControlDisc, InstabilityDisc, ScottishControlDisc, WelshControlDisc } from '../Disc/Disc.jsx';
import { ScottishFollower, EnglishFollower, WelshFollower } from '../Follower/Follower.jsx';
import { MorayCard,DevonCard ,EssexCard ,GwyneddCard ,LancasterCard ,NorthumbriaCard ,StrathclydeCard ,WarwickCard}from "../Card/Card.jsx";

import styles from './BoardMap.module.scss';

const renderElement = (regionState,handleClick,region) => {

    const getDisc = (resolution)=>{
        switch (resolution) {
            case "scottish": 
                return <ScottishControlDisc/>
            case "english": 
                return <EnglishControlDisc/>
            case "welsh": 
                return <WelshControlDisc/>
            case "instability": 
                return <InstabilityDisc/>
        }
    }

    return(
        <>
            { regionState.resolvedTo ? getDisc(regionState.resolvedTo)
            :
            <div className={styles.followerContainer}>
                {regionState?.followers?.scottish!==0 && [...Array(regionState?.followers?.scottish)].map((e, i) =><button key={`scottish-${i}`} onClick={()=>handleClick('scottish',region)}> <ScottishFollower /></button>)}
                {regionState?.followers?.english!==0 && [...Array(regionState?.followers?.english)].map((e, i) => <button key={`english-${i}`} onClick={()=>handleClick('english',region)}><EnglishFollower /></button>)}
                {regionState?.followers?.welsh!==0 && [...Array(regionState?.followers?.welsh)].map((e, i) => <button key={`welsh-${i}`} onClick={()=>handleClick('welsh',region)}><WelshFollower /></button>)}
            </div>
            }     
       </>    
    )
}

  
const BoardMap = ({mapState, regionCards, summonToCourt})=>{
    const { bank } = mapState;
    // const follower = 'scottish'||'english'||'welsh';
    // const region = regionCards;
    const handleClick = (follower,region)=>{
       
    }

    const [faceUpCards, setFaceUpCards] = useState([]);

    const regionCardsMap = {
        moray: <MorayCard  isFaceup={faceUpCards.includes('moray')}/>,
        devon: <DevonCard isFaceup={faceUpCards.includes('devon')}/>,
        essex: <EssexCard isFaceup={faceUpCards.includes('essex')}/>,
        gwynedd: <GwyneddCard isFaceup={faceUpCards.includes('gwynedd')}/>,
        lancaster: <LancasterCard isFaceup={faceUpCards.includes('lancaster')}/>,
        northumbria: <NorthumbriaCard isFaceup={faceUpCards.includes('northumbria')}/>,
        strathclyde: <StrathclydeCard isFaceup={faceUpCards.includes('strathclyde')}/>,
        warwick: <WarwickCard isFaceup={faceUpCards.includes('warwick')}/>,
    }

    useEffect(() => {
        regionCards.forEach((element,index) => {
            setTimeout(() => {
                setFaceUpCards([...faceUpCards,element])
            }, 600 * (index+1));
        });
    }, [])

    return(
        <div className={styles.boardWrapper}>
            <img 
                className={styles.mapImage} 
                src={'/images/board-map.jpg'} 
                alt={"boardMap"}
            />
            <div className={cx(styles.bank)}>
                <div className={styles.bankFollowers}>
                    {bank?.scottish !== 0 && [...Array(bank?.scottish)].map((e, i) => <button key={`bank-scottish-${i}`} onClick={handleClick}><ScottishFollower /></button>)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank?.english!==0 && [...Array(bank?.english)].map((e, i) => <button  key={`bank-english-${i}`}  onClick={handleClick}><EnglishFollower/></button>)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank?.welsh!==0 && [...Array(bank?.welsh)].map((e, i) =><button key={`bank-welsh-${i}`} onClick={handleClick}> <WelshFollower /></button>)}
                </div>
            </div>
            <div className={cx(styles.moray,styles.region)}>{renderElement(mapState.moray,summonToCourt,"moray")}</div>
            <div className={cx(styles.strathclyde,styles.region)}>{renderElement(mapState.strathclyde,summonToCourt,"strathclyde")}</div>
            <div className={cx(styles.northumbria,styles.region)}>{renderElement(mapState.northumbria,summonToCourt,"northumbria")}</div>
            <div className={cx(styles.lancaster,styles.region)}>{renderElement(mapState.lancaster,summonToCourt,"lancaster")}</div>
            <div className={cx(styles.gwynedd,styles.region)}>{renderElement(mapState.gwynedd,summonToCourt,"gwynedd")}</div>
            <div className={cx(styles.warwick,styles.region)}>{renderElement(mapState.warwick,summonToCourt,"warwick")}</div>
            <div className={cx(styles.essex,styles.region)}>{renderElement(mapState.essex,summonToCourt,"essex")}</div>
            <div className={cx(styles.devon,styles.region)}>{renderElement(mapState.devon,summonToCourt,"devon")}</div>
            <div className={cx(styles.france,styles.region)}>
                {[...Array(mapState.france.instabilityDiscs)].map((e, i) => <InstabilityDisc key={`instability-${i}`}/>)}
            </div>

            <div className={cx(styles.regionCardPlacement,styles.one)}>{regionCardsMap[regionCards[0]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.two)}>{regionCardsMap[regionCards[1]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.three)}>{regionCardsMap[regionCards[2]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.four)}>{regionCardsMap[regionCards[3]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.five)}>{regionCardsMap[regionCards[4]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.six)}>{regionCardsMap[regionCards[5]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.seven)}>{regionCardsMap[regionCards[6]]}</div>
            <div className={cx(styles.regionCardPlacement,styles.eight)}>{regionCardsMap[regionCards[7]]}</div>
        </div>
    )
}

export default BoardMap;