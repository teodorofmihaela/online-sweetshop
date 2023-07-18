import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card, CardActionArea,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import { DateField, LocalizationProvider,DateTimePicker, TimePicker} from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { CardContent, Stack } from '@mui/material';
// import {Item} from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WidgetsIcon from '@mui/icons-material/Widgets';
import QueueIcon from '@mui/icons-material/Queue';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import { DatasetRounded } from '@mui/icons-material';





function AddSale() {

const [nameInput, setNameInput] = useState();
const [productsNumberInput, setProductsNumberInput] = useState();
const [valoareTotala, setValoareTotala] = useState(0);
const [data, setData] = useState(new Date());
const [products, setProducts] = useState();
const [productId, setProductId] = useState();
const [recipes, setRecipes] = useState();
const [stoc, setStoc] = useState();
const [cantitateProdStoc, setCantitateProdStoc] = useState();
const [prodRecipes, setProdRecipes] = useState();
const [productPrice, setProductPrice] = useState(0);
const [showStoc, setShowStoc] = useState(0);
const [dataProductie, setDataProductie] = useState(new Date());
const [idStoc, setIdStoc] = useState();
const [prodDenum, setProdDenum] = useState("Nici un produs selectat!");
const [prodRecipeStoc, setProdRecipeStoc] = useState();

let nr=1;

  const notifySucces = () => toast.success("Vanzarea a fost inregistrata cu succes!");
  const notifyError = () => toast.error("Vanzarea nu a fost inregistrata!");


const baseURL = "http://localhost:8080";

useEffect(() =>{
    const dataFetch = async () => {
        try{
            let [requestRecipe, requestProducts, requestStocProduse ]= await Promise.all([
                fetch(`${baseURL}/retetar`),
                fetch(`${baseURL}/produse`),
                fetch(`${baseURL}/stoc_produs`)
                ]);
                   if (requestRecipe.status === 200 && requestProducts.status ===200 && requestStocProduse.status ===200) {
                   const responseRecipe = await requestRecipe.json();
                   const responseProduse = await requestProducts.json();
                   const responseStocProduse = await requestStocProduse.json();
                   setProducts(responseProduse);
                   setRecipes(responseRecipe);
                   setStoc(responseStocProduse);
                   ProductsRecipes(responseRecipe, responseProduse);
                //    StocProduse(responseStocProduse, responseProduse);
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);


function ProductsRecipes(recipes, products){
    let productsMap = []
    recipes.forEach((j1) => {
        products.forEach((j2) => {
            if (j1.produseId === j2.id) {
                productsMap.push({ ...j1,...j2 });
            }
        });
        }); 
    setProdRecipes(productsMap);
    console.log(prodRecipes);
}

// function StocProduse(stoc, products){
//     let stocMap = []
//     stoc.forEach((j1) => {
//         products.forEach((j2) => {
//             if (j1.produseId === j2.id) {
//                 stocMap.push({ ...j1,...j2 });
//             }
//         });
//         }); 
//     setShowStoc(stocMap);
//     // produseRecipeStoc(showStoc,prodRecipes);
//     console.log(showStoc);
// }

// function produseRecipeStoc(stocProd, RecipeProducts){
//     let stocMap2 = []
//     stocProd.forEach((j1) => {
//         RecipeProducts.forEach((j2) => {
//             if (j1.produseId === j2.produseId) {
//                 stocMap2.push({ ...j1,...j2 });
//             }
//         });
//         }); 
//         setProdRecipeStoc(stocMap2);
//     console.log(prodRecipeStoc);
// }

async function adauga() {
    try{
        let id = uuidv4();
        createData();
        ScadeStocProdus();
        const res = await fetch(`${baseURL}/vanzari`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "cantitate_vanduta": productsNumberInput,
                "data": data,
                "valoare_totala" : valoareTotala,
                "produseId":productId,
            })
        });

        const res2 = await fetch(`${baseURL}/stoc_produs/${idStoc}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": idStoc,
                "data_productie": dataProductie,
                "cantitate_produse_stoc" : `${cantitateProdStoc}`,
                "produseId":productId,
            })
        });

            if(res.status==201 && res2.status==204){
                notifySucces();
                onReset();
            }
            else if(res.status!=201 || res==null || res2.status!=204 || res2==null){
                notifyError();
            }
    }catch (err) {
        console.log(err);
    }
}

function createData() {
    setData(new Date());
    console.log(data);
}

function ScadeStocProdus(){
    let stocRamas=showStoc-productsNumberInput;
    setCantitateProdStoc(stocRamas);
    console.log(cantitateProdStoc);
}

const handleClick = (id,denum, pret) => e => {
    setProductId(id);
    setProdDenum(denum);
    stoc.forEach( (s1) => {
        if(id==s1.produseId)
    {
        setShowStoc(s1.cantitate_produse_stoc);
        setDataProductie(s1.data_productie);
        setIdStoc(s1.id);
    }})
   
    createValoareTotala(pret, productsNumberInput);
    console.log("Selectat " + id);
}

function createValoareTotala(pret, cantitate) {
    let val_tot=0;
    val_tot=pret*cantitate;
    setValoareTotala(val_tot);
    console.log("Valoare totala "+valoareTotala);
}


function onReset() {
    setProductsNumberInput(0);
    setData("");
    setValoareTotala(0);
    setProductId("");
    setProdDenum("Nici un produs selectat!");
    setShowStoc(0);
}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                        <Stack spacing={3}>
                            <div>
                            <Typography variant="h4" color="primary">Adaugă o nouă vânzare</Typography>
                                
                            </div>  
                            <div>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '70%' }}>
                                <WidgetsIcon className='form-icon' fontSize='large'/>
                                <Card style={{ minWidth: 230 }}>
                                <Typography> Disponibil pe stoc: {showStoc}</Typography>
                                </Card>
                                </Box>
                            </div>                        
                            <div>
                                <QueueIcon className='form-icon' fontSize='large'/>
                                <Typography variant="h6">Produs: {prodDenum}</Typography>
                            </div>
                            <div>
                            <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 15, minWidth: 300, width: '97%' }}>
                            {prodRecipes && prodRecipes.map((product) => (
                            <Card sx={{ maxWidth: 345 }} className='products' >
                                      <CardActionArea onClick={handleClick(product.id, product.denumire, product.pret_vanzare)}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {product.denumire}
                                        </Typography>
                                        <Typography variant="subtitle1"> 
                                        {product.valori_nutritionale}
                                        </Typography>
                                        <Typography variant="h6">
                                        Pret: {product.pret_vanzare} lei
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                             ))}
                            </Box>
                            </div>
                            <div>
                            <ShoppingBasketIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={productsNumberInput}  label="Cantitate vanduta" variant="outlined" 
                                    onChange={ event =>
                                        {setProductsNumberInput(event.target.value);
                                        createValoareTotala(productPrice, productsNumberInput)
                                        }}
                                        >
                                </TextField>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '70%' }}>
                                <PaymentsIcon className='form-icon' fontSize='large'/>
                                <Card style={{ minWidth: 230 }}>
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
                
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default AddSale;