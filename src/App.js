import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {Home} from './components/Home';
import { Header } from './components/Header';
import { Graphs } from './components/Graphs';
import { Reports } from './components/Reports';


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <Router>
      <Header/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/graphs" element={<Graphs/>} />
          <Route path="/reports" element={<Reports/>} />
          {/* <Route element={NotFound} /> */}
        </Routes>
        </LocalizationProvider>
    </Router>
  );
}

export default App;
