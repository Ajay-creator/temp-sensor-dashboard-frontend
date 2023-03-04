import axios from 'axios'


const baseUrl = "https://web-production-e2a96.up.railway.app/";

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
        // console.log(data);
        return data[0];
    } catch (error) {
        console.error(error.message)
    }
}

export const fetchTodaysTemp = async (sensorId,date) =>{
    try {
        const { data } = await axios.get(`${baseUrl}temp/today/${sensorId}/?date=${date}`)
        const tempVals = data.map((obj)=>{
            let res = {};
            res[obj.timeStamp] = obj.tempValues;
            return res;
        })
        return tempVals;

    } catch (error) {
        console.error(error.message)
    }
}