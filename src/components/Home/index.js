import React from "react";
import { useState,useEffect } from "react";

//components
import { SensorPicker } from "../SensorPicker";
import { Cards } from "../Cards";
import { Charts } from "../Charts";

// api
import { fectchLatestTemp } from "../../api";
import { fetchTodaysTemp } from "../../api";

// utils
import { getLocalTime } from "../../utils/getLocalTime";
import { changeToIST } from "../../utils/changeToIST";
import { changeToUTC } from "../../utils/changeToUTC";

export const Home = () =>{
    const [latestTemp, setLatestTemp] = useState({});
    const [todaysTemp,setTodaysTemp] = useState([]);
    const [sensorId,setSensorId] = useState('');

    const handleSensorChange = async (sensorId) =>{
        const lTemp = await fectchLatestTemp();
        const date = changeToUTC(getLocalTime());
        const tTemps = await fetchTodaysTemp(sensorId,date);
        setLatestTemp(lTemp);
        setTodaysTemp(tTemps);
        setSensorId(sensorId);
    }

    useEffect(()=>{
        const fetch = async () => {
            const data = await fectchLatestTemp(sensorId);
            setLatestTemp(data);
            if(todaysTemp?.length===0){
                const date = changeToUTC(getLocalTime());
                const data = await fetchTodaysTemp(sensorId,date);
                setTodaysTemp(data);
            }
            else{
                if(todaysTemp?.back()!==latestTemp){
                    setTodaysTemp(todaysTemp?.push(data));
                }
            }
        }
        fetch();
        const interval = setInterval(()=>{
            fetch();
        },10000)
    
        return () => clearInterval(interval);
        // eslint-disable-next-line
      },[sensorId])

    return(
        <div className="container">
            <SensorPicker handleSensorChange={handleSensorChange} changedSensorId={setSensorId} currentSensorId={sensorId}></SensorPicker>
            <Cards latestTemp={latestTemp}/>
            <h1 style={{textAlign:"center"}}>Today's Variations | Date : {changeToIST(getLocalTime()).split(' ')[0]}</h1>
            <Charts tempData={todaysTemp}/>
        </div>
    )
}