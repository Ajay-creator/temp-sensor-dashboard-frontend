import React from "react";
import { useState,useRef } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


//components
import { SensorPicker } from "../SensorPicker";
import { Tables } from "../Tables";

// api
import { fetchRangeTemp } from "../../api";

// utils
import { changeToUTC } from "../../utils/changeToUTC";
import { changeToIST } from "../../utils/changeToIST";

// styles
import './index.css';


export const Reports = () =>{
    const [sensorId,setSensorId] = useState('');
    const [fromValue,setFromValue] = useState('');
    const [toValue,setToValue] = useState('');
    const [rangeTemp, setRangeTemp] = useState([]);
    const sectionRef = useRef(null);

    const handleSensorChange = async (sensorId) =>{
        const from = changeToUTC(fromValue?.$d);
        const to = changeToUTC(toValue?.$d);
        if(from && to){
            const url = `https://web-production-a0d9.up.railway.app/temp/range/${sensorId}/?from=${from}&to=${to}`;
            const data = await fetchRangeTemp(url);
            setRangeTemp(data);
        }
    }

    const printSection = () => {
        const printContents = sectionRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
      }

    return(
        <div className="report-container">
            <SensorPicker handleSensorChange={handleSensorChange} changedSensorId={setSensorId}></SensorPicker>
            <Stack direction="row" gap={2} marginBottom={6} justifyContent="center" alignItems="center" flexWrap="wrap" className="no-print">
                <DateTimePicker label="Start Date & Time" value={fromValue} onChange={(newValue) => setFromValue(newValue)} />
                <DateTimePicker label="End Date & Time" value={toValue} onChange={(newValue) => setToValue(newValue)} />
                <Button variant="contained" color="success" onClick={(e)=>handleSensorChange(sensorId)}>Get Report</Button>
            </Stack>
            <div ref={sectionRef} className="print-sec">
                <h3 style={{textAlign:"center"}}>Date & Time Range : {`${changeToIST(fromValue?.$d)} - ${changeToIST(toValue?.$d)}`}</h3>
                <Tables tempData={rangeTemp}/>
            </div>
            {rangeTemp?.length ? <Button className="no-print" id="print" variant="contained" color="success" onClick={printSection} >Print</Button> : null}
        </div>
    )
}