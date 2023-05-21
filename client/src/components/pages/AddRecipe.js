import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, IconButton, InputAdornment,
     TextField, TextareaAutosize, Snackbar  , Checkbox, RadioGroup , Radio, FormControlLabel, AlertTitle, Card, Fade  } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { Stack } from '@mui/material';
// import {Item} from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import EggIcon from '@mui/icons-material/Egg';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Recipe() {

const [recipeNameInput, setRecipeNameInput] = useState();
const [productsNumberInput, setProductsNumberInput] = useState();
const [valoriNutritionaleInput, setValoriNutritionaleInput] = useState();
const [ingredientsInput, setIngredientsInput] = useState();
const [instructionsInput, setInstructionsInput] = useState();
const [ingredients, setIngredients] = useState();
const [products, setProducts] = useState();
const [productId, setProductId] = useState();
const [open, setOpen] = React.useState(false);



  const notifySucces = () => toast.success("Reteta a fost adaugata cu succes!");
  const notifyError = () => toast.error("Reteta nu a fost adaugata, datele introduse sunt incorecte sau acest produs are deja o reteta!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        const data = await (
            await fetch(`${baseURL}/ingrediente`)).json();
            setIngredients(data);
        const prod = await (
            await fetch(`${baseURL}/produse`)).json();
            setProducts(prod);
    };
    dataFetch();
},[]);



async function adauga() {
    try{
        let id = uuidv4()
        const res = await fetch(`${baseURL}/retetar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "denumire": recipeNameInput,
                "numar_produse": productsNumberInput,
                "mod_preparare": instructionsInput,
                "valori_nutritionale":valoriNutritionaleInput,
                "produseId":productId,
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
    setRecipeNameInput("");
    setProductsNumberInput("");
    setValoriNutritionaleInput("");
    setIngredientsInput("");
    setInstructionsInput("");
    setProductId("");
}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5}>
                        <Typography variant="h4" color="primary">Adauga o reteta noua</Typography>
                        <Stack spacing={3}>
                            <div>
                                <MenuBookIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={recipeNameInput} size="small" style={{ width: " 285px" }}
                                    onChange={event => setRecipeNameInput(event.target.value)}
                                    label="Denumire reteta" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <FoodBankIcon className='form-icon' fontSize='large' />
                                <TextareaAutosize minRows={3} placeholder="Mod de preparare reteta"  variant="outlined" style={{ width: "285px" }}
                                value={instructionsInput} onChange={event => setInstructionsInput(event.target.value)}></TextareaAutosize>
                            </div>
                            <div>
                                <InventoryIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={productsNumberInput}  label="Numar produse" variant="outlined" onChange={event => setProductsNumberInput(event.target.value)}>
                                </TextField>
                            </div>
                            <div>
                                <MenuBookIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" value={valoriNutritionaleInput} size="small" style={{ width: "285px" }}
                                    onChange={event => setValoriNutritionaleInput(event.target.value)}
                                    label="Valori nutritionale" variant="outlined"
                                    InputProps={{ inputProps: { min: 0 }, startAdornment: <InputAdornment position="start">kcal</InputAdornment>}}>
                                </TextField>
                            </div>
                            <div>
                            <Typography>Selecteaza ingredientele si cantitatile necesare:</Typography>
                            </div>
                            <div>
                                {ingredients && ingredients.map((ingredient) => (
                            <FormGroup>
                                <FormControlLabel className="checkbox-input" value={`${ingredient.nume}`} control={<Checkbox  />} label={`${ingredient.nume} (${ingredient.unitate_masura})`}/>
                                <span>
                                <EggIcon className='checkbox-icon' fontSize='large' />

                                 <FormControlLabel  control={<TextField  type="number" value={ingredientsInput} size="small" style={{ width: "279px" }}
                                    onChange={event => setIngredientsInput(event.target.value)} InputProps={{ inputProps: { min: 0 } }}
                                    label="Cantitate ingredient" variant="outlined"/>}/>
                                 </span>
                            </FormGroup> 
                                ))}
                                
                            </div>
                            <div>
                            <span>
                            <KitchenIcon className='checkbox-icon' fontSize='large'/>
                            <Typography>Selecteaza produsul rezultat din aceasta reteta:</Typography>
                            </span>
                            </div>
                            <div>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                                
                                {products && products.map((product) => (
                                    <FormControlLabel className="radio-input" value={`${product.denumire}`} control={<Radio/>} label={product.denumire}
                                    onChange={event => setProductId(product.id)}/>
                                ))}
                                
                                </RadioGroup>
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
                <img src="/images/cooking.svg" height="500em"></img>
                </div>
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default Recipe;