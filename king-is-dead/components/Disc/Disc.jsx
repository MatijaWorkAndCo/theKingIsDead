import cx from 'classnames';

import styles from './Disc.module.scss';


const Disc = ({type=''})=>{
    return <div className={cx(styles.disc,styles[type])}></div>
}

export default Disc;

export const InstabilityDisc = ()=><Disc type={"instability"}/>;
export const NegotiationDisc = ()=><Disc type={"negotiation"}/>;

export const ScottishControlDisc = ()=><Disc type={"scottish"}/>;
export const EnglishControlDisc = ()=><Disc type={"english"}/>;
export const WelshControlDisc = ()=><Disc type={"welsh"}/>;
