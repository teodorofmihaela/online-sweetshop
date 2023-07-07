import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';

import { Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoneyIcon from '@mui/icons-material/Money';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import { DatasetRounded } from '@mui/icons-material';
import EggIcon from '@mui/icons-material/Egg';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function AddIngredient() {

const [nameInput, setNameInput] = useState();
const [productsNumberInput, setProductsNumberInput] = useState();
const [valoareTotala, setValoareTotala] = useState(0);
const [furnizori, setFurnizori] = useState();
const [furnizorId, setFurnizorId] = useState();
const [price, setPrice] = useState();
const [um, setUm] = useState();
const [furnizorSelectat, setFurnizorSelectat] = useState();
const [delivery, setDelivery] = useState();

const [status, setStatus] = useState();
const [open, setOpen] = React.useState(false);
let nr=1;

  const notifySucces = () => toast.success("Ingredientul a fost adaugat cu succes!");
  const notifyError = () => toast.error("Ingredientul nu a fost adaugat!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        const response = await (
            await fetch(`${baseURL}/furnizori`)).json();
            setFurnizori(response);
    };
    dataFetch();
},[]);



async function adauga() {
    try{
        let id = uuidv4();
        const res = await fetch(`${baseURL}/ingrediente`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "nume": nameInput,
                "unitate_masura": um,
                'pret': "1"
            })
        });
        let id2 = uuidv4();
        const res2 = await fetch(`${baseURL}/ingrediente_furnizori`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id2,
                "pret_ingredient": price,
                "timp_livrare": delivery,
                "ingredienteId": id,
                "furnizorId": furnizorId
            })
        });
            if(res.status==201 && res2.status==201){
                notifySucces();
                onReset();
            }
            else if(res.status!=201 || res2.status!=201 || res==null){
                notifyError();
            }
    }catch (err) {
        console.log(err);
    }
}


function onReset() {
    setNameInput("");
    setPrice("");
    setUm("");
    setDelivery("");
    setFurnizorId("");
    setFurnizorSelectat("");
    valoareTotala("");
}


    return ( 
        <>
        <div className='recipe-content'>
        <Typography variant="h4" color="primary" style={{paddingBottom:'5%'}}>Adaugă un ingredient nou</Typography>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Stack spacing={5}>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={nameInput} size="small" style={{ width: " 250px" }}
                                    onChange={event => setNameInput(event.target.value)}
                                    label="Nume ingredient" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <StorefrontIcon className='form-icon' fontSize='large'/>
                                <FormControl style={{minWidth: 220}}>
                                <InputLabel >Furnizor</InputLabel>
                            <Select defaultValue="" label="Furnzior"  >
                            {furnizori && furnizori.map((furnizor) => (
                                <MenuItem  
                                 onClick={() =>
                                    {
                                        setFurnizorId(furnizor.id);
                                        setFurnizorSelectat(furnizor.nume_furnizor);
                                    }} 
                                 value={furnizor.nume_furnizor} >{furnizor.nume_furnizor}</MenuItem>
                             ))}
                             </Select>

                            </FormControl>
                            </div>

                            <div>
                                <ScaleIcon className='form-icon' fontSize='large' />
                                <TextField className="input" size="small" style={{ width: "250px" }} 
                                    value={um}  label="Unitate de masura" variant="outlined" 
                                    onChange={ event =>
                                        {setUm(event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div>
                            <div>
                                <PaymentsIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "250px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={price}  label="Pretul pentru furnizorul selectat" variant="outlined" 
                                    onChange={ event =>
                                        {setPrice(event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div>        
                            <div>
                                <LocalShippingIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={delivery} size="small" style={{ width: " 250px" }}
                                    onChange={event => setDelivery(event.target.value)}
                                    label="Timp de livrare" variant="outlined">
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

export default AddIngredient;