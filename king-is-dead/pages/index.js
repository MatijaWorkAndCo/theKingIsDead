import Head from 'next/head';
import React, {useState,useEffect,useCallback,useRef} from 'react';
import styles from '../styles/Home.module.css';
import BoardMap from '../components/BoardMap/BoardMap.jsx';
import {shuffle,randomizeFollowers,randomIntFromInterval,setIntervalX,removeFromArray,swap} from '../lib/helper.js';

import { MorayCard,DevonCard ,EssexCard ,GwyneddCard ,LancasterCard ,NorthumbriaCard ,StrathclydeCard ,WarwickCard}from "../components/Card/Card.jsx";
import { AssembleCard, EnglishSupportCard, NegotiateCard, ManouevreCard, OutmanouevreCard, ScottishSupport, WelshSupport} from '../components/Card/Card';
import { PlayerOne, PlayerTwo } from '../components/Player/Player.jsx';
import Hourglass from '../components/Hourglass/Hourglass';
import Modal from '../components/Modal/Modal';

const playerOneInitalState = {
  followers:{
    scottish:0,
    english:0,
    welsh:0,
  },
  negotiationDisc: true,
  playedCards:[],
  cards:["assemble","englishSupport","manouevre","negotiate","outmanouevre","scottishSupport","welshSupport","assemble"],
  canSummonToCourt: false,
}

