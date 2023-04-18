import React from "react";

// styles
import styles from './Tables.module.css';

// utils
import { changeToIST } from "../../utils/changeToIST";

export const Tables = ({tempData}) => {
    console.log(tempData);
    const timeStamps = tempData?.map((temp)=>Object.keys(temp)[0]);
    const sensors = tempData?.length ? tempData[0][timeStamps[0]]:[];
    return(
        <div>
            {tempData?.length ? (
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                        <th>Date & Time</th>
                        {sensors?.map((e,id)=> {
                            return (<th key={id}>Sensor - {id+1}</th>)
                        } )}
                        </tr>
                    </thead>
                    <tbody>
                    {timeStamps?.map((timeStamp,id)=>{
                        return(
                                <tr key={id}>
                                <td>{changeToIST(timeStamp)}</td>
                                {tempData[id][timeStamp]?.map((temp,id)=>{
                                    return(
                                        <td key={id}>{temp} ℃</td>
                                    )
                                })}
                                </tr>
                        )
                    })}
                    </tbody>    
                </table>
            </div>):(<div style={{textAlign:"center"}}>No Temperature Data Recorded</div>)}
        </div>
    )
}