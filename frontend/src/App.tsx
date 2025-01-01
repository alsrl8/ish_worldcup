import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home/home';
import Tournament from './pages/tournament/tournament';
import FinalResult from './pages/finalResult/finalResult';
import './App.css';

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
