import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {Home} from './components/Home';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/graphs" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} /> */}
        </Routes>
    </Router>
  );
}

export default App;
