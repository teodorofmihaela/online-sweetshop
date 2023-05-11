import React from 'react';
import {Button} from '@material-ui/core';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import Clock from 'react-clock'
import Wallpaper from "./Wallpaper";



function Home() {
    return (
      <>
      <div>
        <Wallpaper />
        </div>
        <Button>Mui button</Button>
        <Clock/>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
             anim id est laborum.</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
             anim id est laborum.</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
             anim id est laborum.</p>
             </div>
      </>
    )
  }
  
  export default Home
  