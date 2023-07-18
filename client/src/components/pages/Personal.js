import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Tooltip,
  Dialog,DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Provider.css';




function Personal() {

const [isEdit, setEdit] = React.useState(false);
const [disable, setDisable] = React.useState(true);
const [open, setOpen] = React.useState(false);
const [utilizatori, setUtilizatori] = useState();
const [nume, setNume] = useState();
const [prenume, setPrenume] = useState();
const [utilizatorId, setUtilizatorId] = useState();
const [nameSelected, setNameSelected] = useState();
const [firstNameSelected, setFirstNameSelected] = useState();
const [usernameSelected, setUsernameSelected] = useState();
const [rightSelected, setRightSelected] = useState();
const [userIdSelected, setUserIdSelected] = useState();
const [nrCrtSelected, setNrCrtSelected] = useState();
const [selected, setSelected] = useState();
const [usersFormDB, setUsersFormDB] = useState();

const baseURL = "http://localhost:8080";
let nr=1;
let nrSelect=1;
const notifySuccess = () => toast.success("Utilizatorul a fost sters cu succes!");
const notifyError = () => toast.success("Utilizatorul nu a fost sters!");
const notifySuccessEdit = () => toast.success("Utilizatorul a fost modificat cu succes!");
const notifyErrorEdit = () => toast.error("Utilizatorul nu a fost modificat!");
const rights = {1:'Administrator', 2:' Bucatar', 3:'Vanzator', 4:'Client'};
const rightsMap = Object.entries(rights);

useEffect(() =>{
  createUtilizatori();
},[]);

async function createUtilizatori(){
  const dataFetch = async () => {
    try {
      const res = await fetch(`${baseURL}/utilizatori`);
      if (res.status === 200) {
        const data = await res.json();
        setUtilizatori(data);
        setUsersFormDB(data);
        console.log(data);
        return dataFetch;
        }
    }catch(err){
    console.log(err);
  }};
  dataFetch();
}
    
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
        }else{
          notifyError();
        }
createUtilizatori();
  }
}



async function editUser(id){
  if (id) {
    const response = await fetch(`http://localhost:3000/utilizatori/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },body: JSON.stringify({
          "id": id,
          "username": usernameSelected,
          "nume": nameSelected,
          'prenume': firstNameSelected,
          'cod_drept': rightSelected,
          'denumire_drept': rights[rightSelected]
      })
        });
        if (response.status === 204) {
            setEdit(false);
            notifySuccessEdit();
        }else{
          notifyErrorEdit();
        }
createUtilizatori();
  }
}

function handleEditClick(id, nume, prenume) {
  setNameSelected(nume);

  let usersMap =[];
  let isSelected={"selected":"true"}
  utilizatori.forEach((u) =>{
    if(u.id==userIdSelected)
    {
      usersMap.push({...u, ...isSelected});
    }
    else
    {
    usersMap.push({...u,});
    }
    setUtilizatori(usersMap);
    console.log(utilizatori);

  })
};

const onChangeInput = (e, idUser) => {
  const { nume } = e.target
}

return ( 
  <>
  <div className='provider-content' style={{paddingLeft:20, paddingBottom:20}}>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '97%' }}>
        <Button variant="contained" color="success" href = {`/personal/add`} startIcon={<AddIcon />}>Adauga utilizator</Button>
        { isEdit?
        <Button variant="contained" color="success" startIcon={<SaveIcon />}>Salveaza moficarile</Button> :
        <div></div>}
    </Box>
    <TableContainer component={Paper} >
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
        {isEdit ? (
          <div>
          {utilizatori && utilizatori.map(({ id, nume, prenume, username, denumire_drept, selected }) => (
            <TableBody>
            {(selected) ? (
          <TableRow key={id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{nr++}</TableCell>            
              <TableCell align="center">
              <TextField  value={nameSelected} label='Nume' onChange={setNameSelected(nameSelected)}/>
              </TableCell>
              <TableCell align="center">
              <TextField value={prenume} label='Prenume'/>
              </TableCell>
              <TableCell align="center">
              <TextField value={username} label='Username'/>
              </TableCell>
              <TableCell align="center">
              <FormControl style={{minWidth: 220}}>
              <InputLabel >Drept</InputLabel>
              <Select label="Drept"
                defaultValue="">
                            {rightsMap && rightsMap.map( ([key, val] ) => (

                <MenuItem key={nrSelect++} value={val}
                onChange={setRightSelected(val)}>{val}</MenuItem>
                            ))}
              </Select>
              </FormControl>
              </TableCell>
            <TableCell align="center">
                <Button onClick={()=>{ setEdit(false)}}
                color="error"><Tooltip title="Anuleaza">
                  <CancelIcon /></Tooltip>
                </Button>
                <Button ><Tooltip title="Salveaza">
                  <SaveIcon /></Tooltip>
                </Button>
              </TableCell>
          </TableRow>
          ):
          <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="center">{nume}</TableCell>
              <TableCell align="center">{prenume}</TableCell>
              <TableCell align="center">{username}</TableCell>
              <TableCell align="center">{denumire_drept}</TableCell>
              <TableCell align="center">
                <Button onClick={()=>{ 
                  setEdit(false);
                  setUtilizatori(usersFormDB);}}
                color="error"><Tooltip title="Anuleaza">
                  <CancelIcon /></Tooltip>
                </Button>
                <Button ><Tooltip title="Salveaza">
                  <SaveIcon /></Tooltip>
                </Button>
              </TableCell>
            </TableRow>
          }         
          </TableBody>

          ))}
          </div>
        ):(
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
                {/* <Button onClick={() => {
                    setEdit(true);
                    setSelected(true);
                    setUserIdSelected(utilizator.id);
                    setNameSelected(utilizator.nume);
                    handleEditClick(utilizator.id, utilizator.nume, utilizator.prenume)}}>
                  <Tooltip title="Editeaza">
                  <EditIcon /></Tooltip>
                </Button> */} 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        )}
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