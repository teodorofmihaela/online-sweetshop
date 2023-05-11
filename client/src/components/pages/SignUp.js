import React from 'react';
import { Component } from 'react';
import {Link} from "react-router-dom";
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import { faBlackboard } from '@fortawesome/free-solid-svg-icons';


function SignUp() {

    return (
      <div style={{
        margin:"30px",
        backgroundColor:"red"
      }}>
        <Box width='80em' display="flex" flexDirection="row">
        <Stack spacing={1}>
        <Link id='link' to='/sign-in'>SignIn</Link>
        <Link id='link'to='/sign-up'>SignUp</Link>
         <h1>Creeaza-ti un cont nou</h1>
         <form>
         <Stack>

            <label>Nume</label>
            <Input/>
            <label>Email</label>
            <Input/>
            <label>Parola</label>
            <TextField placeholder='parola...' type="password" variant="standard"/>
        </Stack>
         </form>
         <Box component="div" sx={{ display: 'inline' }}>
         Ai deja un cont? <Link to='/sign-in'>Spre pagina de Sign in</Link>
         </Box>
         </Stack>
         <div className='form-logo'>
        <img src="/images/authentication.svg" width='90%' height="400em"></img>
        </div>
         </Box>
      </div>
    )
  }
  
  export default SignUp