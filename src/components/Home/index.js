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

export const Home = () =>{
    const [latestTemp, setLatestTemp] = useState({});
    const [todaysTemp,setTodaysTemp] = useState([]);
    const [sensorId,setSensorId] = useState('');

    const handleSensorChange = async (sensorId) =>{
        const lTemp = await fectchLatestTemp()
        const date = getLocalTime()
        const tTemps = await fetchTodaysTemp(sensorId,date)
        setLatestTemp(lTemp);
        setTodaysTemp(tTemps);
    }

    useEffect(()=>{
        const fetch = async () => {
            const data = await fectchLatestTemp(sensorId);
            setLatestTemp(data);
            if(todaysTemp.length===0){
                const date = getLocalTime();
                const data = await fetchTodaysTemp(sensorId,date);
                setTodaysTemp(data);
            }
            else{
                setTodaysTemp(todaysTemp.push(data));
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
            <SensorPicker handleSensorChange={handleSensorChange} changedSensorId={setSensorId}></SensorPicker>
            <Cards latestTemp={latestTemp}/>
            <Charts todaysTemp={todaysTemp}/>
        </div>
    )
}