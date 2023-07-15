import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Tooltip, Stack, Avatar, Box} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonsRetetar from '../ButtonsRetetar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClientNavbar from './ClientNavbar.js';


function ProductsClient() {
    const [products, setProducts] = useState();
    const baseURL = "http://localhost:8080";
    
async function handleClick(category) {
    try {
      
      let categ=category.toLowerCase();
      const res = await fetch(`${baseURL}/produse/categorie/${categ}`);
      if (res.status === 200) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
};    



    return ( 
        <>
        <div className='products-content' >
        <ClientNavbar/>
        <ButtonsRetetar className = "buttons" handleClick = { handleClick}/> 

      <Box className = 'lista-retete' sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, minWidth: 300, paddingBottom: 4, width: '80%' }}>
        {products && products.map((product) => (
            <div key={product.id}>
                <Card sx={{ minWidth: 345 }} className='products' >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {product.denumire} 
            </Typography>
            <div>
                <Typography>
                    {product.pret_vanzare} lei
                </Typography>
            </div>
        </CardContent>
          <CardActions>
            <Button variant="contained" color="primary"
             href = {`produse/client/${product.id}`}  startIcon={<VisibilityIcon />}
               size="small">
              Vezi detalii 
            </Button>
            <Button 
                color="success"><Tooltip title="Adauga in cos">
                  <AddShoppingCartIcon /></Tooltip> </Button>
                  
          </CardActions>
      </Card>
            </div>
        ))}
        </Box>
        </div>
    </>
)}

export default ProductsClient;