import React from "react";
import * as XLSX from "xlsx"; 
import Button from '@mui/material/Button';


// utils
import { changeToIST } from "../../utils/changeToIST";

export const Excel = ({tempData, sensorId, fromValue, toValue}) => {
    const downloadExcel = () => {
        console.log(tempData)
        if(tempData===undefined) return
        const timeStamps = tempData?.map((temp)=>Object.keys(temp)[0]);
        const sensors = tempData?.length ? tempData[0][timeStamps[0]]:[];
    
        const data = timeStamps?.map((timeStamp,id1)=>{
            let obj = {};
            obj.timeStamp = changeToIST(timeStamp);
            sensors?.forEach((sensor,id2)=>{
                obj[`Sensor-${id2+1}(℃)`] = tempData[id1][timeStamp][id2];
            })
            return obj;
        });
        console.log(data);
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
    
        // Create a new worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
    
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        // Convert the workbook to a binary string
        const excelBinaryString = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    
        // Convert the binary string to a Blob
        const excelBlob = new Blob([s2ab(excelBinaryString)], { type: "application/vnd.ms-excel" });
    
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(excelBlob);
        downloadLink.download = `${sensorId}_${changeToIST(fromValue)}_${changeToIST(toValue)}_report.xls`; // Replace with the desired filename
        downloadLink.click();
    };
    
    // Utility function to convert a string to an ArrayBuffer
    const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

  return (
    <div>
      {tempData?.length && <Button className="no-print" id="d-button" variant="contained" color="success" onClick={downloadExcel}  >Download as Excel</Button>}
    </div>
  );
};
