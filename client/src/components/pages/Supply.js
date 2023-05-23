import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import { Dialog ,DialogActions , DialogContent , DialogContentText, DialogTitle}  from '@mui/material';
import './Supply.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function Supply() {
    const [ingredients, setIngredients] = useState();
    const [open, setOpen] = React.useState(false);

    const baseURL = "http://localhost:8080";
    let nr=1;
    const notifySuccess = () => toast.success("Reteta produsului a fost stearsa cu succes!");

    
useEffect(() =>{
    const dataFetch = async () => {
        try {
        const res = await fetch(`${baseURL}/ingrediente`);
            if (res.status === 200) {
            const data = await res.json();
            setIngredients(data);
            }

        }catch(err){
            console.log(err);
        }};
    dataFetch();
},[]);


// const openDialog = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

async function deleteRecipe(id) {
  if (id) {
  const response = await fetch(`http://localhost:3000/produse/${id}`, {
          method: 'DELETE'
      });
      if (response.status === 204) {
          notifySuccess();
          alert(`produsul a fost stears!`);
          console.log(id);
          setOpen(false);
          console.log("Success!");

      }
}
}

return ( 
    <>
    <div className='supply-content'>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:4 , paddingTop:2, paddingBottom:5, minWidth: 300, width: '100%' }}>
        <Button variant="contained"  href = {`/furnizori`} startIcon={<StorefrontIcon />}>Furnizori</Button>
        <Button variant="contained" href = {`/produse`} startIcon={<ShoppingBasketIcon />}>Produse</Button>
        <Button variant="contained" color="success"href = {`/`} startIcon={<AddIcon />}>Adauga ingredient</Button>

    </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Cantitate in stoc</TableCell>
            <TableCell align="right">Unitate de masura</TableCell>
            <TableCell align="right">Pret&nbsp;(lei)</TableCell>
            <TableCell align="right">Furnizori</TableCell>
            <TableCell align="right">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients && ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="right">{ingredient.nume}</TableCell>
              <TableCell align="right">{ingredient.cantitate_stoc}</TableCell>
              <TableCell align="right">{ingredient.unitate_masura}</TableCell>
              <TableCell align="right">{ingredient.pret}</TableCell>
              <TableCell align="right">{ingredient.pret}</TableCell>
              <TableCell align="right">
                <Button 
                // onClick={openDialog(ingredient)} 
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


{/* 
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" key={Math.random()}>
                    <DialogTitle id="alert-dialog-title">
                    {"Esti sigur ca vrei sa stergi acest produs? Aceasta actiune nu poate fi revocata!"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>NU</Button>
                        <Button onClick={'/'} autoFocus>DA</Button>
                    </DialogActions>
                </Dialog> */}

    </div>
    </>
)}

export default Supply;