import React, {useEffect, useState} from 'react';
import {Card, CardContent,CardActions,Typography, Button, Stack, Avatar, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import {   Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText}  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Orders.css';




function Orders() {
    
const [comenzi, setComenzi] = useState();
const [produse, setProduse] = useState();
const [prodOrdered, setProdOrdered] = useState([]);
const [orderId, setOrderId] = useState();
const [ordersIds, setOrdersIds] = useState();
const [nume, setNume] = useState();
const [open, setOpen] = React.useState(false);
const notifySuccess = () => toast.success("Comanda stearsa cu succes!");
const notifyError = () => toast.error("Comanda nu a fost stearsa!");

let data=[];

const baseURL = "http://localhost:8080";
let nr=1;

    useEffect(() =>{
        createProductsOrdered();
    },[]);

async function createProductsOrdered(){
    const dataFetch = async () => {
        try {
            let [requestComenzi, requestProduse ]= await Promise.all([
                fetch(`${baseURL}/comenzi`),
                fetch(`${baseURL}/produse`)
                ]);
                   if (requestComenzi.status === 200 && requestProduse.status ===200) {
                   const responseComenzi = await requestComenzi.json();
                   const responseProduse = await requestProduse.json();
                   setProduse(responseProduse);
                   setComenzi(responseComenzi);
                   productsOrdered(responseComenzi, responseProduse);
                   }
        }catch(err){
            console.log(err);
        }};
    dataFetch();
}
    
function productsOrdered(orders, products){
    let ordersMap = []
        orders.forEach((j1) => {
            products.forEach((j2) => {
                if (j1.produseId === j2.id) {
                    setOrdersIds(...j1.id);
                ordersMap.push({ ...j2,...j1 });
                }
            });
        });
            
    setProdOrdered(ordersMap);
    console.log(prodOrdered);
}

  
const handleClickOpen = (id, n) => {
    setNume(n);
    setOrderId(id);
    setOpen(true);
  };
  
  const handleCloseYes = () => {
    deleteOrder(orderId);
    setOpen(false);
  };
  
  const handleCloseNo = () => {
    setOpen(false);
  };
  
  async function deleteOrder(id){
    if (id) {
      const response = await fetch(`http://localhost:3000/comenzi/${id}`, {
            method: 'DELETE'
          });
          if (response.status === 204) {
              notifySuccess();
          }
          else{
            notifyError();
          }
  createProductsOrdered();
    }
  }

    return ( 
        <>
        <div className='provider-content' style={{paddingLeft:20, paddingBottom:20}}>
        
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/comenzi/adaugare`}  startIcon={<AddIcon />}>
        Adaugă comandă nouă 
        </Button >

        </Box>
        <TableContainer component={Paper} sx={{width: '97%'}}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
            <TableCell align="center">Nr. crt</TableCell>
                <TableCell align="center">Nume Client</TableCell>
                <TableCell align="center">Dată și oră ridicare</TableCell>
                <TableCell align="center">Produs</TableCell>
                <TableCell align="center">Pret unitar</TableCell>
                <TableCell align="center">Cantitate</TableCell>
                <TableCell align="center">Valoare totală</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Acțuni</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {prodOrdered && prodOrdered.map((prod) => (

                <TableRow
                key={prod.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center" scope="row">{nr++}</TableCell>
                <TableCell align="center">{prod.nume}</TableCell>
                <TableCell align="center">{Moment(`${prod.dataRidicare}`).format('DD-MM-YYYY HH:mm')}</TableCell>
                <TableCell align="center">{prod.denumire}</TableCell>
                <TableCell align="center">{prod.pret_vanzare} lei</TableCell>
                <TableCell align="center">{prod.cantitate} buc</TableCell>
                <TableCell align="center">{prod.valoare_totala} lei</TableCell>
                <TableCell align="center">{prod.status_comanda}</TableCell>
                <TableCell align="center"> 
                    <Button 
                    onClick={() => {handleClickOpen(prod.id, prod.nume )}} color="error">
                    <Tooltip title="Sterge">
                    <DeleteIcon /></Tooltip>
                    </Button>
                    <Button><Tooltip title="Editeaza">
                    <EditIcon /></Tooltip>
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <ToastContainer/>
        <Dialog
            open={open}
            keepMounted
            onClose={handleCloseNo}
            aria-describedby="alert-dialog" >
            <DialogTitle>{"Doriti stergerea acestui utilizator?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog">
                Aceasta actiune nu poate fi revocata! Doriti stergerea comenzii clientului {nume}?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti comanda</Button>
            <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
            </DialogActions>
        </Dialog>

        </div>
    </>
)}

export default Orders;