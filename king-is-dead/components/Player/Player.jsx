import {useState} from 'react';
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
    const {followers,negotiationDisc} = playerState;

    return (
        <div className={styles.playerWrapper}>
            <h1 className={cx(styles.playerName, styles[playerNo])}>{player}</h1>
            <div className={styles.playedCards}>
                <EnglishSupportCard/>
                <div className={styles.negotiationDisc}>
                    {negotiationDisc && <NegotiationDisc/>}
                </div>
            </div>
            <div className={styles.court}>
                <div className={styles.followers}>
                    {followers.scottish && Array(followers.scottish).fill(<ScottishFollower />)}
                </div>
                <div className={styles.followers}>
                    {followers.english && Array(followers.english).fill(<EnglishFollower />)}
                </div>
                <div className={styles.followers}>
                    {followers.welsh && Array(followers.welsh).fill(<WelshFollower />)}
                </div>
            </div>
       
        </div>
    )
}

export default Player;

export const PlayerOne = ({playerState}) => <Player player={playerId.playerOne} playerState={playerState}/>;
export const PlayerTwo = ({playerState}) => <Player player={playerId.playerTwo} playerState={playerState}/>;