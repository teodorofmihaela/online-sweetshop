import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,  } from '@mui/material';
import './Supply.css';
import StorefrontIcon from '@mui/icons-material/Storefront';





function Supply() {
    const [ingredients, setIngredients] = useState();
    const baseURL = "http://localhost:8080";


    
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




    function createData(Ingredient, Cantitate, Unitate, Pret, Furnizori) {
        return { Ingredient, Cantitate, Unitate, Pret, Furnizori };
      }
      
      const rows = [
        createData('Oua', 159, 'buc', 0.2, 'Sc Furnizor'),
        createData('Ciocolata decor', 2000, 'g', 1, 'Sc Furnizor'),
        createData('Choux', 262, 'g', 24, 'Sc Furnizor'),
        createData('Lapte', 305, 'L', 67,'Sc Furnizor'),
        createData('Cacao', 356, 'g', 49, 'Sc Furnizor'),
      ];


return ( 
    <>
    <div className='supply-content'>
    <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop:2, paddingBottom:5, minWidth: 300, width: '100%' }}>
        <Button variant="contained" href = {`/`} startIcon={<StorefrontIcon />}>Furnizori</Button>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients && ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{ingredient.nume}</TableCell>
              <TableCell align="right">{ingredient.nume}</TableCell>
              <TableCell align="right">{ingredient.cantitate_stoc}</TableCell>
              <TableCell align="right">{ingredient.unitate_masura}</TableCell>
              <TableCell align="right">{ingredient.pret}</TableCell>
              <TableCell align="right">{ingredient.pret}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
    </>
)}

export default Supply;