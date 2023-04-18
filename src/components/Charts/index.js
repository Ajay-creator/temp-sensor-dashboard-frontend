import React from 'react';

// Charts
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

import {Bar} from 'react-chartjs-2';

//styles
import styles from './Charts.module.css';

//utils
import { changeToIST } from '../../utils/changeToIST';

export const Charts = ({tempData})=>{
    if(tempData!==undefined){
        const timeStamps = tempData.map((temp)=>Object.keys(temp)[0]);
        const sensors = tempData.length ? tempData[0][timeStamps[0]]:[];
        return(
            <div>
                {tempData.length ? (
                <div className={styles.container}>
                    {sensors.map((e,id) => {
                        return (<Bar
                        data={{
                            labels: timeStamps.map((timeStamp)=> changeToIST(timeStamp)),
                            datasets: [{
                                data: timeStamps.map((timeStamp,idx)=>tempData[idx][timeStamp][id]),
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
                </div>):(<div style={{textAlign:"center"}}>No Temperature Data Recorded</div>)}
            </div>
        )
    }
    return(
        <div>{null}</div>
    )
}


