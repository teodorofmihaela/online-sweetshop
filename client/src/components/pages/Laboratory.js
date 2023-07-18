import React, {useEffect, useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, Card,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import {  LocalizationProvider,DateTimePicker} from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
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





function Laboratory() {

const [nameInput, setNameInput] = useState();
const [category, setCategory] = useState();
const [profit, setProfit] = useState();
const [cantitate, setCantitate] = useState();
const [products, setProducts] = useState([]);
const [stoc, setStoc] = useState();
const [stocProduse, setStocProduse] = useState();
const [productId, setProductId] = useState();

const [open, setOpen] = React.useState(false);
let nr=1;
let nrSelect=1;
  const notifySucces = () => toast.success("Stocul a fost adaugat cu succes!");
  const notifyError = () => toast.error("Stocul nu a fost adaugat!");


const baseURL = "http://localhost:8080"; 

useEffect(() =>{
    const dataFetch = async () => {
        try{
            let [requestProduse, requestStoc ]= await Promise.all([
                fetch(`${baseURL}/produse`),
                fetch(`${baseURL}/stoc_produs`)
                ]);
                if (requestProduse.status === 200 && requestStoc.status ===200 ) {
                    const responseProduse = await requestProduse.json();
                    const responseStoc = await requestStoc.json();
                    setProducts(responseProduse);
                    setStoc(responseStoc);
                    StocProduse(requestProduse, requestStoc);
                 }
        }catch(err){
            console.log(err);
        }
        const prod = await (
            await fetch(`${baseURL}/produse`)).json();
            setProducts(prod);
    };
    dataFetch();
},[]);

function StocProduse(produse, stoc){
    let stocMap = [];
  
    produse.forEach((j1) => {
        stoc.forEach((j2) => {
        if (j1.id == j2.produseId) {
            stocMap.push({ ...j1,...j2});
            }
            });
        });
        setStocProduse(stocMap);
        console.log(stocMap);
  }

async function adauga() {
    try{
        let id = uuidv4();
        let data=new Date();
        const res = await fetch(`${baseURL}/stoc_produs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "data_productie": data,
                "cantitate_produse_stoc": cantitate,
                "produseId": productId,
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
    setCantitate("");
}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} width='450px'>
                        <Typography variant="h4" color="primary" >Initiaza productie</Typography>
                        <Stack spacing={5}>
                           
                            <div>
                            <FormControl style={{minWidth: 220}}>
                            <InputLabel >Produs </InputLabel>
                            <Select defaultValue="" label="Produs"  >
                                {products && products.map((product,i) => (
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
                            
                            <div>
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={cantitate}  label="Cantitate" variant="outlined" 
                                    onChange={ event =>
                                        {setCantitate(event.target.value);
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

export default Laboratory;