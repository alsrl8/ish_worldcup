import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Tournament from './pages/tournament';
import FinalResult from './pages/finalResult';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tournament" element={<Tournament/>}/>
                <Route path="/result" element={<FinalResult/>}/>
            </Routes>
        </Router>
    );
};

export default App;
