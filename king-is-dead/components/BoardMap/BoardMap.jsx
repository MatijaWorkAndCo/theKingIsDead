import cx from 'classnames';

import {MorayCard,DevonCard ,EssexCard ,GwyneddCard ,LancasterCard ,NorthumbriaCard ,StrathclydeCard ,WarwickCard}from "../Card/Card.jsx";
import { EnglishControlDisc, InstabilityDisc, ScottishControlDisc, WelshControlDisc } from '../Disc/Disc.jsx';
import { ScottishFollower, EnglishFollower, WelshFollower } from '../Follower/Follower.jsx';

import styles from './BoardMap.module.scss';

const renderElement = (regionState) => {

    console.log(regionState)

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
                {regionState.followers.scottish && Array(regionState.followers.scottish).fill(<ScottishFollower />)}
                {regionState.followers.english && Array(regionState.followers.english).fill(<EnglishFollower />)}
                {regionState.followers.welsh && Array(regionState.followers.welsh).fill(<WelshFollower />)}
            </div>
            }     
       </>    
    )
}

const BoardMap = ({mapState})=>{
    const {bank} = mapState;
    
    return(
        <div className={styles.boardWrapper}>
            <img 
                className={styles.mapImage} 
                src={'/images/board-map.jpg'} 
                alt={"boardMap"}
            />
            <div className={cx(styles.bank)}>
                <div className={styles.bankFollowers}>
                    {bank.scottish && Array(bank.scottish).fill(<ScottishFollower />)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank.english && Array(bank.english).fill(<EnglishFollower />)}
                </div>
                <div className={styles.bankFollowers}>
                    {bank.welsh && Array(bank.welsh).fill(<WelshFollower />)}
                </div>
            </div>
            <div className={cx(styles.morray,styles.region)}>{renderElement(mapState.morray)}</div>
            <div className={cx(styles.strathclyde,styles.region)}>{renderElement(mapState.strathclyde)}</div>
            <div className={cx(styles.northumbria,styles.region)}>{renderElement(mapState.northumbria)}</div>
            <div className={cx(styles.lancaster,styles.region)}>{renderElement(mapState.lancaster)}</div>
            <div className={cx(styles.gwynedd,styles.region)}>{renderElement(mapState.gwynedd)}</div>
            <div className={cx(styles.warwick,styles.region)}>{renderElement(mapState.warwick)}</div>
            <div className={cx(styles.essex,styles.region)}>{renderElement(mapState.essex)}</div>
            <div className={cx(styles.devon,styles.region)}>{renderElement(mapState.devon)}</div>
            <div className={cx(styles.france,styles.region)}>
                {/* @TODO: Solve maintanace of instability discs */}
                <InstabilityDisc/>
                <InstabilityDisc/>
                <InstabilityDisc/>
            </div>

            <div className={cx(styles.regionCardPlacement,styles.one)}><MorayCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.two)}><DevonCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.three)}><EssexCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.four)}><GwyneddCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.five)}><LancasterCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.six)}><NorthumbriaCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.seven)}><StrathclydeCard/></div>
            <div className={cx(styles.regionCardPlacement,styles.eight)}><WarwickCard/></div>
        </div>
    )
}

export default BoardMap;