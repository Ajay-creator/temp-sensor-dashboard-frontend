import React, {useState, useEffect} from 'react';

// styles
import styles from './SensorPicker.module.css'

// material ui
import { FormControl, NativeSelect } from '@mui/material';

// API
import { fetchSensors } from '../../api';

export const SensorPicker = ({ handleSensorChange, changedSensorId, sensorId}) =>{
    const [sensorIds,setSensorIds] = useState([]);

    useEffect(() => {   
        const fetchAPI = async () =>{
            const sensors = await fetchSensors();
                setSensorIds(sensors);
                changedSensorId(sensors[0])
                // console.log(sensors)
        }
        if(!sensorId || sensorId === '') fetchAPI();
    // eslint-disable-next-line
    },[sensorId]);

    return(
        <div className={styles.container}>
            <FormControl className={styles.formcontrol}>
                <NativeSelect className={styles.select} defaultValue={sensorIds[0]} onChange={(e)=> handleSensorChange(e.target.value)}>
                    {sensorIds.map((sensorId,id)=>(
                        <option key={id} value={sensorId}>{sensorId}</option>
                    ))
                    }
                </NativeSelect>
            </FormControl>
        </div>
    )
}