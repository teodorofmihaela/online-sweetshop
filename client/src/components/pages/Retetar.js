import React,{useState} from 'react';
import './Retetar.css';
import {Button} from '@material-ui/core';
import {Card, CardContent, CardActions, Typography, Stack, Avatar} from '@mui/material';
import  ButtonsRetetar  from "../ButtonsRetetar";

//poate sa dispara-> pt avatar?????????????????????????????????????
const images = [
  {
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


function Retetar(){

  const [category, setCategory] = useState();
  const [recipes, setRecipes] = useState([]);

  async function handleClick(category){
    setCategory(category);
    try{
      const baseURL = "http://localhost:8080";
      console.log(category);
      // const res = await fetch (`${baseURL}/produse/categorie`
    //   ,{
    //   method: 'GET',
    //   headers: {
    //     'categorie': `${category}`,
    //   },
    // }    );

    const res = await fetch(`http://localhost:8080/produse/?categorie=${category}`);

      console.log(`${baseURL}/produse/${category}`);        
      if(res.status === 200){
          const data = await res.json();
          setRecipes(data);
          console.log(data);
      }
    }catch(err){
      console.log(err);
    }
  };



    return (
      <>

        <div className='container-retetar'>
          <ButtonsRetetar className="buttons" handleClick={handleClick}/>
          <Button className='button'><a  id="adaugareReteta" className="add-btn" href={`#/retetar`}>  Adauga reteta+</a></Button>

          <Stack className='lista-retete' direction="row" spacing={2}>


            {recipes.map((recipe) => (
              <Card sx={{ maxWidth: 345 }}>
            <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <Avatar alt={recipe.denumire} src="`url(${image.url})`" />
          {recipe.denumire}
           </Typography>
          </CardContent>
          <CardActions>
        <Button size="small">Vezi reteta</Button>
        </CardActions>
              </Card>
            ))}
          </Stack>
        </div>

      </>
    )
  }
  
  export default Retetar;
  