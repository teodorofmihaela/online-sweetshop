import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import {   Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText}  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import './Sales.css';




function Sales() {
const [open, setOpen] = React.useState(false);
const [date, setDate] = useState();
const [saleId, setSaleId] = useState();

const [sales, setSales] = useState();
const [products, setProducts] = useState();
const [SalesCateg, setSalesCateg] = useState([]);
const baseURL = "http://localhost:8080";
let nr=1;
let key=1;

const notifySuccess = () => toast.success("Vanzare stearsa cu succes!");
const notifyError = () => toast.error("Vanzarea nu a fost stearsa!");


useEffect(() =>{
  createSales();
},[]);
    
async function createSales(){
  const dataFetch = async () => {
    try {
        let [requestVanzari, requestProduse ]= await Promise.all([
            fetch(`${baseURL}/vanzari`),
            fetch(`${baseURL}/produse`)
            ]);                
        if (requestVanzari.status === 200 && requestProduse.status ===200) {
            const responseVanzari = await requestVanzari.json();
            const responseProduse = await requestProduse.json();
            responseVanzari.sort(custom_sort);
        setSales(responseVanzari);
        setProducts(responseProduse);
        SalesCategory(responseVanzari, responseProduse);
        return responseVanzari, responseProduse, SalesCateg;        
        }
    }catch(err){
        console.log(err);
    }};
dataFetch();
}
    
function custom_sort(a, b) {
    return new Date(a.data) - new Date(b.data);
}

function SalesCategory(sales, products){
    let salesMap = [];
    sales.forEach((j1) => {
      let vanzareId={"vanzareId":j1.id}
        products.forEach((j2) => {
          if (j1.produseId === j2.id) {
            salesMap.push({...j2,...j1,...vanzareId});
          }
        });
      });
    console.log(salesMap);
      setSalesCateg(salesMap);
      console.log(SalesCateg);
    
    }

   
const handleClickOpen = (id, date) => {
  setDate(date);
  setSaleId(id);
  setOpen(true);
};

const handleCloseYes = () => {
  deleteSale(saleId);
  setOpen(false);
};

const handleCloseNo = () => {
  setOpen(false);
};

async function deleteSale(id){
  if (id) {
    console.log(id);
    const response = await fetch(`http://localhost:3000/vanzari/${id}`, {
          method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
        }
        else{
          notifyError();
        }
createSales();
  }
}

    return (   
        <>
        <div className='sales-content' style={{ paddingLeft: 20, paddingBottom:20}}>
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/vanzari/adaugare`}  startIcon={<AddIcon />}>
        Inregistreaza vanzare 
      </Button >

      </Box>
      <TableContainer component={Paper} sx={{width: '97%'}}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Nr. crt</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Cantitate</TableCell>
            <TableCell align="center">Produs</TableCell>
            <TableCell align="center">Pret unitar</TableCell>
            <TableCell align="center">Valoare totala</TableCell>
            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {SalesCateg && SalesCateg.map((sale) => (
            <TableRow
              key={key++}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="center" scope="row">{nr++}</TableCell>
              <TableCell align="center">{Moment(`${sale.data}`).format('HH:mm DD-MM-YYYY')}</TableCell>
              <TableCell align="center">{sale.cantitate_vanduta} buc</TableCell>
              <TableCell align="center">{sale.denumire}</TableCell>
              <TableCell align="center">{sale.pret_vanzare} lei</TableCell>
              <TableCell align="center">{sale.valoare_totala} lei</TableCell>
              <TableCell align="center"> 
                <Button 
                onClick={() => {handleClickOpen(sale.id, sale.data )}} color="error">
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
        <DialogTitle>{"Doriti stergerea acestei vanzari?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog">
            Aceasta actiune nu poate fi revocata! Doriti stergerea vanzarii din data: {Moment(`${date}`).format(' DD/MM/YYYY HH:mm')}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti vanzarea</Button>
          <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
        </DialogActions>
      </Dialog>
        </div>
    </>
)}

export default Sales;