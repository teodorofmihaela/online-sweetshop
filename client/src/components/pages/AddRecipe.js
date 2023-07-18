import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, IconButton, InputAdornment,
     TextField, TextareaAutosize, Snackbar  , Checkbox, RadioGroup , Radio, FormControlLabel, InputLabel, MenuItem, Select, FormControl, Card, Fade  } from '@material-ui/core';
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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router'





function Recipe() {

const [recipeNameInput, setRecipeNameInput] = useState();
const [productsNumberInput, setProductsNumberInput] = useState();
const [valoriNutritionaleInput, setValoriNutritionaleInput] = useState();
const [ingredientsInput, setIngredientsInput] = useState();
const [instructionsInput, setInstructionsInput] = useState();
const [ingredients, setIngredients] = useState();
const [products, setProducts] = useState();
const [productId, setProductId] = useState();
const [data,setData]=useState([{ingredientId:"",cantitate:""}])
const [ingredientId, setIngredientId] = useState();
const [isNavigate, setIsNavigate] = React.useState(false);
let nrSelect=1;

const navigate = useNavigate();
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

const handleClickAddIngredients=()=>{
    setData([...data,{ingredientId:"",cantitate:""}])
}

const handleChange=(e,i)=>{
    const {name,value}=e
    const onchangeVal = [...data]
    onchangeVal[i][name]=value
    setData(onchangeVal)
    console.log(data);
}

async function adaugaIngrediente(idRecipe) {
    try{
        await Promise.all(data.map(async (ingr) => {
            let id2 = uuidv4()
            const responseIngredientsInRecipe = await fetch(`http://localhost:3000/ingrediente_in_retete`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id2,
                "cantitate_ingredient": ingr.cantitate,
                "ingredienteId": ingr.ingredientId,
                "retetarId": idRecipe,
                "produseId":productId,
            })
        })
        if(responseIngredientsInRecipe.status==201){
            notifySucces();
            onReset();
            setIsNavigate(true);
            // navigate("/");
        }
        else if(responseIngredientsInRecipe.status!=201 || responseIngredientsInRecipe==null){
            notifyError();
        }
    }));
            
    }catch (err) {
        console.log(err);
    }
}

async function adauga() {
    try{
        let idRecipe = uuidv4()
        const res = await fetch(`${baseURL}/retetar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": idRecipe,
                "denumire": recipeNameInput,
                "numar_produse": productsNumberInput,
                "mod_preparare": instructionsInput,
                "valori_nutritionale":valoriNutritionaleInput,
                "produseId":productId,
            })
        });
       

            if(res.status==201){
                adaugaIngrediente(idRecipe);
            }
            else if(res.status!=201 || res==null){
                notifyError();
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
    setProducts("");
    setData([{ingredientId:"",cantitate:""}]);
}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} >
                        <Typography variant="h4" color="primary">Adauga o reteta noua</Typography>
                        <Stack spacing={3} width='100%'>
                            <div>
                                <MenuBookIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={recipeNameInput} size="small" style={{ width: " 285px" }}
                                    onChange={event => setRecipeNameInput(event.target.value)}
                                    label="Denumire reteta" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <FoodBankIcon className='form-icon' fontSize='large' />
                                <TextareaAutosize minRows={3} placeholder="Mod de preparare reteta" variant="outlined" style={{ width: "285px", fontSize: 20  }}
                                value={instructionsInput} onChange={event => setInstructionsInput(event.target.value)} ></TextareaAutosize>
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
                            <Button  variant="contained" color="primary" onClick={handleClickAddIngredients}startIcon={<AddIcon />}>
                            Adaugă un nou ingredient 
                            </Button >
                            { data && data.map((val,i)=>
                <div>
                    <EggIcon className='form-icon' fontSize='large'/>
                    <FormControl style={{minWidth: 220}}>
                                <InputLabel >Ingredient</InputLabel>
                    <Select defaultValue="" label="Categorie produs" name="ingredientId"
                    onChange={(e)=>handleChange(e.target,i)} > 
                            {ingredients && ingredients.map((ingredient) => (
                                <MenuItem  name="ingredientId"
                                 onClick={() =>
                                    {
                                        setIngredientId(ingredient.id);
                                        // handleChange(e.target,i)
                                    }} 
                                    value={ingredient.id}>{`${ingredient.nume} (${ingredient.unitate_masura})`}</MenuItem>
                             ))}
                             </Select>
                             <div style={{ paddingTop:20}}>
                             <TextField  type="number" name="cantitate" value={val.cantitate} size="small" style={{ width: "279px"}}
                                    onChange={(e)=>handleChange(e.target,i)} InputProps={{ inputProps: { min: 0 } }}
                                    label="Cantitate ingredient" variant="outlined"/>
                            </div>
                            </FormControl>
                </div>
                )
            }

                            <div>
                            <KitchenIcon className='checkbox-icon' fontSize='large'/>
                            <Typography>Selecteaza produsul rezultat din aceasta reteta:</Typography>
                            </div>
                            <div>
                            <FormControl style={{minWidth: 220}}>
                            <InputLabel >Produs rezultat</InputLabel>
                            <Select defaultValue="" label="Produs rezultat"  >
                                {products && products.map((product) => (
                                <MenuItem  
                                 onClick={() =>
                                    {
                                        setProductId(product.id)
                                    }} 
                                 value={product.denumire} >{product.denumire}</MenuItem>
                             ))}
                             </Select>
                             </FormControl>
                            </div>
                                <div className='button-add'>
                                    <Button  variant="contained" color="primary" onClick={adauga}>Adauga <AddCircleOutlineIcon style={{ paddingLeft: "7px" }} /></Button>
                                    <Button  variant="contained" color="primary" onClick={onReset}>Reset <AutorenewIcon style={{ paddingLeft: "7px" }} /></Button>
                                </div>
                            
                            <div>
                            { (isNavigate) ?(
                             <Navigate  to="/retetar/add" push={true} />
                                        ):
                                        <div></div>}
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