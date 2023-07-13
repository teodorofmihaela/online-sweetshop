import React, {useEffect, useState} from 'react';
import {Card, CardContent,CardActions,Typography} from '@mui/material';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import {   Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText}  from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import './Provider.css';




function Provider() {

const [isEdit, setEdit] = React.useState(false);
const [ingrediente, setIngrediente] = useState([]);
const [ingredienteFurnizori, setIngredienteFurnizori] = useState();
const [ingrediente1, setIngrediente1] = useState([]);
const [open, setOpen] = React.useState(false);
const [furnizori, setFurnizori] = useState();
const [nume, setNume] = useState();
const [furnizorId, setFurnizorId] = useState();

const baseURL = "http://localhost:8080";
let nr=1;
let nrSelect=1;
const notifySuccess = () => toast.success("Furnizor sters cu succes!");
const notifyError = () => toast.error("Furnizorul nu a fost sters!");


    useEffect(() =>{
        createProviders();
    },[]);
    
async function createProviders(){
  const dataFetch = async () => {
    try {
    const res = await fetch(`${baseURL}/furnizori`);
        if (res.status === 200) {
        const data = await res.json();
        setFurnizori(data);
        console.log(data);
        return dataFetch;
        }
    }catch(err){
        console.log(err);
    }};
dataFetch();
}

   
const handleClickOpen = (id, nume) => {
  setNume(nume);
  setFurnizorId(id);
  setOpen(true);
};

const handleCloseYes = () => {
  deleteProvider(furnizorId);
  setOpen(false);
};

const handleCloseNo = () => {
  setOpen(false);
};

async function deleteProvider(id){
  if (id) {
    const response = await fetch(`http://localhost:3000/furnizori/${id}`, {
          method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
        }
        else{
          notifyError();
        }
createProviders();
  }
}



    return ( 
        <>
        <div className='provider-content' style={{paddingLeft:20, paddingBottom:20}}>
      <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '97%' }}>
          <Button variant="contained" color="success"href = {`/furnizori/add`} startIcon={<AddIcon />}>Adauga furnizor</Button>
      </Box>
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell align="center">Furnizor</TableCell>
            <TableCell align="center">Adresa</TableCell>
            <TableCell align="center">Persoana contact</TableCell>
            <TableCell align="center">Telefon</TableCell>

            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {furnizori && furnizori.map((furnizor) => (
            <TableRow
              key={furnizor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="center">{furnizor.nume_furnizor}</TableCell>
              <TableCell align="center">{furnizor.adresa}</TableCell>
              <TableCell align="center">{furnizor.persoana_contact}</TableCell>
              <TableCell align="center">{furnizor.telefon}</TableCell>
              <TableCell align="center">
              <Button color="success" href={`/furnizori/add/ingredient`}><Tooltip title="Adauga ingredient pentru acest furnizor">
                  <AddIcon /></Tooltip>
                </Button>
                <Button 
                onClick={() => {handleClickOpen(furnizor.id, furnizor.nume_furnizor )}} color="error">
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
        <DialogTitle>{"Doriti stergerea acestui furnizor?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog">
            Aceasta actiune nu poate fi revocata! Doriti stergerea furnizorului {nume}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti furnizorul</Button>
          <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
)}

export default Provider;