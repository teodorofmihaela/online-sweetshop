import React, {useEffect, useState} from 'react';
import {Typography,FormGroup, Grid, Button, Card,
     TextField, InputLabel, MenuItem, Select, FormControl, Box} from '@material-ui/core';
import { DateField, LocalizationProvider,DateTimePicker, TimePicker} from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Stack } from '@mui/material';
// import {Item} from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import QueueIcon from '@mui/icons-material/Queue';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PaymentsIcon from '@mui/icons-material/Payments';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientNavbar from '../clientPages/ClientNavbar.js'





function ClientOrder() {

const [nameInput, setNameInput] = useState();
const [productsNumberInput, setProductsNumberInput] = useState();
const [valoareTotala, setValoareTotala] = useState(0);
const [dataRidicare, setDataRidicare] = useState(new Date());
const [ziuaRidicare, setZiuaRidicare] = useState();
const [oraRidicare, setOraRidicare] = useState();
const [products, setProducts] = useState();
const [productId, setProductId] = useState();
const [productPrice, setProductPrice] = useState(0);
const [productIdSelect, setProductIdSelect] = useState();
const [productPriceSelect, setProductPriceSelect] = useState();
const [status, setStatus] = useState();
const [open, setOpen] = React.useState(false);
let nr=1;

  const notifySucces = () => toast.success("Comanda a fost adaugata cu succes!");
  const notifyError = () => toast.error("Comanda nu a fost adaugata!");


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
        const res = await fetch(`${baseURL}/comenzi`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "nume": nameInput,
                "cantitate": productsNumberInput,
                "dataRidicare": ziuaRidicare,
                "valoare_totala" : valoareTotala,
                "status_comanda" : "initiata client",
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

function createDataRidicare() {
    setDataRidicare(`${ziuaRidicare}T${oraRidicare}`);
    console.log(ziuaRidicare, oraRidicare, dataRidicare);
}
function createValoareTotala(pret, cantitate) {
    let val_tot=0;
    val_tot=pret*cantitate;
    setValoareTotala(val_tot);
    console.log(valoareTotala);
}

const onDatePicked = (event) => {
    setZiuaRidicare(event);
    let onlyDate = event.$d;
    console.log("Date Changed", event);
};

const onTimePicked = (event) => {
    setOraRidicare(event);
    let onlyDate = event.$d;
    console.log("Date Changed", event);
    createValoareTotala()
};

function onReset() {
    setNameInput("");
    setProductsNumberInput("");
    setDataRidicare("");
    setOraRidicare("");
    setStatus("");
    setValoareTotala(0);
    setProductId("");
}


    return ( 
        <>
        <ClientNavbar/>
        <div className='recipe-content'>
        
            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5} stle={{paddingLeft:'500'}}>
                        <Typography variant="h4" color="primary">Adaugă o nouă comandă</Typography>
                        <Stack spacing={3}>
                            <div>
                                <AccountCircleIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={nameInput} size="small" style={{ width: " 285px" }}
                                    onChange={event => setNameInput(event.target.value)}
                                    label="Nume" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <ShoppingBasketIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "285px" }} InputProps={{ inputProps: { min: 0 } }}
                                    value={productsNumberInput}  label="Cantitate produse" variant="outlined" 
                                    onChange={ event =>
                                        {setProductsNumberInput(event.target.value);
                                        createValoareTotala(productPrice, productsNumberInput)
                                        }}
                                        >
                                </TextField>
                            </div>
                            <div>
                                <CalendarMonthIcon className='form-icon' fontSize='large' />
                                <LocalizationProvider className="input" dateAdapter={AdapterDayjs}>



                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '70%' }}>
                                    <DateTimePicker value={ziuaRidicare} disablePast label="Data ridicarii" style={{paddingLeft: 20}}
                                        onChange={(newValue) => {
                                                     setZiuaRidicare(newValue);}}
                                        //     (date: Moment) => {
                                        //     setDataRidicare(date);
                                        //     console.log(dataRidicare);
                                        //   }}
                                            //event => setDataRidicare(new Date(event.target.value))}
                                        // {event => setZiuaRidicare(event.target.value)}
                                        />

                                {/* <div>
                                    <AccessTimeIcon className='form-icon' fontSize='large' />
                                    <TimePicker value={oraRidicare} disablePast label="Ora ridicarii"
                                    onChange={(date: Moment ) => {
                                        setOraRidicare(date);
                                        console.log(oraRidicare);
                                      }}
                                    // {onTimePicked}
                                        // event => 
                                        // {
                                        //     setOraRidicare(event.target.value); 
                                        //     createDataRidicare();
                                        //     }}
                                            />
                                </div> */}

                                </Box>
                                </LocalizationProvider>
                            </div>                            
                            <div>
                                <QueueIcon className='form-icon' fontSize='large'/>
                                <FormControl style={{minWidth: 220}}>
                                <InputLabel id="demo-simple-select-label">Produsul comandat</InputLabel>
                           
                            <Select defaultValue="" label="Produsul comandat" 
                            //  onChange={() =>
                                // {
                                //     setProductId(productIdSelect);
                                //     setProductPrice(productPriceSelect);
                                //     createValoareTotala(productPrice, productsNumberInput)
                                // }} 
                                 >
                            {products && products.map((product) => (
                                <MenuItem  
                                 onClick={() =>
                                    {
                                        setProductId(product.id);
                                        setProductPrice(product.pret_vanzare);
                                        createValoareTotala(product.pret_vanzare, productsNumberInput);
                                    }} 
                                 value={product.denumire} >{product.denumire} - {product.pret_vanzare} lei</MenuItem>
                             ))}
                             </Select>

                            </FormControl>
                            </div>
                            
                                <div>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '70%' }}>
                                <PaymentsIcon className='form-icon' fontSize='large'/>
                                <Card style={{ minWidth: 230 }}>
                                <Typography> Valoare comanda: {valoareTotala} lei</Typography>
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
                {/* <div>
                <img src="/images/AddCard.svg" height="500em" style={{ maxWidth:'90%', paddingTop:'15%', paddingRight:'5%'}}></img>
                </div> */}
            </Grid>
        </FormGroup>

        </div>

        </>
    )}

export default ClientOrder;