const playerTwoInitalState = {
  followers:{
    scottish:0,
    english:0,
    welsh:0,
  },
  negotiationDisc: true,
  playedCards:[],
  cards:["assemble","englishSupport","manouevre","negotiate","outmanouevre","scottishSupport","welshSupport","assemble"],
  canSummonToCourt: false,
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

const initalRegionCards = [
  {
    name:"moray",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><MorayCard {...props}/>,
    borderingRegions: ["strathclyde"]
  },
  {
    name:"devon",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><DevonCard {...props}/>,
    borderingRegions: ["warwick","essex","gwynedd"]
  },
  {
    name:"essex",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><EssexCard {...props}/>,
    borderingRegions: ["devon","warwick","northumbria"]
  },
  {
    name:"gwynedd",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><GwyneddCard {...props}/>,
    borderingRegions: ["devon","warwick","lancaster"]
  },
  {
    name:"lancaster",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><LancasterCard {...props}/>,
    borderingRegions: ["gwynedd","warwick","northumbria","strathclyde"]
  },
  {
    name:"northumbria",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><NorthumbriaCard {...props}/>,
    borderingRegions: ["lancaster","warwick","essex","strathclyde"]
  },
  {
    name:"strathclyde",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><StrathclydeCard {...props}/>,
    borderingRegions: ["moray","northumbria","lancaster"]
  },
  {
    name:"warwick",
    withNegotiationDisc:false,
    isFaceup:true,
    component:({...props})=><WarwickCard {...props}/>,
    borderingRegions: ["gwynedd","devon","lancaster","essex","northumbria"]
  },
]

const PlayerTurn = React.createContext('playerOne');

const playerActions = {
  pass:'pass',
  actionCard:'actionCard',
}

const powerStruggleResolve = {
  instability:'instability',
  scottish:'scottish',
  welsh:'welsh',
  english:'english'
}

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [regionCards, setRegionCards] = useState([]);
  const [currentRegionStruggle, setCurrentRegionStruggle] = useState(0);
  const cardRef = useRef([]);

  const [turnState, setTurnState] = useState({playerOne:'',playerTwo:''})
  const [playerTurn, setPlayerTurn] = useState('playerOne');
  //Action Cards additional states
  const [shouldHandleManoeuvre, setShouldHandleManoeuvre] = useState(false);
  const [shouldHandleOutmanoeuvre, setShouldHandleOutmanoeuvre] = useState(false);
  const [shouldHandleAssemble, setShouldHandleAssemble] = useState(false);

  const [isEligibleForTeritoryClick, setIsEligibleForTeritoryClick] = useState(false);

  const isPowerStruggle = turnState.playerOne === "pass" && turnState.playerTwo === "pass";

  const [playerOneState, setPlayerOneState] = useState(playerOneInitalState);
  const [playerTwoState, setPlayerTwoState] = useState(playerTwoInitalState);
  const [mapState, setMapState] = useState();

  const [hasDeltFollowersToPlayers, setHasDeltFollowersToPlayers] = useState(false);
  const [isMapSet, setIsMapSet] = useState(false)
      
  const handleNextTurn = (action) => { 
    setTurnState(playerTurn === 'playerOne'?
    {...turnState,playerOne:action}:
    {...turnState,playerTwo:action});

    setTimeout(() => {
      toggleModal()
    }, 1500);
    
    setTimeout(() => {
      playerTurn === 'playerOne' ? setPlayerTurn('playerTwo') : setPlayerTurn('playerOne');
    }, 1450);
  }

  const summonToCourt = (follower,region) => {

      if(region === "bank") {
        alert('must be from a region');
      }else{
        setMapState({...mapState,[region]:{...mapState[region],followers: {...mapState[region].followers,[follower]:mapState[region].followers[follower] - 1}}});
        
        if(playerTurn === "playerOne"){
          setPlayerOneState({...playerOneState,followers:{...playerOneState.followers,[follower]: playerOneState.followers[follower] + 1},canSummonToCourt:false })
        }else {
          setPlayerTwoState({...playerTwoState,followers:{...playerTwoState.followers,[follower]: playerTwoState.followers[follower] + 1},canSummonToCourt:false })
        }
      }
      
    handleNextTurn('actionCard');
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
    console.log('wtf');
    
    isMapSet === false && setMapState(randomizeFollowers(initalMapStateCopy));

    setIsMapSet(true);

    mapState && hasDeltFollowersToPlayers === false && dealFollowersToPlayers();
    
  }, [mapState]);

  const [isPlayerCardsFaceup, setIsPlayerCardsFaceup] = useState(true);
  const [isRegionCardPicked, setIsRegionCardPicked] = useState(false);

  const consumeCard = (card)=>{
    let playerOneCopy = {...playerOneState}
    let playerTwoCopy = {...playerTwoState}

    switch (card) {
      case 'negotiate':
        if(playerTurn === 'playerOne'){
          playerOneCopy = {
            ...playerOneCopy,
            negotiationDisc:false,
            playedCards:[...playerOneCopy.playedCards,card],
            cards:removeFromArray(playerOneCopy.cards, card)
          }
        } else{
          playerTwoCopy = {
            ...playerTwoCopy,
            negotiationDisc:false,
            playedCards:[...playerTwoCopy.playedCards,card],
            cards:removeFromArray(playerTwoCopy.cards, card)
          }
        }

        const controller = new AbortController();

        const cardHandler=(index)=>{
          const regionCardsCopy = [...regionCards];
          regionCardsCopy[index] = {...regionCardsCopy[index],withNegotiationDisc:true};
          
          const swappedCards = swap([...regionCardsCopy],regionCardsCopy.indexOf(regionCardsCopy[index]),regionCardsCopy.indexOf(regionCardsCopy[currentRegionStruggle]));
          setRegionCards(swappedCards);

          cardRef.current[index].children[0].click();
          controller.abort();
        }

        alert('pick a region card to swap');
        
        cardRef.current.forEach((element,index)=>{
          element.addEventListener('click',()=>cardHandler(index), { signal: controller.signal } )
        })

        break;
      case 'manouevre':
        alert("Select two followers from any two regions to swap");
        if(playerTurn === 'playerOne'){
          playerOneCopy = {
            ...playerOneCopy,
            playedCards:[...playerOneCopy.playedCards,card],
            cards:removeFromArray(playerOneCopy.cards, card)
          }
        } else{
          playerTwoCopy = {
            ...playerTwoCopy,
            playedCards:[...playerTwoCopy.playedCards,card],
            cards:removeFromArray(playerTwoCopy.cards, card)
          }
        }
        setShouldHandleManoeuvre(true);

        break;
      case 'outmanouevre':
        alert('just banga')
        if(playerTurn === 'playerOne'){
          playerOneCopy = {
            ...playerOneCopy,
            playedCards:[...playerOneCopy.playedCards,card],
            cards:removeFromArray(playerOneCopy.cards, card)
          }
        } else{
          playerTwoCopy = {
            ...playerTwoCopy,
            playedCards:[...playerTwoCopy.playedCards,card],
            cards:removeFromArray(playerTwoCopy.cards, card)
          }
        }
        
        setShouldHandleOutmanoeuvre(true);
        break;
      case 'assemble':
        alert('pick card from bank')
        if(playerTurn === 'playerOne'){
          playerOneCopy = {
            ...playerOneCopy,
            playedCards:[...playerOneCopy.playedCards,card],
            cards:removeFromArray(playerOneCopy.cards, card)
          }
        } else{
          playerTwoCopy = {
            ...playerTwoCopy,
            playedCards:[...playerTwoCopy.playedCards,card],
            cards:removeFromArray(playerTwoCopy.cards, card)
          }
        }
        
        setShouldHandleAssemble(true);
        setIsEligibleForTeritoryClick(true);
        
        break;
      default:
        break;
    }
    
    if(playerTurn==='playerOne'){
      playerOneCopy = {...playerOneCopy,canSummonToCourt:true};
      setPlayerOneState(playerOneCopy);
      setTurnState({...turnState,playerOne:'actionCard' })
    }else{
      playerTwoCopy = {...playerTwoCopy,canSummonToCourt:true};
      setPlayerTwoState(playerTwoCopy);
      setTurnState({...turnState, playerTwo:'actionCard' })
    }
    
  }

  const cardsMap = {
    assemble: <AssembleCard isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard}/>,
    englishSupport: <EnglishSupportCard isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard} />,
    manouevre: <ManouevreCard isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard} />,
    negotiate: <NegotiateCard isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard} />,
    outmanouevre: <OutmanouevreCard isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard}/>,
    scottishSupport: <ScottishSupport isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard}/>,
    welshSupport: <WelshSupport isFaceup={isPlayerCardsFaceup} consumeCard={consumeCard} />,
  }
 

  const handleSkipTurn = ()=>{
    handleNextTurn('skip');
  }
  
  //Needs to be better :(
  //   const flipRegionCards = (i)=>{
  //     setFaceUpCards([...faceUpCards,regionCards[i]])
  // }
  
  const toggleModal = ()=> {
    setModalIsOpen(!modalIsOpen);
  }

  const resolveRegionPowerStruggle = () => {
    const currentRegion = regionCards[currentRegionStruggle].name;
    const sortedArray = Object.entries(mapState[currentRegion].followers).sort((a, b) => Object.values(a)[1] - Object.values(b)[1]);
    console.log(sortedArray);
    const mapStateCopy = {...mapState};
    const {followers} = mapState[currentRegion];

    let prevail = '';

    if(sortedArray[sortedArray.length - 1][1] === sortedArray[sortedArray.length - 2][1]){
      console.log("instability")
      prevail = "instability"


      //add to bank
      mapStateCopy.bank = {scottish: mapStateCopy.bank.scottish + followers.scottish ,english:mapStateCopy.bank.english + followers.english,welsh:mapStateCopy.bank.welsh + followers.welsh};
      mapStateCopy.france = {instabilityDiscs:mapStateCopy.france.instabilityDiscs - 1}

      setMapState({
        ...mapState,
        bank:{...mapStateCopy.bank},
        france:{...mapStateCopy.france},
        [currentRegion]:{
        resolvedTo: prevail,
          followers:{
            scottish:0,
            english:0,
            welsh:0,
          },
        }
      });
      
    }
    else{
      prevail = sortedArray[sortedArray.length - 1][0];
      //add to bank
      mapStateCopy.bank = {scottish: mapStateCopy.bank.scottish + followers.scottish ,english:mapStateCopy.bank.english + followers.english,welsh:mapStateCopy.bank.welsh + followers.welsh};
      mapStateCopy[currentRegion] = {
        resolvedTo: prevail,
        followers:{
          scottish:0,
          english:0,
          welsh:0,
        },
      }
      setMapState({...mapStateCopy});
    }
    //flip region Card
    // cardRef.current[regionCards.indexOf(currentRegion)].children[0].click();
    const regionCardsCopy = [...regionCards];
    regionCardsCopy[currentRegionStruggle].isFaceup = false;
    setRegionCards([...regionCardsCopy])
    
    setTimeout(() => {
      alert(`Power struggle in region ${regionCards[currentRegionStruggle]} was resolved to ${prevail}`);
    }, 1000);
  }
  let manoeuvreFollowers = [];
  let outmanoeuvreFollowers = [];

  const handleFollowerOnMapClick = (follower,region)=>{
    // const playerCanSummonToCourt = playerTurn==='playerOne'? playerOneState.canSummonToCourt : playerTwoState.canSummonToCourt;
    if(shouldHandleManoeuvre){
      if(manoeuvreFollowers.length === 1){
        manoeuvreFollowers[0].region === region ? alert("must be follower from different region") : manoeuvreFollowers.push({follower,region});
      }
      else{
        manoeuvreFollowers.push({follower,region});
      }
      // must be from dfirerent reagin
      if (manoeuvreFollowers.length === 2){
        let mapStateCopy = {...mapState};
        // removeing follower from region and adding the other one to tat region
        const fromRegion = manoeuvreFollowers[0].region;//essex
        const fromFollower = manoeuvreFollowers[0].follower;//english
        const toRegion = manoeuvreFollowers[1].region;//devon
        const toFollower = manoeuvreFollowers[1].follower;//welsh

        mapStateCopy = {
          ...mapStateCopy,
          [fromRegion]:{
            ...mapStateCopy[fromRegion],
            followers: {...mapStateCopy[fromRegion].followers,
              [fromFollower]: mapStateCopy[fromRegion].followers[fromFollower] - 1,
              [toFollower]: mapStateCopy[fromRegion].followers[toFollower] + 1,
            }
          },
          [toRegion]:{
            ...mapStateCopy[toRegion],
            followers: {...mapStateCopy[toRegion].followers,
              [toFollower]: mapStateCopy[toRegion].followers[toFollower] - 1,
              [fromFollower]: mapStateCopy[toRegion].followers[fromFollower] + 1
            }
          }
        };
        
        setMapState({...mapStateCopy});
        
        setShouldHandleManoeuvre(false);
      }
    }else if(shouldHandleOutmanoeuvre){
      switch (outmanoeuvreFollowers.length) {
        case 0:
          console.log('in 0')
          outmanoeuvreFollowers.push({follower,region});
        break;
        case 1:
          console.log('in 1')
          const testIsNeighbour = (element) => element === region;
          const isNeighbour = regionCards.find(element=> element.name === outmanoeuvreFollowers[0].region).borderingRegions.some(testIsNeighbour);
          isNeighbour && outmanoeuvreFollowers[0].region !== region ? outmanoeuvreFollowers.push({follower,region}) : alert("must be neighbouring regions");
        break;
        case 2:
          console.log('in 2')
          if(region === outmanoeuvreFollowers[1].region){

            const testIsNeighbour = (element) => element === region;
            const isNeighbour = regionCards.find(element=> element.name === outmanoeuvreFollowers[0].region).borderingRegions.some(testIsNeighbour);
            isNeighbour && outmanoeuvreFollowers[0].region !== region ? outmanoeuvreFollowers.push({follower,region}) : alert("must be neighbouring regions");
            //////////////
            console.log('in 3')
          let mapStateCopy = {...mapState};

          const fromRegion = outmanoeuvreFollowers[0].region;
          const fromFollower = outmanoeuvreFollowers[0].follower;
          const toRegion = outmanoeuvreFollowers[1].region;
          const toFollowerOne = outmanoeuvreFollowers[1].follower;
          const toFollowerTwo = outmanoeuvreFollowers[2].follower;

          mapStateCopy = {
            ...mapStateCopy,
            [fromRegion]:{
              ...mapStateCopy[fromRegion],
              followers: {...mapStateCopy[fromRegion].followers,
                [fromFollower]: mapStateCopy[fromRegion].followers[fromFollower] - 1,
                [toFollowerOne]: mapStateCopy[fromRegion].followers[toFollowerOne] + 1,
              }
            },
            [toRegion]:{
              ...mapStateCopy[toRegion],
              followers: {...mapStateCopy[toRegion].followers,
                [toFollowerOne]: mapStateCopy[toRegion].followers[toFollowerOne] - 1,
                [fromFollower]: mapStateCopy[toRegion].followers[fromFollower] + 1
              }
            }
        };
        mapStateCopy = {
          ...mapStateCopy,
          [fromRegion]:{
            ...mapStateCopy[fromRegion],
            followers: {...mapStateCopy[fromRegion].followers,
             
              [toFollowerTwo]: mapStateCopy[fromRegion].followers[toFollowerTwo] + 1,
            }
          },
          [toRegion]:{
            ...mapStateCopy[toRegion],
            followers: {...mapStateCopy[toRegion].followers,
              [toFollowerTwo]: mapStateCopy[toRegion].followers[toFollowerTwo] - 1,
            }
          }
      };
        setMapState({...mapStateCopy});
        setShouldHandleOutmanoeuvre(false);
      }
      else{
        alert("must be from the same region")
      }
        break;
      default:
        break;
      }
    }else if(playerCanSummonToCourt){
      summonToCourt(follower,region);
    }else{
      alert("Player can't summon to court, action card play is required.")
    }
  }
  const [assembleState, setAssembleState] = useState({
    pickedFollowersFromBank:[],
    placedFollowersOnRegion:[],
    pickedRegions:[],
  })
  
  const handleFollowerInBankClick = (follower)=>{
    if(shouldHandleAssemble){
      if(assembleState.pickedFollowersFromBank.length <=3){
        !assembleState.pickedFollowersFromBank.includes(follower) && !assembleState.placedFollowersOnRegion.includes(follower) ? 
        setAssembleState({...assembleState,pickedFollowersFromBank:[...assembleState.pickedFollowersFromBank,follower]}) :
        alert('pick a different follower')
      }else{
        alert("That's enough followers")
      }
    }
  }

  useEffect(() => {
    setRegionCards(shuffle(initalRegionCards));
    // setPlayerOneState(playerInitalState);
    // setPlayerTwoState(playerInitalState);
  }, [])
  
  useEffect(() => {
    if(isPowerStruggle){
      resolveRegionPowerStruggle();
      
      setTurnState({playerOne:'',playerTwo:''});
      setCurrentRegionStruggle(currentRegionStruggle + 1);  
    }
  }, [turnState]);

  // useEffect(() => {

  //     !cardsAreFlipped && setIntervalX(flipRegionCards,600,8)
  //     setcardsAreFlipped(true);
  // }, [])

  const handleTeritoryClick = (region) => {
    if(isEligibleForTeritoryClick){
      if(assembleState.pickedFollowersFromBank !== []){
        if(!assembleState.pickedRegions.includes(region)){
          let assembleStateCopy = assembleState;

          assembleStateCopy.pickedRegions = [...assembleStateCopy.pickedRegions,region]

          const removedFollower = assembleStateCopy.pickedFollowersFromBank.shift();
          
          let mapStateCopy = {...mapState};
          // add to territory
          mapStateCopy={
            ...mapStateCopy,
            [region]:{
              ...mapStateCopy[region],
              followers:{
                ...mapStateCopy[region].followers,
                [removedFollower]: mapStateCopy[region].followers[removedFollower] + 1,
              }
            }
          }
          // remove follower from bank
          mapStateCopy={
            ...mapStateCopy,
            bank: {
              ...mapStateCopy.bank,
              [removedFollower]: mapStateCopy.bank[removedFollower] - 1,
            }
          };
          //setMapState
          setMapState(mapStateCopy);
          
          //move follower from pickedFollowersFromBank to placedFollowersOnRegion
          
          assembleStateCopy.placedFollowersOnRegion.unshift(removedFollower);

        // empty assembleState
        if(assembleStateCopy.pickedRegions.length === 3){
          setShouldHandleAssemble(false);
          setIsEligibleForTeritoryClick(false);

          assembleStateCopy = {
            pickedFollowersFromBank:[],
            placedFollowersOnRegion:[],
            pickedRegions:[],
          }

          setAssembleState(assembleStateCopy);

          handleNextTurn('actionCard');
        }else{
          setAssembleState({...assembleStateCopy});
        }
        }else{
          alert('Pick a different region');
        }
      }else{
        alert("Pick a follower from the bank first");
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The King Is Dead</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PlayerTurn.Provider value={playerTurn}>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.players}>
            <div className={styles.menu}>
            <div>
                <div className={styles.currentTurn}>Current Turn:<br/>{playerTurn === "playerOne" ?  <span className={styles.playerOneTurn}>Player One</span> :<span className={styles.playerTwoTurn}>Player Two</span>}</div>
                {/* <div>Last Turn: {playerTurn === "playerOne" ? "Player Two" :"Player One"} {playerTurn !== "playerOne" ? turnState.playerOne : turnState.playerTwo} </div> */}
              </div>
              <Hourglass callToAction={handleSkipTurn}/>
              <a className={styles.rulebook} target="_blank" href="https://cdn.1j1ju.com/medias/23/cc/5c-the-king-is-dead-rulebook.pdf#page=6">
                <img src={'/images/paper-quill.png'}/>
              </a>
            </div>
            <div className={styles.playerOne}>
            {playerOneState && <PlayerOne playerState={playerOneState}/>}
            </div>
            <div className={styles.playerTwo}>
            {playerTwoState && <PlayerTwo playerState={playerTwoState}/>}
            </div>
          </div>
          <div className={styles.deckHolder}>
            {playerTurn === "playerOne" ?
              playerOneState?.cards?.map((element,index)=>{
                return <div key={`playerOnecard-${index}`}>{cardsMap[element]}</div>
              }) :
              playerTwoState?.cards?.map((element,index)=>{
                return <div key={`playerTwocard-${index}`}>{cardsMap[element]}</div>
              })}
          </div>
        </div>
        <div className={styles.right}>  
        {mapState && 
          <BoardMap 
            cardRef={cardRef} 
            mapState={mapState} 
            regionCards={regionCards} 
            handleFollowerOnMapClick={handleFollowerOnMapClick} 
            handleFollowerInBankClick={handleFollowerInBankClick}
            handleTeritoryClick={handleTeritoryClick}
          />
        }
        </div>
      </main>
      </PlayerTurn.Provider>
      <Modal modalIsOpen={modalIsOpen} currentPlayer={playerTurn} toggleModal={toggleModal}/>
    </div>
  )
}
