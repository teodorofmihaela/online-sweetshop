import React, {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,Tooltip   } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PieChartIcon from '@mui/icons-material/PieChart';
import Moment from 'moment';
import './Sales.css';




function Sales() {
    const [sales, setSales] = useState();
    const [products, setProducts] = useState();
    const [SalesCateg, setSalesCateg] = useState([]);
    const baseURL = "http://localhost:8080";
    // let SalesCateg = [];
    let nr=1;
 



    useEffect(() =>{
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
    },[]);
    
    
function custom_sort(a, b) {
    return new Date(a.data) - new Date(b.data);
}

function SalesCategory(sales, products){
    let salesMap = []
    sales.forEach((j1) => {
        products.forEach((j2) => {
          if (j1.produseId === j2.id) {
            salesMap.push({ ...j1,...j2 });
          }
        });
      });
    
      setSalesCateg(salesMap);
    
      console.log(SalesCateg);
    
    }


    return (   
        <>
        <div className='sales-content' style={{ paddingLeft: 20}}>
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/`}  startIcon={<AddIcon />}>
        Inregistreaza vanzare 
      </Button >
      <Button variant="contained"  href = {`/furnizori`} startIcon={<ShoppingCartIcon />}>Achizitii</Button>
      <Button variant="contained"  href = {`/statiustici`} startIcon={<PieChartIcon />}>Vezi Statistici</Button>

      </Box>
      <TableContainer component={Paper} sx={{width: '97%'}}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Nr. crt</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Cantitate</TableCell>
            <TableCell align="center">Produs</TableCell>
            <TableCell align="center">Pret</TableCell>
            <TableCell align="center">Valoare totala</TableCell>
            <TableCell align="center">Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {SalesCateg && SalesCateg.map((sale) => (
            <TableRow
              key={sale.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="center" scope="row">{nr++}</TableCell>
              <TableCell align="center">{Moment(`${sale.data}`).format('HH:mm DD-MM-YYYY')}</TableCell>
              <TableCell align="center">{sale.cantitate_vanduta}</TableCell>
              <TableCell align="center">{sale.denumire}</TableCell>
              <TableCell align="center">{sale.pret_vanzare}</TableCell>
              <TableCell align="center">{sale.valoare_totala}</TableCell>
              <TableCell align="center"> 
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