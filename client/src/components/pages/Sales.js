import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Moment from 'moment';

import './Sales.css';




function Sales() {
    const [sales, setSales] = useState();
    const baseURL = "http://localhost:8080";
    let nr=1;




    useEffect(() =>{
        const dataFetch = async () => {
            try {
            const res = await fetch(`${baseURL}/vanzari`);
                if (res.status === 200) {
                const data = await res.json();
                setSales(data);
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);
    
    
    



    return ( 
        <>
        <div className='sales-content'>
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/`}  startIcon={<AddIcon />}>
        Inregistreaza vanzare 
      </Button >
       
      </Box>
      <TableContainer component={Paper} sx={{width: '97%' }}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Nr. crt</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Cantitate</TableCell>
            <TableCell align="right">Produs id</TableCell>
            <TableCell align="right">valoare totala</TableCell>
            <TableCell align="right">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {sales && sales.map((sale) => (
            <TableRow
              key={sale.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{nr++}</TableCell>
              <TableCell align="right">{Moment(`${sale.data}`).format('DD-MM-YYYY HH:mm')}</TableCell>
              <TableCell align="right">{sale.cantitate_vanduta}</TableCell>
              <TableCell align="right">{sale.produsId}</TableCell>
              <TableCell align="right">{sale.valoare_totala}</TableCell>
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

        </div>
    </>
)}

export default Sales;