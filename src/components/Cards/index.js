import React from "react";
import { Card } from '../Card'

import styles from './Cards.module.css';

export const Cards = ({latestTemp}) =>{
    if(latestTemp!==undefined){
        let data = {
            'timeStamp' : latestTemp.timeStamp,
            'units':'℃',
        }
        const tempVals = latestTemp.tempValues;

        return(
            <div className={styles.container}>
                {tempVals ? tempVals.map((temp,id)=>(
                    <Card props={{...data,'temp':temp,'sensorNo':id+1}} key={id}/>
                    )
                ): (<div className="loading">Loading...</div>)}
            </div>
        )
    }

    return(
        <></>
    )
}