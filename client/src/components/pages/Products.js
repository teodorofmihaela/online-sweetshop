import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './Products.css';




function Products() {
    const [products, setProducts] = useState();
    const baseURL = "http://localhost:8080";

    useEffect(() =>{
        const dataFetch = async () => {
            try {
            const res = await fetch(`${baseURL}/produse`);
                if (res.status === 200) {
                const data = await res.json();
                setProducts(data);
                
                }
    
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);
    
    
    



    return ( 
        <>
        <div className='products-content' >
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5,paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '100%' }}>
        <Button  variant="contained" color="success" href = {`/`}  startIcon={<AddIcon />}>
        Adauga produs 
      </Button >
       
      </Box>
      <Box className = 'lista-retete' sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, minWidth: 300, width: '80%' }}>

        {products && products.map((product) => (
            <div key={product.id}>
                <Card sx={{ maxWidth: 345 }} className='products' >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            <Avatar alt={product.denumire} src="`url(${image.url})`" />
            {product.denumire}
            </Typography>
        </CardContent>
          <CardActions>
            <Button variant="contained" color="primary"
             href = {`retetar/${product.denumire}`} 
              //  onClick={event => veziRetetaClick(product.denumire)} 
               size="small">
                
              Vezi reteta 
            </Button>

            <Button  variant="contained" color="error" onClick={'/'} startIcon={<DeleteIcon />}>
        Sterge acest produs!
      </Button >
      <Button  variant="contained" color="primary" href = {`/`} startIcon={<EditIcon />}>
        Editeaza acest produs 
      </Button >
          </CardActions>
      </Card>
            </div>
        ))}
        </Box>
        </div>
    </>
)}

export default Products;