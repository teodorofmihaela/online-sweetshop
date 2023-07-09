import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Tooltip,
  Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Provider.css';




function Personal() {

const [open, setOpen] = React.useState(false);
const [utilizatori, setUtilizatori] = useState();
const [nume, setNume] = useState();
const [prenume, setPrenume] = useState();
const [utilizatorId, setUtilizatorId] = useState();
const baseURL = "http://localhost:8080";
let nr=1;
let nrSelect=1;
const notifySuccess = () => toast.success("Utilizatorul a fost sters cu succes!");
const notifyError = () => toast.success("Utilizatorul nu a fost sters!");

useEffect(() =>{
  const dataFetch = async () => {
    try {
      const res = await fetch(`${baseURL}/utilizatori`);
      if (res.status === 200) {
        const data = await res.json();
        setUtilizatori(data);
        console.log(data);
        return dataFetch;
        }
    }catch(err){
    console.log(err);
  }};
  dataFetch();
},[]);
    
const handleClickOpen = (id, nume, prenume) => {
  setNume(nume);
  setPrenume(prenume);
  setUtilizatorId(id);
  setOpen(true);
};

const handleCloseYes = () => {
  deleteUser(utilizatorId);
  setOpen(false);
};

const handleCloseNo = () => {
  setOpen(false);
};

async function deleteUser(id){
  if (id) {
    const response = await fetch(`http://localhost:3000/utilizatori/${id}`, {
          method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
            alert(`utilizatorul a fost stears!`);
        }
  }
}
return ( 
  <>
  <div className='provider-content' style={{paddingLeft:20}}>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '97%' }}>
        <Button variant="contained" color="success"href = {`/personal/add`} startIcon={<AddIcon />}>Adauga utilizator</Button>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell align="center">Nume</TableCell>
            <TableCell align="center">Prenume</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Drept</TableCell>
            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {utilizatori && utilizatori.map((utilizator) => (
            <TableRow
              key={utilizator.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="center">{utilizator.nume}</TableCell>
              <TableCell align="center">{utilizator.prenume}</TableCell>
              <TableCell align="center">{utilizator.username}</TableCell>
              <TableCell align="center">{utilizator.denumire_drept}</TableCell>
              <TableCell align="center">
                <Button 
                onClick={() => {handleClickOpen(utilizator.id, utilizator.nume, utilizator.prenume)}}
                color="error"><Tooltip title="Sterge">
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


    
      <Dialog
        open={open}
        keepMounted
        onClose={handleCloseNo}
        aria-describedby="alert-dialog"
      >
        <DialogTitle>{"Doriti stergerea acestui utilizator?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog">
            Aceasta actiune nu poate fi revocata! Doriti stergerea utilizatorului {nume} {prenume}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleCloseYes}>Stergeti utilizatorul</Button>
          <Button variant="contained" onClick={handleCloseNo}>Anulare</Button>
        </DialogActions>
      </Dialog> 
  </div>
  </>
)}

export default Personal;