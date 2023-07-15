import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import { Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EggIcon from '@mui/icons-material/Egg';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function AddUser() {

const [userName, setUserName] = useState();
const [password, setPassword] = useState();
const [name, setName] = useState();
const [firstName, setFirstName] = useState();
const [RightCode, setRightCode] = useState();
const [RightDesc, setRightDesc] = useState();
let nr=1;

const notifySucces = () => toast.success("Utilizatorul a fost adaugat cu succes!");
const notifyError = () => toast.error("Utilizatorul nu a putut fi adaugat!");

const baseURL = "http://localhost:8080";


async function adauga() {
    try{
        let id = uuidv4();
        const res = await fetch(`${baseURL}/utilizatori`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "username": userName,
                "parola": password,
                "nume": name,
                'prenume': firstName,
                'cod_drept': RightCode,
                'denumire_drept': RightDesc
            })
        });
            if(res.status==201){
                notifySucces();
                onReset();
            }
            else if(res.status!=201 || res==null){
                notifyError();
            }
    }catch (err) {
        console.log(err);
    }
}


function onReset() {
    setUserName("");
    setFirstName("");
    setName("");
    setPassword("");
    setRightCode("");
    setRightDesc("");
}

const handleChange = (event) => {
    let drept= event.target.value;
    if(drept=='administrator'){
    setRightCode('1');
    setRightDesc('Administrator');
    } else if(drept=='bucatar'){
    setRightCode('2');
    setRightDesc('Bucatar');
    } else if(drept=='vanzator'){
    setRightCode('3');
    setRightDesc('Vanzator'); 
    } else if(drept=='client'){
    setRightCode('4');
    setRightDesc('Client'); 
    }  
};

    return ( 
        <>
        <div className='recipe-content'>
        <Typography variant="h4" color="primary" style={{paddingBottom:'5%'}}>Adaugă un utilizator nou</Typography>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Stack spacing={5}>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={name} size="small" style={{ width: " 250px" }}
                                    onChange={event => setName(event.target.value)}
                                    label="Nume" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={firstName} size="small" style={{ width: " 250px" }}
                                    onChange={event => setFirstName(event.target.value)}
                                    label="Prenume" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <StorefrontIcon className='form-icon' fontSize='large'/>
                                <FormControl style={{minWidth: 220}}>
                                <InputLabel >Drept</InputLabel>
                                    <Select label="Drept" defaultValue="" onChange={handleChange} >
                                        <MenuItem value='administrator' >Administrator</MenuItem>
                                        <MenuItem value='vanzator' >Vanzator</MenuItem>
                                        <MenuItem value='bucatar' >Bucatar</MenuItem>
                                        <MenuItem value='client' >Client</MenuItem>
                                    </Select>
                                </FormControl>
                            </div> 
                            <div>
                                <LocalShippingIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={userName} size="small" style={{ width: " 250px" }}
                                    onChange={event => setUserName(event.target.value)}
                                    label="Username" variant="outlined">
                                </TextField>
                            </div>     
                            <div>
                                <LocalShippingIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={password} size="small" style={{ width: " 250px" }}
                                    onChange={event => setPassword(event.target.value)}
                                    label="Parola" variant="outlined">
                                </TextField>
                            </div>                
                                <div className='button-add'>
                                    <Button  variant="contained" color="primary" onClick={adauga}>Adauga <AddCircleOutlineIcon style={{ paddingLeft: "7px" }} /></Button>
                                    <Button  variant="contained" color="primary" onClick={onReset}>Reset <AutorenewIcon style={{ paddingLeft: "7px" }} /></Button>
                                </div>
                            <div>
                            <ToastContainer />
                            </div>
                        </Stack>
                </Stack>
                <div>
                <img src="/images/delivery.svg" height="500em" style={{ maxWidth:'85%',  paddingRight:'5%'}}></img>
                </div>
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default AddUser;