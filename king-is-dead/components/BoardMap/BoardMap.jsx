import Image from 'next/image';
import cx from 'classnames';

import { EnglishControlDisc, InstabilityDisc } from '../Disc/Disc.jsx';
import Follower from '../Follower/Follower.jsx';

import styles from './BoardMap.module.scss';

const BoardMap = ({})=>{
    
    return(
        <div className={styles.boardWrapper}>
            <Image 
                className={styles.mapImage} 
                src={'/images/board-map.jpg'} 
                layout='fill'
                objectFit='contain'
                alt={"boardMap"}
            />
            <div className={cx(styles.bank)}><EnglishControlDisc/></div>
            <div className={cx(styles.morray,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.strathclyde,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.northumbria,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.lancaster,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.gwynedd,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.warwick,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.essex,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.devon,styles.region)}><InstabilityDisc/></div>
            <div className={cx(styles.france,styles.region)}><InstabilityDisc/></div>
        </div>
    )
}
export default BoardMap;