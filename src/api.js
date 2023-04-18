import axios from 'axios'


const baseUrl = "https://web-production-a0d9.up.railway.app/";
// const baseUrl = "http://localhost:8000/";

export const fetchSensors = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}sensors`)
        return data;
    } catch (error) {
        console.error(error.message)
    }
}

export const fectchLatestTemp = async (sensorId) => {
    try {
        const { data } = await axios.get(`${baseUrl}latestTemp/${sensorId}`);
        return data[0];
    } catch (error) {
        console.error(error.message)
    }
}

export const fetchTodaysTemp = async (sensorId,date) =>{
    try {
        const { data } = await axios.get(`${baseUrl}temp/today/${sensorId}/?date=${date}`);
        const tempVals = data.reverse().map((obj)=>{
            let res = {};
            res[obj.timeStamp] = obj.tempValues;
            return res;
        })
        return tempVals;

    } catch (error) {
        console.error(error.message)
    }
}

export const fetchRangeTemp = async (url) => {
    try {
        const { data } = await axios.get(url);
        const tempVals = data.reverse().map((obj)=>{
            let res = {};
            res[obj.timeStamp] = obj.tempValues;
            return res;
        })
        return tempVals;

    } catch (error) {
        console.error(error.message)
    }
}