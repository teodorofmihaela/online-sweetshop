import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Tooltip, Stack, Avatar, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './Products.css';
import ButtonsRetetar from '../ButtonsRetetar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Products() {
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
             href = {`produse/${product.id}`}  startIcon={<VisibilityIcon />}
               size="small">
              Vezi detalii 
            </Button>                  
          </CardActions>
        </Card>
        </div>
        ))}
        </Box>
        </div>
    </>
)}

export default Products;