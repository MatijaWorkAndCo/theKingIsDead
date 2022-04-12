import cx from 'classnames';
import styles from './Follower.module.scss';

const Follower = ({nationality=""})=>{

return (
    <div className={styles.cube}>
        <div className={cx(styles.face,styles[nationality])}></div>
        <div className={cx(styles.face,styles[nationality])}></div>
        <div className={cx(styles.face,styles[nationality])}></div>
        <div className={cx(styles.face,styles[nationality])}></div>
        <div className={cx(styles.face,styles[nationality])}></div>
        <div className={cx(styles.face,styles[nationality])}></div>
    </div>
)
}
export default Follower;

export const ScottishFollower = ()=> <Follower nationality={"scottish"}/>;
export const EnglishFollower = ()=> <Follower nationality={"english"}/>;
export const WelshFollower = ()=> <Follower nationality={"welsh"}/>;
