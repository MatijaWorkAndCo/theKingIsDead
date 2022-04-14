export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
export function randomizeFollowers(mapState){
    const regionsFromMapState = Object.keys(mapState).filter(ele=> ele !== "bank" && ele !== "france");

    // console.log(regionsFromMapState);

    const possibleFollower = ["scottish", "english","welsh"];

    const homeRegions = ["moray","essex","gwynedd"];

    const finalMapState = mapState;
    
    function moveFromBankToRegion(follower,region){
        finalMapState.bank[follower] = finalMapState.bank[follower] - 1;

        finalMapState[region].followers = {...finalMapState[region].followers, [follower]:finalMapState[region].followers[follower] + 1}
    }
    //problem: 
        // current : this is doing 8x more then it suppoed to
        // future : what if it picked too many of the same followers and bank cant deal them???

    for(let i = 0; i < regionsFromMapState.length; i++){
        //First
        const getFirstRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
        moveFromBankToRegion(getFirstRandomFollower,regionsFromMapState[i]);
        //Second
        const getSecondRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
        moveFromBankToRegion(getSecondRandomFollower,regionsFromMapState[i]);
        
        //If not home region
        if(!homeRegions.includes(regionsFromMapState[i])){
            //Third
            const getThirdRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
            moveFromBankToRegion(getThirdRandomFollower,regionsFromMapState[i]);
            //Fourth
            const getFourthRandomFollower = shuffle(possibleFollower)[randomIntFromInterval(0,2)];
            moveFromBankToRegion(getFourthRandomFollower,regionsFromMapState[i]);
        }
    }

    return finalMapState
}
