import styles from './Player.module.scss';
import cx from 'classnames';
import { EnglishFollower, ScottishFollower, WelshFollower } from '../Follower/Follower';
import { EnglishSupportCard } from '../Card/Card';
import { NegotiationDisc } from '../Disc/Disc';

const playerId = {
    playerOne: "Player One",
    playerTwo: "Player Two"
}

const Player = ({player, playerState, playedCards}) => {
    const playerNo = player === playerId.playerOne ? "one":"two";
    const { followers,negotiationDisc } = playerState;

    // console.log(playerState)

    return (
        <div className={styles.playerWrapper}>
            <h1 className={cx(styles.playerName, styles[playerNo])}>{player}</h1>
            <div className={styles.playedCards}>
                <EnglishSupportCard/>
                <div className={styles.negotiationDisc}>
                    {negotiationDisc && <NegotiationDisc/>}
                </div>
            </div>
            <h2 className={cx(styles.courtTitle, styles[playerNo])}>Court:</h2>
            <div className={styles.court}>
                <div className={styles.followers}>
                    {followers.scottish !== 0 && [...Array(followers.scottish)].map((e, i) => <ScottishFollower key={`${playerNo}-scottish-${i}`}/>)}
                </div>
                <div className={styles.followers}>
                    {followers.english !== 0 && [...Array(followers.english)].map((e, i) => <EnglishFollower key={`${playerNo}-english-${i}`}/>)}
                </div>
                <div className={styles.followers}>
                    {followers.welsh !== 0 && [...Array(followers.welsh)].map((e, i) => <WelshFollower key={`${playerNo}-welsh-${i}`}/>)}
                </div>
            </div>
        </div>
    )
}

export default Player;

export const PlayerOne = ({playerState}) => <Player player={playerId.playerOne} playerState={playerState}/>;
export const PlayerTwo = ({playerState}) => <Player player={playerId.playerTwo} playerState={playerState}/>;