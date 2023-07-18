import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import { FormControl ,Select , MenuItem , InputLabel}  from '@mui/material';
import {   Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText}  from '@mui/material';
import './Supply.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import ClearIcon from '@mui/icons-material/Clear';




function Achizitii() {
    const [ingrediente, setIngrediente] = useState([]);
    const [furnizori, setFurnizori] = useState();
    const [ingredienteFurnizori, setIngredienteFurnizori] = useState();
    const [ingrediente1, setIngrediente1] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [ingr, setIngr] = useState([]);
    const [furnizor, setFurnizor] = useState([]);
    const [idSelected, setIdSelected] = useState([]);

    const baseURL = "http://localhost:8080";
    let nr=1;
    let nrSelect=1;
    const notifySuccess = () => toast.success("Achizitie stersa cu succes!");
    const notifyError = () => toast.error("Achizitia nu a fost stersa!");

    
useEffect(() =>{
    createAchizitii();
},[]);

async function createAchizitii(){
  const dataFetch = async () => {
    try {
        let [requestIngrediente, requestFurnizori, requestIngFurnizori ]= await Promise.all([
            fetch(`${baseURL}/ingrediente`),
            fetch(`${baseURL}/furnizori`),
            fetch(`${baseURL}/achizitii`)
            ]);
               if (requestIngrediente.status === 200 && requestFurnizori.status ===200 && requestIngFurnizori.status===200) {
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
}

function SupplyIngredients(ingrediente, furnizori, ingFurniz){
  let ingrMap = [];
  let furnizMap = [];

  ingFurniz.forEach((j1) => {
    let achiziteId={"achiziteId":j1.id}
    ingrediente.forEach((j2) => {
      if (j1.ingredienteId == j2.id) {
        ingrMap.push({ ...j1,...j2,...achiziteId});
          }
          });
      });
  
      ingrMap.forEach((j1) => {
        furnizori.forEach((j2) => {
      if (j1.furnizoriId == j2.id) {
        furnizMap.push({ ...j1,...j2 });
          }
          });
      });
      console.log(furnizMap); 

      setIngrediente1(furnizMap);
      console.log(ingrediente1);
}


  
const handleClickOpen = (id, ing, furnizor) => {
  setIdSelected(id);
  setIngr(ing);
  setFurnizor(furnizor);
  setOpen(true);
};

const handleCloseYes = () => {
  deleteAchizite(idSelected);
  setOpen(false);
};

const handleCloseNo = () => {
  setOpen(false);
};

async function deleteAchizite(id){
  if (id) {
    const response = await fetch(`http://localhost:3000/achizitii/${id}`, {
          method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
        }
        else{
          notifyError();
        }
  createAchizitii();
  }
}


return (  
    <>
    <div className='supply-content' style={{paddingLeft:20, paddingBottom:20}}>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '97%' }}>
        <Button variant="contained" color="success" href = {`/furnizori/add/ingredient`} startIcon={<AddIcon />}>Adauga furnizor pentru ingredient</Button>
        <Button variant="contained" color="success" href = {`/achizitii/add`} startIcon={<AddIcon />}>Achizitie noua</Button>
                                                                             
    </Box>
    {/* <div style={{paddingBottom:20}}>
      <FormControl style={{minWidth: 220}}>
      <InputLabel >Furnizor</InputLabel>
      <Select label="Produsul comandat"
        defaultValue="">
                    {furnizori && furnizori.map((furnizor, i) => (

        <MenuItem key={nrSelect++} value={furnizor.nume_furnizor}>{furnizor.nume_furnizor}</MenuItem>
                    ))}
      </Select>
      </FormControl>
      </div> */}
     
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell align="center">Ingredient</TableCell>
            <TableCell align="center">Lot</TableCell>
            <TableCell align="center">Data receptie</TableCell>
            <TableCell align="center">Cantitate achizitionata</TableCell>

            <TableCell align="center">Unitate de masura</TableCell>
            <TableCell align="center">Pret&nbsp;(lei)</TableCell>
            <TableCell align="center">Furnizor</TableCell>
            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingrediente1 && ingrediente1.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="center">{ingredient.nume}</TableCell>
              <TableCell align="center">{ingredient.lot}</TableCell>
              <TableCell align="center">{Moment(`${ingredient.data_achizite}`).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="center">{ingredient.cantitate}</TableCell>

              <TableCell align="center">{ingredient.unitate_masura}</TableCell>
              <TableCell align="center">{ingredient.pret_total}</TableCell> 
              <TableCell align="center">{ingredient.nume_furnizor}</TableCell> 
              <TableCell align="center">
                <Button 
                onClick={() => {handleClickOpen(ingredient.achiziteId, ingredient.nume, ingredient.nume_furnizor )}} color="error">
                <Tooltip title="Sterge">
                  <DeleteIcon /></Tooltip>
                </Button>
                {/* <Button><Tooltip title="Editeaza">
                  <EditIcon /></Tooltip>
                </Button> */}
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
    <DialogTitle>{"Doriti stergerea acestei achizitii?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog">
        Aceasta actiune nu poate fi revocata! Doriti stergerea achizitei de {ingr} de la furnizorul {furnizor}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti achizitia</Button>
      <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
    </DialogActions>
  </Dialog>

    </div>
    </>
)}

export default Achizitii;