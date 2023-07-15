import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import { Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function AddProduct() {

const [nameInput, setNameInput] = useState();
const [category, setCategory] = useState();
const [profit, setProfit] = useState();
const [price, setPrice] = useState();
const [alergen, setAlergen] = useState();
const [products, setProducts] = useState();
const [open, setOpen] = React.useState(false);
let nr=1;
let nrSelect=1;
  const notifySucces = () => toast.success("Produsul a fost adaugat cu succes!");
  const notifyError = () => toast.error("Produsul nu a fost adaugat!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        const prod = await (
            await fetch(`${baseURL}/produse`)).json();
            setProducts(prod);
    };
    dataFetch();
},[]);



async function adauga() {
    try{
        let id = uuidv4();
        const res = await fetch(`${baseURL}/produse`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "denumire": nameInput,
                "categorie": category,
                "pret_vanzare": price,
                "profit" : profit,
                "alergeni" : alergen
            })
        });
            if(res.status==201){
                notifySucces();
                onReset();
            }
            else if(res.status!=201 || res==null){
                notifyError();
                //TODO: validare sa nu poti introduce mai multe retete pentru acelasi produs
            }
    }catch (err) {
        console.log(err);
    }
}


function onReset() {
    setNameInput("");
    setCategory("");
    setPrice("");
    setProfit("");
    setAlergen("");

}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Typography variant="h4" color="primary" >Adaugă un produs nou</Typography>
                        <Stack spacing={5}>
                            <div>
                                <IcecreamIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={nameInput} size="small" style={{ width: " 285px" }}
                                    onChange={event => setNameInput(event.target.value)}
                                    label="Denumire produs" variant="outlined">
                                </TextField>
                            </div>
                            <div style={{paddingBottom:20}}>
                            <AutoAwesomeMosaicIcon className='form-icon' fontSize='large'/>
                            <FormControl style={{minWidth: 220}}>
                            <InputLabel >Categorie produs</InputLabel>
                            <Select label="Produsul comandat"  defaultValue="" onChange={event =>
                                        {setCategory(event.target.value);
                                    }}>
                                <MenuItem key={nrSelect++} value='cofetarie'>Cofetarie</MenuItem>
                                <MenuItem key={nrSelect++} value='ciocolata'>Ciocolata</MenuItem>
                                <MenuItem key={nrSelect++} value='inghetata'>Inghetata</MenuItem>
                                <MenuItem key={nrSelect++} value='patiserie'>Patiserie</MenuItem>
                                <MenuItem key={nrSelect++} value='tort'>Tort</MenuItem>

                            </Select>
                            </FormControl> 
                            </div>
                            <div>
                                <PaymentsIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={price}  label="Pret vanzare" variant="outlined" 
                                    onChange={ event =>
                                        {setPrice(event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div>
                            <div>
                                <RequestQuoteIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={profit}  label="Profit" variant="outlined" 
                                    onChange={ event =>
                                        {setProfit(event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div>  
                            <div>
                                <FmdBadIcon className='form-icon' fontSize='large' />
                                <TextField  className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={alergen}  label="Alergen" variant="outlined" 
                                    onChange={ event =>
                                        {setAlergen(event.target.value);
                                        }}
                                        >
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
                <img src="/images/addProd.svg" height="500em" style={{ maxWidth:'90%',  paddingRight:'5%'}}></img>
                </div>
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default AddProduct;