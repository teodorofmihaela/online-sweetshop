import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ClientNavbar from './components/clientPages/ClientNavbar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Retetar from './components/pages/Retetar';
import AddRecipe from './components/pages/AddRecipe';
import Recipe from './components/pages/Recipe';
import Supply from './components/pages/Supply';
import AddIngredient from './components/pages/AddIngredient';
import Achizitii from './components/pages/Achizitii';
import AddAchizite from './components/pages/AddAchizite';
import ReceptieMarfa from './components/pages/ReceptieMarfa';
import Provider from './components/pages/Provider';
import AddProvider from './components/pages/AddProvider';
import AddIngredientsForProvider from './components/pages/AddIngredientsForProvider';
import Personal from './components/pages/Personal';
import AddUser from './components/pages/AddUser';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';
import ProductsClient from './components/clientPages/ProductsClient';
import ClientOrder from './components/clientPages/ClientOrder';
import ProductDetailsClient from './components/clientPages/ProductDetailsClient';
import Cart from './components/pages/Cart';
import AddProduct from './components/pages/AddProduct';
import StocProduse from './components/pages/StocProduse';
import Sales from './components/pages/Sales';
import Laboratory from './components/pages/Laboratory';
import AddSale from './components/pages/AddSale';
import Orders from './components/pages/Orders';
import AddOrders from './components/pages/AddOrders';
import Statistics from './components/pages/Statistics';
import Login from './components/pages/Login';
import {BrowserRouter as  Router, Routes , Route} from 'react-router-dom';
import { Component } from 'react';
import { Navigate } from "react-router-dom";
import { LoginContext } from './context/LoginContext'
import { CartProvider } from './context/CartContext'


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
              {/* <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator, setDisplayBucatar, setDisplayAdmin }} >
                {(displayVanzator || displayBucatar || displayAdmin) ? <Navbar /> : <ClientNavbar/>}
              </LoginContext.Provider> */}
        <div className="container">
          <Routes>
             {/* swich is replaced  by routes */}
              {/* public route login*/}
            <Route  path='/login' element={
            <Login/>}/>
            
            {/* anyone can see the products */}
            
            <Route exact path='/' element={
            <CartProvider>
            <ProductsClient/>
            </CartProvider>
            } />
            <Route exact path='/produse/client/:id' element={
            <CartProvider>
            <ProductDetailsClient/>
            </CartProvider>} />
            <Route exact path='/cos' element={
            <CartProvider><Cart/>
            </CartProvider>} />

            <Route exact path='/comenzi/client/adaugare' element={
            <CartProvider><ClientOrder/>
            </CartProvider>} />
            

            {/*  routes with authorization needed*/}

            <Route exact path='/retetar'  element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                  {(displayBucatar ) ? <Retetar /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/retetar/:denumire' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                {(displayBucatar ) ? <Recipe /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/retetar/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar }} >
                {(displayBucatar) ? <AddRecipe /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/produse'  element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator, setDisplayAdmin }} >
                  {(displayVanzator || displayAdmin) ? <Products /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/produse/:id'  element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayVanzator, setDisplayAdmin }} >
                  {(displayVanzator || displayAdmin) ? <ProductDetails /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/produs/adaugare' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar, setDisplayAdmin }} >
                {(displayBucatar || displayAdmin) ? <AddProduct /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/laborator' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayBucatar, setDisplayAdmin }} >
                {(displayBucatar || displayAdmin) ? <Laboratory /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/stoc_produs' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin  }} >
                {displayAdmin ? <StocProduse /> : <Login />}
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

              <Route exact path='/aprovizionare/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <AddIngredient /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/achizitii' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <Achizitii /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/achizitii/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <AddAchizite /> : <Login />}
              </LoginContext.Provider>} />

              <Route exact path='/achizitii/receptie_marfa' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
                {displayAdmin ? <ReceptieMarfa /> : <Login />}
              </LoginContext.Provider>} />

            <Route exact path='/furnizori' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <Provider /> : <Login />}
            </LoginContext.Provider>} />

            <Route exact path='/furnizori/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <AddProvider /> : <Login />}
            </LoginContext.Provider>} />

            <Route exact path='/furnizori/add/ingredient' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <AddIngredientsForProvider /> : <Login />}
            </LoginContext.Provider>} />

            <Route exact path='/personal' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <Personal /> : <Login />}
            </LoginContext.Provider>} />

            <Route exact path='/personal/add' element={
              <LoginContext.Provider  value={{ userName, setUserName, setDisplayAdmin }} >
              {displayAdmin ? <AddUser /> : <Login />}
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
