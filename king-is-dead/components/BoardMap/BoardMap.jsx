import {useEffect,useMemo,useState,useCallback} from 'react';
import cx from 'classnames';

import RegionCards from './RegionCards';
import { EnglishControlDisc, InstabilityDisc, ScottishControlDisc, WelshControlDisc } from '../Disc/Disc.jsx';
import { ScottishFollower, EnglishFollower, WelshFollower } from '../Follower/Follower.jsx';

import {setIntervalX} from '../../lib/helper';


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

const BoardMap = ({cardRef,mapState,regionCards,handleFollowerOnMapClick,handleFollowerInBankClick,handleTeritoryClick})=>{
    const { bank } = mapState;
    
    return(
        <div className={styles.boardWrapper}>
            <img 
                className={styles.mapImage} 
                src={'/images/board-map.jpg'} 
                alt={"boardMap"}
            />
            <div className={cx(styles.bank)}>
                <div className={styles.bankFollowers}>
                    {bank?.scottish.length && [...Array(bank?.scottish)].map((e, i) => <button key={`bank-scottish-${i}`} onClick={()=>handleFollowerInBankClick("scottish")}><ScottishFollower /></button>)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank?.english.length && [...Array(bank?.english)].map((e, i) => <button  key={`bank-english-${i}`}  onClick={()=>handleFollowerInBankClick("english")}><EnglishFollower/></button>)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank?.welsh.length && [...Array(bank?.welsh)].map((e, i) =><button key={`bank-welsh-${i}`} onClick={()=>handleFollowerInBankClick("welsh")}> <WelshFollower /></button>)}
                </div>
            </div>
            <div onClick={()=>handleTeritoryClick('moray')} className={cx(styles.moray,styles.region)}>{renderElement(mapState.moray,handleFollowerOnMapClick,"moray")}</div>
            <div onClick={()=>handleTeritoryClick('strathclyde')} className={cx(styles.strathclyde,styles.region)}>{renderElement(mapState.strathclyde,handleFollowerOnMapClick,"strathclyde")}</div>
            <div onClick={()=>handleTeritoryClick('northumbria')} className={cx(styles.northumbria,styles.region)}>{renderElement(mapState.northumbria,handleFollowerOnMapClick,"northumbria")}</div>
            <div onClick={()=>handleTeritoryClick('lancaster')} className={cx(styles.lancaster,styles.region)}>{renderElement(mapState.lancaster,handleFollowerOnMapClick,"lancaster")}</div>
            <div onClick={()=>handleTeritoryClick('gwynedd')} className={cx(styles.gwynedd,styles.region)}>{renderElement(mapState.gwynedd,handleFollowerOnMapClick,"gwynedd")}</div>
            <div onClick={()=>handleTeritoryClick('warwick')} className={cx(styles.warwick,styles.region)}>{renderElement(mapState.warwick,handleFollowerOnMapClick,"warwick")}</div>
            <div onClick={()=>handleTeritoryClick('essex')} className={cx(styles.essex,styles.region)}>{renderElement(mapState.essex,handleFollowerOnMapClick,"essex")}</div>
            <div onClick={()=>handleTeritoryClick('devon')} className={cx(styles.devon,styles.region)}>{renderElement(mapState.devon,handleFollowerOnMapClick,"devon")}</div>
            <div className={cx(styles.france,styles.region)}>
                {[...Array(mapState.france.instabilityDiscs)].map((e, i) => <InstabilityDisc key={`instability-${i}`}/>)}
            </div>

         
            <RegionCards cardRef={cardRef} regionCards={regionCards}/>

        </div>
    )
}

export default BoardMap;