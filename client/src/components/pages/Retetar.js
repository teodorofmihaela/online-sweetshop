import React, {useState} from 'react';
import './Retetar.css';
import {Button} from '@material-ui/core';
import {Card, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';
import ButtonsRetetar from "../ButtonsRetetar";
import AddIcon from '@mui/icons-material/Add';

//poate sa dispara-> pt avatar?????????????????????????????????????
const images = [{
    url: '/images/ciocolata.jpeg',
    title: 'Ciocolata',
    width: '20%',
  },
  {
    url: '/images/cofetarie.jpeg',
    title: 'Cofetarie',
    width: '20%',
  },
  {
    url: '/images/inghetata.jpeg',
    title: 'Inghetata',
    width: '20%',
  },
  {
    url: '/images/patiserie.png',
    title: 'Patiserie',
    width: '20%',
  },
  {
    url: '/images/torturi.jpeg',
    title: 'Torturi',
    width: '20%',
  },
];


function Retetar() {

  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const baseURL = "http://localhost:8080";

  async function handleClick(category) {
    setCategory(category);
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


  // async function clickVeziReteta(denumire){
  //   try {
  //   console.log(denumire);
  //   const res = await fetch(`http://localhost:8080/retetar/denumire/${denumire}`);
  //   console.log(`${baseURL}/retetar/denumire/${denumire}`);
  //   if (res.status === 200) {
  //     const data = await res.json();
  //     setRecipes(data);
  //     console.log(recipes);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // };


  return ( 
    <>

    <div className = 'container-retetar' >
      <ButtonsRetetar className = "buttons" handleClick = { handleClick}/> 
    {/* <div className='add-button'> */}
    <Box className='add-button' sx={{ display: 'flex', flexWrap: 'wrap', gap: 5,  minWidth: 300, width: '80%' }}>
      <Button  variant="contained" color="primary" href = {`retetar/add`} startIcon={<AddIcon />}>
        Adauga reteta  
      </Button >
      <Button  variant="contained" color='secondary' href = {`/produs/adaugare`}  startIcon={<AddIcon />}>
        Adauga produs 
      </Button >
      </Box>
    <Box className = 'lista-retete' sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, minWidth: 300, width: '80%' }}>
    {products.map((product) => (
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
          </CardActions>
      </Card>
            ))}
        </Box>
        </div>

    </>
  )
}

export default Retetar;