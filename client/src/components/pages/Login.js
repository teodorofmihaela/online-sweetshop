import React, {useEffect, useState, useContext } from 'react';
import './AddRecipe.css';
import Item from '@mui/material/Stack';
import {Typography,FormGroup, Grid, Button, TextField} from '@material-ui/core';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'




function Login() {
const { userName, setUserName, setDisplayAdmin,setDisplayBucatar, setDisplayVanzator, setDisplayClient } = useContext(LoginContext);

const [userNameInput, setuserNameInput] = useState();
const [password, setPassword] = useState();
const [showPassword, setShowPassword] = useState(false);
const [utilizatori, setUtilizatori] = useState([]);
const [drept, setDrept] = useState([]);

  const notifySucces = () => toast.success("Login cu succes!");
  const notifyError = () => toast.error("Autentificarea a esuat! Mai introduceti o data datele.");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        try{
            let [requestUtilizatori ]= await Promise.all([
                fetch(`${baseURL}/utilizatori`),
                // fetch(`${baseURL}/drepturi`)
                ]);
                   if (requestUtilizatori.status === 200 ) {
                   const responseUtilizatori = await requestUtilizatori.json();

                   setUtilizatori(responseUtilizatori);
            
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);



function checkRight(){
    utilizatori.forEach((u) =>{
       if(u.username==userNameInput){
        setDrept(u.cod_drept);
        setUserName(u.username);
        if(u.cod_drept==1){
            setDisplayAdmin(true);
        }else if(u.cod_drept==2){
            setDisplayBucatar(true);
        }else if(u.cod_drept==3){
            setDisplayVanzator(true);
        }else if(u.cod_drept==4){
            setDisplayClient(true);
        }
    }});
}

async function login() {
    try{
        const res = await fetch(`${baseURL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userNameInput,
                "parola": password
            })
        });

            if(res.status==200 ){
                // setDisplayAdmin(false);
                // setDisplayBucatar(false);
                // setDisplayVanzator(false);
                // setDisplayClient(false);
            
                notifySucces();
                checkRight();
                onReset();
            }
            else if(res.status!=201 || res==null ){
                notifyError();
            }
    }catch (err) {
        console.log(err);
    }
}


function onReset() {
    setPassword("");
    setuserNameInput("");
}


    return ( 
        <>
        <div className='recipe-content' >

            <FormGroup id="page" >
            <Grid id="form">
                             
                            <Stack spacing={1} style={{ paddingLeft: '30%', paddingTop:'10%' }}>
                    <Item>
                        <Typography style={{paddingLeft:'10%'}} variant="h4">Conecteaza-te</Typography>
                    </Item>
                    <Item>
                        <Stack spacing={3} style={{backgroundColor: "#ffe3ff", borderColor: 'secondary.main', border:50, borderRadius: '16px' }}>
                            <div style={{ paddingLeft: "9%" , paddingTop:"15%" }}>
                                <AccountCircle className='form-icon' fontSize='large' />
                                <TextField className="input" value={userNameInput} size="small" style={{ width: "250px"}}
                                    onChange={event => setuserNameInput(event.target.value)}
                                    label="User" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <PasswordIcon className='form-icon' fontSize='large' style={{ paddingLeft: "9%" }}/>
                                <TextField className="input" size="small"
                                    type={showPassword ? "text" : "password"} style={{ width: "250px"}}
                                    value={password} onChange={event => setPassword(event.target.value)} label="Parola" variant="outlined"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(s => !s)} style={{ color: "#a742f5" }} >
                                                <VisibilityIcon />
                                            </IconButton >
                                        </InputAdornment>,
                                    }}>
                                </TextField>
                            </div>
                            <Item>
                            <div className='button-add' style={{ width: "350px", paddingBottom:"10%" }}>
                                    <Button variant="contained" color="primary" onClick={login}>Login <LoginIcon style={{ paddingLeft: "7px" }} /></Button>
                                    <Button  variant="contained" color="primary">Inregistreaza-te <AccountCircleIcon style={{ paddingLeft: "7px" }} /></Button>

                                </div>
                            </Item>
                        </Stack>
                        </Item>
                        </Stack>

                           
                
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default Login;