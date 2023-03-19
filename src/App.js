import './App.css';
import React from 'react';
import {BrowserRouter as  Router, Routes , Route} from 'react-router-dom';
import { Component } from 'react';
import Home from './components/Home';
import Retetar from './components/Retetar';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      

       <Router>
         <Navbar/>
           <Routes >
              {/* swich is replaced  by routes */}
             <Route  path='/' element={<Home/>} />            
             <Route path='/retetar' element={<Retetar/>} />
             </Routes >
             {/* <Footer/> */}
       </Router>

      
    </div>
  );
}

export default App;
