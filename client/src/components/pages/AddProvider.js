import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button,
     TextField, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core';
import { Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EggIcon from '@mui/icons-material/Egg';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import WarehouseIcon from '@mui/icons-material/Warehouse';


function AddProvider() {

const [nameInput, setNameInput] = useState();
const [adressInput, setAdressInput] = useState();
const [personInput, setPersonInput] = useState();
const [phoneInput, setPhoneInput] = useState();
const [delivery, setDelivery] = useState();
const [price, setPrice] = useState();
const [ingredients, setIngredients] = useState();
const [ingredientId, setIngredientId] = useState();
let nr=1;

const notifySucces = () => toast.success("Furnizorul a fost adaugat cu succes!");
const notifyError = () => toast.error("Furnizorul nu a fost adaugat!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        const res = await (
            await fetch(`${baseURL}/ingrediente`)).json();
            setIngredients(res);
    };
    dataFetch();
},[]);


async function adauga() {
    try{
        let id = uuidv4();
        const res = await fetch(`${baseURL}/furnizori`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "nume_furnizor": nameInput,
                "adresa": adressInput,
                "telefon": phoneInput,
                "persoana_contact" : personInput
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
                "ingredienteId": ingredientId,
                "furnizorId" : id
            })
        });

            if(res.status==201 && res2.status==201){
                notifySucces();
                onReset();
            }
            else if(res.status!=201 || res2.status!=201 || res2==null || res==null){
                notifyError();
            }
    }catch (err) {
        console.log(err);
    }
}


function onReset() {
    setNameInput("");
    setPrice("");
    setPhoneInput("");
    setAdressInput("");
    setPersonInput("");
    setIngredientId("");
    setDelivery("");
}


    return ( 
        <>
        <div className='recipe-content'>
        <Typography variant="h4" color="primary" style={{paddingBottom:'5%'}}>Adaugă un furnizor nou</Typography>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Stack spacing={5}>
                            <div>
                                <StorefrontIcon className='form-icon' fontSize='large'/>
                                <TextField className="input" value={nameInput} size="small" style={{ width: " 250px" }}
                                    onChange={event => setNameInput(event.target.value)}
                                    label="Nume furnizor" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <WarehouseIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={adressInput} size="small" style={{ width: " 250px" }}
                                    onChange={event => setAdressInput(event.target.value)}
                                    label="Adresa" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <PersonIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={personInput} size="small" style={{ width: " 250px" }}
                                    onChange={event => setPersonInput(event.target.value)}
                                    label="Persoana de contact" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <PhoneIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={phoneInput} size="small" style={{ width: " 250px" }}
                                    onChange={event => setPhoneInput(event.target.value)}
                                    label="Numar de telefon" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <FormControl style={{minWidth: 220}}>
                                <InputLabel >Ingredient</InputLabel>
                            <Select defaultValue="" label="Categorie produs"  >
                            {ingredients && ingredients.map((ingredient) => (
                                <MenuItem  
                                 onClick={() =>
                                    { setIngredientId(ingredient.id)}} 
                                 value={ingredient.nume} >{ingredient.nume}</MenuItem>
                             ))}
                             </Select>
                            </FormControl>
                            </div>
                            <div>
                                <PaymentsIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "250px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={price}  label="Pret ingredient" variant="outlined" 
                                    onChange={ event =>
                                        {setPrice(event.target.value) }} >
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

export default AddProvider;