import Head from 'next/head';
import {useState,useEffect} from 'react';
import styles from '../styles/Home.module.css';
import BoardMap from '../components/BoardMap/BoardMap.jsx';
import {shuffle,randomizeFollowers,randomIntFromInterval} from '../lib/helper.js';

import { InstabilityDisc, NegotiationDisc, ScottishControlDisc, EnglishControlDisc, WelshControlDisc } from '../components/Disc/Disc.jsx';
import { EnglishFollower, ScottishFollower, WelshFollower } from '../components/Follower/Follower';
import { AssembleCard, EnglishSupportCard, NegotiateCard, ManouevreCard, OutmanouevreCard, ScottishSupport, WelshSupport} from '../components/Card/Card';
import { PlayerOne, PlayerTwo } from '../components/Player/Player.jsx';

const playerInitalState = {
  followers:{
    scottish:0,
    english:0,
    welsh:0,
  },
  negotiationDisc: true,
  playedCards:[],
  startingCards:[]
}

const initalMapState = {
  bank:{
    scottish: 14,
    english: 14,
    welsh: 14,
  },
  france:{
    instabilityDiscs:3,
  },
  moray:{
    resolvedTo:  null,
    followers:{
      scottish:2,
      english:0,
      welsh:0,
    },
  },
  strathclyde:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:0,
    },
  },
  northumbria:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:0,
    },
  },
  lancaster:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:0,
    },
  },
  gwynedd:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:2,
    },
  },
  warwick:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:0,
    },
  },
  essex:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:2,
      welsh:0,
    },
  },
  devon:{
    resolvedTo: null,
    followers:{
      scottish:0,
      english:0,
      welsh:0,
    },
  }
}

const initalRegionCards = ["moray", "devon", "essex", "gwynedd", "lancaster", "northumbria", "strathclyde", "warwick",];

export default function Home() {
  const [regionCards, setRegionCards] = useState(shuffle(initalRegionCards));

  const [playerOneState, setPlayerOneState] = useState(playerInitalState);
  const [playerTwoState, setPlayerTwoState] = useState(playerInitalState);
  const [mapState, setMapState] = useState();

  const [hasDeltFollowersToPlayers, setHasDeltFollowersToPlayers] = useState(false);

  const [isMapSet, setIsMapSet] = useState(false)

  const summonToCourt = (follower,region) => {
    //mozda if region === "bank" alert('must be from a region');
    setMapState({...mapState,[region]:{...mapState[region],followers: {...mapState[region].followers,[follower]:mapState[region].followers[follower] - 1}}});

    // if(playerTurn === "playerOne"){
      setPlayerOneState({...playerOneState,followers:{...playerOneState.followers,[follower]: playerOneState.followers[follower] + 1} })
    // }
    // if(playerTurn === "playerTwo"){
    // }
  }

  const initalMapStateCopy = initalMapState;

  
  const dealFollowersToPlayers = ()=>{
    const possibleFollower = ["scottish", "english","welsh"];
    const getFirstRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
    const getSecondRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
    const getThirdRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
    const getFourthRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];

    let finalPlayerOneState = playerOneState;
    let finalPlayerTwoState = playerTwoState;
    let finalMapState = mapState;

    finalPlayerOneState = {...finalPlayerOneState,followers:{...finalPlayerOneState.followers,[getFirstRandomFollower]:finalPlayerOneState.followers[getFirstRandomFollower]+1}};
    finalMapState = {...finalMapState, bank: {...finalMapState.bank, [getSecondRandomFollower]:finalMapState.bank[getSecondRandomFollower] - 1}};

    finalPlayerOneState = {...finalPlayerOneState,followers:{...finalPlayerOneState.followers,[getSecondRandomFollower]:finalPlayerOneState.followers[getSecondRandomFollower]+1}};
    finalMapState = {...finalMapState, bank: {...finalMapState.bank, [getFirstRandomFollower]:finalMapState.bank[getFirstRandomFollower] - 1}};
    
    finalPlayerTwoState = {...finalPlayerTwoState,followers:{...finalPlayerTwoState.followers,[getThirdRandomFollower]:finalPlayerTwoState.followers[getThirdRandomFollower]+1}};
    finalMapState = {...finalMapState, bank: {...finalMapState.bank, [getThirdRandomFollower]:finalMapState.bank[getThirdRandomFollower] - 1}};

    finalPlayerTwoState = {...finalPlayerTwoState,followers:{...finalPlayerTwoState.followers,[getFourthRandomFollower]:finalPlayerTwoState.followers[getFourthRandomFollower]+1}};
    finalMapState = {...finalMapState, bank: {...finalMapState.bank, [getFourthRandomFollower]:finalMapState.bank[getFourthRandomFollower] - 1}};

    setPlayerOneState(finalPlayerOneState);
    setPlayerTwoState(finalPlayerTwoState);

    setMapState({...finalMapState});
    setHasDeltFollowersToPlayers(true);
  };

  useEffect(() => {
    console.log('wrf');
    
    isMapSet === false && setMapState(randomizeFollowers(initalMapStateCopy));
    setIsMapSet(true);

    mapState && hasDeltFollowersToPlayers === false && dealFollowersToPlayers();
    
    
  }, [mapState]);

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
            {playerOneState && <PlayerOne playerState={playerOneState}/>}
            </div>
            <div className={styles.playerTwo}>
            {playerTwoState && <PlayerTwo playerState={playerTwoState}/>}
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
         {mapState && <BoardMap mapState={mapState} regionCards={regionCards} summonToCourt={summonToCourt}/>}
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
