import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import { FormControl ,Select , MenuItem , InputLabel, Dialog, DialogActions, DialogTitle}  from '@mui/material';
import './Supply.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import _, { map } from 'underscore';
import {   DialogContent, DialogContentText}  from '@mui/material';




function StocProduse() {
    const [achiztii, setAchizitii] = useState();
    const [stoc, setStoc] = useState([]);
    const [produse, setProduse] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [stocProduse, setStocProduse] = useState([]);
    const [produseCofetarie, setProduseCofetarie] = useState([]);
    const [produseCiocolata, setProduseCiocolata] = useState([]);
    const [produseInghetata, setProduseInghetata] = useState([]);
    const [produsePatiserie, setProdusePatiserie] = useState([]);
    const [produseTort, setProduseTort] = useState([]);
    const [produseAllCateg, setProduseAllCateg] = useState([]);
    const [nume, setNume] = useState([]);
    const [id, setId] = useState([]);

    const [open, setOpen] = React.useState(false);

    let nr=1;
    let nrSelect=1;
    const notifySuccess = () => toast.success("Stocul produsului a fost sters cu succes!");
    const notifyErr = () => toast.error("Stocul produsului a fost sters!");

    const baseURL = "http://localhost:8080";

useEffect(() =>{
  createStoc();
},[]);

async function createStoc(){
  const dataFetch = async () => {
    try {
        let [requestProduse, requestStocProduse, requestAchizitii ]= await Promise.all([
            fetch(`${baseURL}/produse`),
            fetch(`${baseURL}/stoc_produs`),
            fetch(`${baseURL}/achizitii`)
            ]);
               if (requestProduse.status === 200 && requestStocProduse.status ===200 && requestAchizitii.status===200) {
               const responseProduse = await requestProduse.json();
               const responseStocProduse = await requestStocProduse.json();
               const responseAchizitii = await requestAchizitii.json();
               setProduse(responseProduse);
               setStocProduse(responseStocProduse);
               setAchizitii(responseAchizitii);
               SupplyIngredients(responseProduse, responseStocProduse);
               }
    }catch(err){
        console.log(err);
    }};
  dataFetch();
}


function SupplyIngredients(ingrediente, furnizori){
  let stocMap = [];
  let stocMapCofetarie = [];
  let stocMapCiocolata = [];
  let stocMapPatiserie = [];
  let stocMapInghetata = [];
  let stocMapTort = [];

  ingrediente.forEach((j1) => {
    furnizori.forEach((j2) => {
      if (j1.id == j2.produseId) {
        stocMap.push({ ...j1,...j2});
      }
    });
  });
  setProduseAllCateg(stocMap);
setStoc(stocMap);
console.log(stoc);

stocMap.forEach((j1) => {
  if (j1.categorie == 'cofetarie') {
    stocMapCofetarie.push({ ...j1});
  }
});
setProduseCofetarie(stocMapCofetarie);
console.log('produse cofetarie: ', produseCofetarie);

stocMap.forEach((j1) => {
  if (j1.categorie == 'ciocolata') {
    stocMapCiocolata.push({ ...j1});
  }
});
setProduseCiocolata(stocMapCiocolata);
console.log('produse ciocloata: ', produseCiocolata);


stocMap.forEach((j1) => {
  if (j1.categorie == 'inghetata') {
    stocMapInghetata.push({ ...j1});
  }
});
setProduseInghetata(stocMapInghetata);
console.log('produse inghetata: ', produseInghetata);


stocMap.forEach((j1) => {
  if (j1.categorie == 'tort') {
    stocMapTort.push({ ...j1});
  }
});
setProduseTort(stocMapTort);
console.log('produse tort: ', produseTort);

stocMap.forEach((j1) => {
  if (j1.categorie == 'patiserie') {
    stocMapPatiserie.push({ ...j1});
  }
});
setProdusePatiserie(stocMapPatiserie);
console.log('produse patiserie: ', produsePatiserie);
}


 
const handleClickOpen = (id,  nume) => {
  setNume(nume);
  setId(id);
  setOpen(true);
};

const handleCloseYes = () => {
  deleteStoc(id);
  setOpen(false);
};

const handleCloseNo = () => {
  setOpen(false);
};

async function deleteStoc(id) {
  if (id) {
  const response = await fetch(`http://localhost:3000/stoc_produs/${id}`, {
          method: 'DELETE'
      });
      if (response.status === 204) {
          notifySuccess();
          createStoc();
          console.log(id);
          setOpen(false);
      }else{
        notifyErr();
      }
}
console.log('eroare; id:', id);
}

const handleChange = (event) => {
  let categ= event.target.value;
  if(categ=='cofetarie')
  setStoc(produseCofetarie);
  if(categ=='patiserie')
  setStoc(produsePatiserie);
  if(categ=='inghetata')
  setStoc(produseInghetata);
  if(categ=='ciocolata')
  setStoc(produseCiocolata);
  if(categ=='tort')
  setStoc(produseTort);
  if(categ=='toate_categ')
  setStoc(produseAllCateg);
};


return ( 
    <>
    <div className='supply-content' style={{paddingLeft:20}}>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '97%' }}>
        <Button variant="contained" color="success"href = {`/laborator`} startIcon={<AddIcon />}>Adauga stoc produs</Button>
    </Box>
    <div style={{paddingBottom:20}}>
      <FormControl style={{minWidth: 220}}>
      <InputLabel >Categorie</InputLabel>
      <Select label="Produsul comandat"  defaultValue="" onChange={handleChange}>
      <MenuItem key={nrSelect++} value='toate_categ'>Toate categoriile</MenuItem>
        <MenuItem key={nrSelect++} value='cofetarie'>Cofetarie</MenuItem>
        <MenuItem key={nrSelect++} value='ciocolata'>Ciocolata</MenuItem>
        <MenuItem key={nrSelect++} value='inghetata'>Inghetata</MenuItem>
        <MenuItem key={nrSelect++} value='patiserie'>Patiserie</MenuItem>
        <MenuItem key={nrSelect++} value='tort'>Tort</MenuItem>

      </Select>
      </FormControl> 
      </div>
     
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell align="center">Produs</TableCell>
            <TableCell align="center">Cantitate totala in stoc</TableCell>
            <TableCell align="center">Cantitate produsa</TableCell>
            <TableCell align="center">Data productie</TableCell>
            <TableCell align="center">Data expirare</TableCell>

            <TableCell align="center">Cantitate minma necesara (zi)</TableCell>
            <TableCell align="center">Categorie</TableCell>
            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stoc && stoc.map((s) => (
            <TableRow
              key={s.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="center">{s.denumire}</TableCell>
              <TableCell align="center">{s.cantitate_produse_stoc}</TableCell>
              <TableCell align="center">{s.cantitate_produse_stoc}</TableCell>
              <TableCell align="center">{Moment(`${s.data_productie}`).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="center">{Moment(`${s.data_productie}`).add(7, 'd').format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell align="center">{s.cantitate_minima_necesara}</TableCell>
              <TableCell align="center">{s.categorie}</TableCell> 
              <TableCell align="center">
                <Button 
onClick={() => { handleClickOpen(s.id, s.denumire)}} color="error"><Tooltip title="Sterge">
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
    <DialogTitle>{"Doriti stergerea acestui stoc de produse?"}</DialogTitle>
    <DialogContent>
      <DialogContentText >
        Aceasta actiune nu poate fi revocata! Doriti stergerea stocului pentru produsul {nume}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti stocul</Button>
      <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
    </DialogActions>
  </Dialog>

    </div>
    </>
)}
 
export default StocProduse;