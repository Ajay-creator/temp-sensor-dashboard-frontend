import React from "react";
import { useState} from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


//components
import { SensorPicker } from "../SensorPicker";
import { Charts } from "../Charts";

// api
import { fetchRangeTemp } from "../../api";

// utils
import { changeToUTC } from "../../utils/changeToUTC";
import { changeToIST } from "../../utils/changeToIST";

export const Graphs = () =>{
    const [sensorId,setSensorId] = useState('');
    const [fromValue,setFromValue] = useState('');
    const [toValue,setToValue] = useState('');
    const [rangeTemp, setRangeTemp] = useState([]);

    const handleSensorChange = async (sensorId) =>{
        setSensorId(sensorId);
        if(!fromValue || !toValue ) alert('Please select from & to datetime range')
        const from = changeToUTC(fromValue?.$d);
        const to = changeToUTC(toValue?.$d);
        if(to<=from){
            alert('\'Start\' date & time must be less than \'End\' date & time.')
            return
        }
        const url = `https://web-production-a0d9.up.railway.app/temp/range/${sensorId}/?from=${from}&to=${to}`
        const data = await fetchRangeTemp(url);
        setRangeTemp(data);
    }
    return(
        <div className="container">
            <SensorPicker handleSensorChange={handleSensorChange} changedSensorId={setSensorId}></SensorPicker>
            <Stack direction="row" gap={2} marginBottom={6} justifyContent="center" alignItems="center" flexWrap="wrap">
                <DateTimePicker label="Start Date & Time" value={fromValue} onChange={(newValue) => setFromValue(newValue)}/>
                <DateTimePicker label="End Date & Time" value={toValue} onChange={(newValue) => setToValue(newValue)} />
                <Button variant="contained" color="success" onClick={(e)=>handleSensorChange(sensorId)} >Plot the Graph</Button>
            </Stack>
            <h3 style={{textAlign:"center"}}>Date & Time Range : {`${changeToIST(fromValue?.$d)} - ${changeToIST(toValue?.$d)}`}</h3>
            <Charts tempData={rangeTemp}/>
        </div>
    )
}