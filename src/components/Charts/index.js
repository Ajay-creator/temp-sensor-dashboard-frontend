import React from 'react';

// Charts
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

import {Bar} from 'react-chartjs-2';

//styles
import styles from './Charts.module.css';

// utils
import { getLocalTime } from '../../utils/getLocalTime';

export const Charts = ({todaysTemp})=>{
    if(todaysTemp!==undefined){
        const timeStamps = todaysTemp.map((temp)=>Object.keys(temp)[0]);
        const sensors = todaysTemp.length ? todaysTemp[0][timeStamps[0]]:[];
        return(
            <div>
                {todaysTemp.length ? (
                <div className={styles.container}>
                    <h1 className={styles.heading}>Today's Variations | Date : {getLocalTime().split("_")[0]}</h1>
                    {sensors.map((e,id) => {
                        return (<Bar
                        data={{
                            labels: timeStamps,
                            datasets: [{
                                data: timeStamps.map((timeStamp,idx)=>todaysTemp[idx][timeStamp][id]),
                                label:`sensor-${id+1} temperature`,
                                borderColor:'#1d1919',
                                backgroundColor:'#1d1919',
                                fill:true,
                            },
                        ]
                        }} options = {{
                            responsive: true}}

                            className={styles.graph}

                            key={id}
                        />)
                    })}
                </div>):(<div>{null}</div>)}
            </div>
        )
    }
    return(
        <div>{null}</div>
    )
}


