import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Retetar from './components/pages/Retetar';
import AddRecipe from './components/pages/AddRecipe';
import Recipe from './components/pages/Recipe';
import {BrowserRouter as  Router, Routes , Route} from 'react-router-dom';
import { Component } from 'react';


// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
 //class App extends Component {
//   state = {
//     clients: []
//   };

//   async componentDidMount() {
//     const response = await fetch('/utilizatori');
//     const body = await response.json();
//     this.setState({clients: body});
//   }

//   render() {
//     const {clients} = this.state;
//     return (
//         <div className="App">
//           <header className="App-header">
//             <div className="App-intro">
//               <h2>Clients</h2>
//               {clients.map(client =>
//                   <div key={client.id}>
//                     {client.nume} ({client.email})
//                   </div>
//               )}
//             </div>
//           </header>
//         </div>
//     );
//   }
// }


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
             {/* swich is replaced  by routes */}
            <Route  path='/' element={<Home/>} />            
            <Route path='/retetar' element={<Retetar/>} />
            <Route exact path='/retetar/:denumire' element={<Recipe/>} />
            <Route exact path='/retetar/add' element={<AddRecipe/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />       
       
          </Routes >
            </div>
      </Router>
    </div>
  );
}

export default App;
library.add( fas, far)
