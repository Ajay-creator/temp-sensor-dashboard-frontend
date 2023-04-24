import React from 'react';

// Charts
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

import {Bar, Line} from 'react-chartjs-2';

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
                    {/* Bar Graphs */}
                    <h1>Bar Plots</h1>
                    {sensors.map((e,id) => {
                        return (<Bar
                        data={{
                            labels: timeStamps.map((timeStamp)=> changeToIST(timeStamp)),
                            datasets: [{
                                data: timeStamps.map((timeStamp,idx)=>tempData[idx][timeStamp][id]),
                                label:`Sensor-${id+1} Temperature`,
                                borderColor:'#0A4D68',
                                backgroundColor:'#0A4D68',
                                fill:true,
                            },
                        ]
                        }} options = {{
                            responsive: true}}

                            className={styles.graph}

                            key={id}
                        />)
                    })}
                    {/* Libe Graphs */}
                    <h1>Line Plots</h1>
                    {sensors.map((e,id) => {
                        return (<Line
                        data={{
                            labels: timeStamps.map((timeStamp)=> changeToIST(timeStamp)),
                            datasets: [{
                                data: timeStamps.map((timeStamp,idx)=>tempData[idx][timeStamp][id]),
                                label:`sensor-${id+1} temperature`,
                                borderColor:'#0A4D68',
                                pointRadius:0,
                                fill:false,
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


