import cx from "classnames";
import styles from './BoardMap.module.scss';

const RegionCards = ({regionCards,cardRef})=>{
    

    // useEffect(() => {
    //     cardRef.current.forEach((element,index)=>{
    //         setTimeout(() => { 
    //             element.children[0].click();
    //         }, 500 * index);
    //     })
    // }, [])

    return(
        <>
            {regionCards && regionCards.map((element,index)=>{
                const CardComponent = ({...props}) => element.component({...props});

                return(
                    <div 
                        className={cx(styles.regionCardPlacement,styles[`card-${index +1}`])}
                        ref={(element) => element && !cardRef.current.includes(element) && cardRef.current.push(element)}
                    >
                        <CardComponent isFaceup={element.isFaceup} withNegotiationDisc={element.withNegotiationDisc}/>   
                    </div>
                )
            })}
        </>
    )
}

export default  RegionCards;
