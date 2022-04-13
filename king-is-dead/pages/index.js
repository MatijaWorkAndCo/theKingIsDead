import Head from 'next/head';
import {useState} from 'react';
import styles from '../styles/Home.module.css';
import BoardMap from '../components/BoardMap/BoardMap.jsx';

import { InstabilityDisc, NegotiationDisc, ScottishControlDisc, EnglishControlDisc, WelshControlDisc } from '../components/Disc/Disc.jsx';
import { EnglishFollower, ScottishFollower, WelshFollower } from '../components/Follower/Follower';
import { AssembleCard, EnglishSupportCard, NegotiateCard, ManouevreCard, OutmanouevreCard, ScottishSupport, WelshSupport} from '../components/Card/Card';
import { PlayerOne, PlayerTwo } from '../components/Player/Player.jsx';

const playerInitalState = {
  followers:{
    scottish:1,
    english:2,
    welsh:3,
  },
  negotiationDisc: true,
  playedCards:[],
  startingCards:[]
}

const initalMapState = {
  bank:{
    scottish:16,
    english:16,
    welsh:16,
  },
  morray:{
    resolvedTo: null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  strathclyde:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  northumbria:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  lancaster:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  gwynedd:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  warwick:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  essex:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  },
  devon:{
    resolvedTo:null,
    followers:{
      scottish:5,
      english:5,
      welsh:5,
    },
  }
}

export default function Home() {

  const [playerOneState, setPlayerOneState] = useState(playerInitalState);
  const [playerTwoState, setPlayerTwoState] = useState(playerInitalState);

  const [mapState, setMapState] = useState(initalMapState);

  return (
    <div className={styles.container}>
      <Head>
        <title>The King Is Dead</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.players}>
            <div className={styles.playerOne}>
              <PlayerOne playerState={playerOneState}/>
            </div>
            <div className={styles.playerTwo}>
              <PlayerTwo playerState={playerTwoState}/>
            </div>
          </div>
          <div className={styles.deckHolder}>
            <AssembleCard/>
            <EnglishSupportCard/>
            <ManouevreCard/>
            <NegotiateCard/>
            <OutmanouevreCard/>
            <ScottishSupport/>
            <WelshSupport/>
            <AssembleCard/>
          </div>
        </div>
        <div className={styles.right}>  
          <BoardMap mapState={mapState}/>
        </div>
      
        
      </main>
      <div className={styles.followers}>
            <EnglishFollower/>
            <ScottishFollower/>
            <WelshFollower/>
          </div>
          <div className={styles.discs}>
            <InstabilityDisc/>
            <NegotiationDisc/>
            <ScottishControlDisc/>
            <EnglishControlDisc/>
            <WelshControlDisc/>
          </div>
    </div>
  )
}
