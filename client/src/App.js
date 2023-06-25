import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Retetar from './components/pages/Retetar';
import AddRecipe from './components/pages/AddRecipe';
import Recipe from './components/pages/Recipe';
import Supply from './components/pages/Supply';
import Provider from './components/pages/Provider';
import Products from './components/pages/Products';
import Sales from './components/pages/Sales';
import AddSale from './components/pages/AddSale';
import Orders from './components/pages/Orders';
import AddOrders from './components/pages/AddOrders';
import Statistics from './components/pages/Statistics';
import Login from './components/pages/Login';
import {BrowserRouter as  Router, Routes , Route} from 'react-router-dom';
import { Component } from 'react';
import { Navigate } from "react-router-dom";
import { LoginContext } from './context/LoginContext'


// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
 

function App() {

  const [userName, setUserName] = React.useState(false)
  const [displayAdmin, setDisplayAdmin] = React.useState(false)
  const [displayBucatar, setDisplayBucatar] = React.useState(false)
  const [displayVanzator, setDisplayVanzator] = React.useState(false)
  const [displayClient, setDisplayClient] = React.useState(false)

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
             {/* swich is replaced  by routes */}
              {/* public route login*/}
            <Route  path='/login' element={<Login/>} /> 
            {/* anyone can see the products */}
            <Route exact path='/produse' element={<Products/>} />

            {/*  routes with authorization needed*/}

            <Route exact path='/retetar'  element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                  {displayBucatar ? <Retetar /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/retetar/:denumire' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                {displayBucatar ? <Recipe /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/retetar/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                {displayBucatar ? <AddRecipe /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/vanzari' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator  }} >
                {displayVanzator ? <Sales /> : <Login />}
              </LoginContext.Provider>} />
              
            <Route exact path='/vanzari/adaugare' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator  }} >
                {displayVanzator ? <AddSale /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/comenzi' element={
                <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator  }} >
                {(displayVanzator) ? <Orders /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/comenzi/adaugare' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator, setDisplayClient }} >
                {(displayVanzator || displayClient) ? <AddOrders /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/aprovizionare' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <Supply /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/furnizori' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <Provider /> : <Login />}
            </LoginContext.Provider>} />

            <Route exact path='/statistici'  element={
            <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <Statistics /> : <Login />}
            </LoginContext.Provider>} />

            {/* <Route path='/home' element={<Retetar/>} /> */}
            {/* <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />        */}
       
          </Routes >
            </div>
      </Router>
    </div>
  );
}


export default App;
library.add( fas, far)
