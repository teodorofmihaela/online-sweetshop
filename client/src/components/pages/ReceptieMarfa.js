import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card, CardActionArea,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import { CardContent, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EggIcon from '@mui/icons-material/Egg';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Moment from 'moment';
import InventoryIcon from '@mui/icons-material/Inventory';


function ReceptieMarfa() {

const [nameInput, setNameInput] = useState();
const [ingredientsNumberInput, setIngredientsNumberInput] = useState();
const [valoareTotala, setValoareTotala] = useState(0);
const [lot, setLot] = useState();
const [ingrediente, setIngrediente] = useState();
const [furnizori, setFurnizori] = useState();
const [ingredientId, setIngredientId] = useState();
const [furnizorId, setFurnizorId] = useState();
const [price, setPrice] = useState(0);
const [ingredienteFurnizori, setIngredienteFurnizori] = useState();
const [ingrediente1, setIngrediente1] = useState();
const [ingredienteFinal, setIngredienteFinal] = useState();
const [open, setOpen] = React.useState(false);

const notifySucces = () => toast.success("Achizite adaugata cu succes!");
const notifyError = () => toast.error("Achizita nu a putut fi adaugata!");

const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        try{
            let [requestIngrediente, requestFurnizori, requestIngFurnizori ]= await Promise.all([
                fetch(`${baseURL}/ingrediente`),
                fetch(`${baseURL}/furnizori`),
                fetch(`${baseURL}/ingrediente_furnizori`)
                ]);
                   if (requestIngrediente.status === 200 && requestFurnizori.status ===200 && requestIngFurnizori.status ===200) {
                   const responseIngrediente = await requestIngrediente.json();
                   const responseFurnizori = await requestFurnizori.json();
                   const responseIngFurnizori = await requestIngFurnizori.json();
                   setIngrediente(responseIngrediente);
                   setFurnizori(responseFurnizori);
                   setIngredienteFurnizori(responseIngFurnizori);
                   SupplyIngredients(responseIngrediente, responseFurnizori, responseIngFurnizori);
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
},[]);



function SupplyIngredients(ingrediente, furnizori, ingFurniz){
    let ingrMap = [];
    let furnizMap = [];
  
    ingFurniz.forEach((j1) => {
      ingrediente.forEach((j2) => {
        if (j1.ingredienteId == j2.id) {
          ingrMap.push({ ...j1,...j2});
            }
            });
        });
    
        ingrMap.forEach((j1) => {
          furnizori.forEach((j2) => {
        if (j1.furnizorId == j2.id) {
          furnizMap.push({ ...j1,...j2 });
            }
            });
        });  
        setIngrediente1(furnizMap);
    
  }
  
  function createFurniz(id) {

    let finalArr=[];
    ingrediente1.forEach((j1) => {
      if (j1.ingredienteId == id) {
        finalArr.push({ ...j1});
          }
        });
    console.log(finalArr);
    setIngredienteFinal(finalArr);
    console.log(ingredienteFinal);
}

function createValoareTotala(pret, cantitate) {
    let val_tot=0;
    val_tot=pret*cantitate;
    setValoareTotala(val_tot);
}


async function adauga() {
    try{
        let id = uuidv4();
        let data=new Date();
        const res = await fetch(`${baseURL}/achizitii`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "cantitate": ingredientsNumberInput,
                "pret_total": valoareTotala,
                "data_achizite": data,
                "lot" : lot,
                "ingredienteId" : ingredientId,
                "furnizoriId": furnizorId 
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
    setNameInput("");
    setIngredientsNumberInput("");
    valoareTotala("");
    setIngredientId("");
    setFurnizorId("");

}


    return ( 
        <>
        <div className='recipe-content'>
        <Typography variant="h4" color="primary" style={{paddingBottom:'5%'}}>Receptie marfa</Typography>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                    <Stack spacing={5}>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <FormControl style={{minWidth: 220}}>
                                <InputLabel >Ingredient</InputLabel>
                            <Select defaultValue="" label="" type="text" >
                            {ingrediente && ingrediente.map((ing) => (
                                <MenuItem  onClick={() =>
                                    {
                                        setIngredientId(ing.id);
                                        setNameInput(ing.nume);
                                        createFurniz(ing.id);
                                    }} 
                                 value={ing.nume} >{ing.nume} ({ing.unitate_masura})</MenuItem>
                             ))}
                             </Select>
                            </FormControl>
                            </div>
                                <div width='100%'>
                                <StorefrontIcon className='form-icon' fontSize='large'/>
                                <Typography variant="h6">Furnizor: {nameInput}</Typography>
                            
                            <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 15, minWidth: 1000, width: '97%', paddingLeft:'50' }}>
                            {ingredienteFinal && ingredienteFinal.map((ingr) => (
                            <Card sx={{ maxWidth: 400 }} className='products' >
                                      <CardActionArea 
                                      onClick={() =>
                                        {
                                            setFurnizorId(ingr.id);
                                            setPrice(ingr.pret_ingredient);
                                            createValoareTotala(ingr.pret_ingredient, ingredientsNumberInput);
                                        }} >
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {ingr.nume_furnizor}
                                        </Typography>
                                        <Typography variant="subtitle1"> 
                                        Timp livrare: {ingr.timp_livrare}
                                        </Typography>
                                        <Typography variant="h6">
                                        Pret: {ingr.pret_ingredient} lei
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                             ))}
                            </Box>
                            </div> 
                            <div>
                                <ShoppingCartIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "250px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={ingredientsNumberInput}  label="Cantitate" variant="outlined" 
                                    onChange={ event =>
                                        {setIngredientsNumberInput(event.target.value);
                                        createValoareTotala(price, event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div>       
                            <div>
                                <InventoryIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "250px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={lot}  label="Lot" variant="outlined" 
                                    onChange={ event =>
                                        {setLot(event.target.value);
                                        }}
                                        >
                                </TextField>
                            </div> 
                            <div >
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '70%' }}>
                                <Card style={{ minWidth: 230, maxWidth: 230}}>
                                <PaymentsIcon className='form-icon' fontSize='large' />
                                <Typography> Valoare totala: {valoareTotala} lei</Typography>
                                </Card>
                                </Box>
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
                <img src="/images/delivered.svg" height="500em" style={{ maxWidth:'85%',  paddingRight:'5%'}}></img>
                </div>
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default ReceptieMarfa;