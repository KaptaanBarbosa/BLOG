import React from 'react';
import './App.css';
import Navbar from './components/Layout/Navbar'
import Landing from './components/Layout/Landing'
import Login from './components/auth/login';
import Footer from './components/Layout/Footer'
import Register from './components/auth/register';

import {BrowserRouter as Router,Route} from 'react-router-dom'

function App() {
  return (
   <Router>   
    <div className="App">
      <Navbar/>
      <Route exact path="/" component = {Landing}/>

      <div className="Container">
            <Route exact path="/register" component = {Register}/>
            <Route exact path="/login" component = {Login}/>
      </div>
    
    </div>
    <Footer/>
   </Router> 
  );
}

export default App;
