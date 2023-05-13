import React, {useState} from 'react';
import './Retetar.css';
import {Button} from '@material-ui/core';
import {Card, CardContent,CardActions,Typography,Stack,Avatar} from '@mui/material';
import ButtonsRetetar from "../ButtonsRetetar";

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


  async function clickVeziReteta(idProduct){
    try {
    console.log(idProduct);
    const res = await fetch(`http://localhost:8080/retetar/produseId/${idProduct}`);
    console.log(`${baseURL}/retetar/produseId/${idProduct}`);
    if (res.status === 200) {
      const data = await res.json();
    }
  } catch (err) {
    console.log(err);
  }
  };


  return ( 
    <>

    <div className = 'container-retetar' >
      <ButtonsRetetar className = "buttons" handleClick = { handleClick}/> 
    <div className = 'add-button'>
      <Button  >
        < a id = "adaugareReteta" href = {`retetar/add`} > Adauga reteta + </a>
      </Button >
    </div>
    <Stack className = 'lista-retete' direction = "row" spacing = {2} >

    {products.map((product) => (
      <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            <Avatar alt={product.denumire} src="`url(${image.url})`" />
            {product.denumire}
            </Typography>
        </CardContent>
          <CardActions>
            <Button onClick={event => clickVeziReteta(product.id)} size="small">Vezi reteta</Button>
          </CardActions>
      </Card>
            ))}
        </Stack> 
        </div>

    </>
  )
}

export default Retetar;