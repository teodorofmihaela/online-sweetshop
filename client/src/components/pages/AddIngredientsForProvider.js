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


function AddIngredientsForProvider() {

const [delivery, setDelivery] = useState();
const [price, setPrice] = useState();
const [ingrediente, setIngrediente] = useState();
const [ingredientId, setIngredientId] = useState();
const [furnizori, setFurnizori] = useState();
const [furnizorId, setFurnizorId] = useState();

let nr=1;

const notifySucces = () => toast.success("Furnizor pentru ingredient a fost adaugat cu succes!");
const notifyError = () => toast.error("Actiunea nu a fost avut succes!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        try{
            let [requestIngrediente, requestFurnizori]= await Promise.all([
                fetch(`${baseURL}/ingrediente`),
                fetch(`${baseURL}/furnizori`)
                ]);
                   if (requestIngrediente.status === 200 && requestFurnizori.status ===200 ) {
                   const responseIngrediente = await requestIngrediente.json();
                   const responseFurnizori = await requestFurnizori.json();
                   setIngrediente(responseIngrediente);
                   setFurnizori(responseFurnizori);
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
},[]);



async function adauga() {
    try{
        let id = uuidv4();
        const res = await fetch(`${baseURL}/ingrediente_furnizori`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "pret_ingredient": price,
                "timp_livrare": delivery,
                "ingredienteId": ingredientId,
                "furnizorId" : furnizorId
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
    setPrice("");
    setDelivery("");
    setIngredientId("");
    setFurnizorId("");
}


    return ( 
        <>
        <div className='recipe-content'>
        <Typography variant="h4" color="primary" style={{paddingBottom:'5%'}}>Adaugă un furnizor nou pentru ingredient </Typography>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Stack spacing={5}>
                        <div>
                            <StorefrontIcon className='form-icon' fontSize='large'/>
                            <FormControl style={{minWidth: 220}}>
                            <InputLabel >Furnizor</InputLabel>
                            <Select defaultValue="" label="Furnizor"  >
                            {furnizori && furnizori.map((furnizor) => (
                                <MenuItem  
                                 onClick={() =>
                                    {
                                        setFurnizorId(furnizor.id);
                                    }} 
                                 value={furnizor.nume_furnizor} >{furnizor.nume_furnizor}</MenuItem>
                             ))}
                             </Select>
                            </FormControl>
                            </div>
                            <div>
                            <EggIcon className='form-icon' fontSize='large'/>
                            <FormControl style={{minWidth: 220}}>
                            <InputLabel >Ingredient</InputLabel>
                            <Select defaultValue="" label="Ingredient"  >
                            {ingrediente && ingrediente.map((ingredient) => (
                                <MenuItem  
                                 onClick={() =>
                                    {
                                        setIngredientId(ingredient.id);
                                    }} 
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

export default AddIngredientsForProvider;