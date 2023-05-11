import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@mui/material';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function SignIn() {


  return (
    <>
    <div className='container'>
    <Box display="flex" flexDirection="row">
    <Stack spacing={2}>
    <Link id='link' to='/sign-in'>SignIn</Link>
    <Link id='link'to='/sign-up'>SignUp</Link>
      <h1>Sign-In</h1>
      <div className='form'>
          <form>
          <Stack spacing={1}>
            <label className='label'>Email</label>
            <Input/>
            <label className='label'>Parola</label>
            <TextField placeholder='parola...' type="password" variant="standard"></TextField>            
            <a href="/">Forgot password?</a>
            <Button buttonStyle='btn'><LoginIcon/> Sign in</Button>
            </Stack>
          </form>
          </div>
          </Stack>
        <div className='form-logo'>
        <img src="/images/authentication.svg" height="400em"></img>
        </div>
        </Box>
        </div>
        </>
  )
}

export default SignIn
