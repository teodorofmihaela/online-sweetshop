import React, {useEffect, useState} from 'react';
import { useParams  } from 'react-router-dom'
import './Retetar.css';
import {Card, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';
import './Recipe.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Recipe= (props) =>{

    const [recipe, setRecipe] = useState();
    const { denumire } = useParams();

const baseURL = "http://localhost:8080";
const notifyError = () => toast.success("Aceast produs nu are o reteta inca, puteti introduce un noua daca doriti!");


useEffect(() =>{
    const dataFetch = async () => {
        try {
        const res = await fetch(`${baseURL}/retetar/denumire/${denumire}`);
            if (res.status === 200) {
            const data = await res.json();
            setRecipe(data);
            }else{
            console.log("Request not ok, status: "+res.status);
                notifyError();
                setRecipe({denumire: 'Aceasta reteta nu a fost regasita in baza de date!',
                mod_preparare:'a',
                valori_nutritionale:'a',
                numar_produse:'a'
            });
            console.log('recipe:'+recipe);
            }

        }catch(err){
            console.log(err);
        }};
    dataFetch();
},[]);


    return ( 
        <>
        <div className='description-content'>
        {recipe && recipe.map((rec) => (
            <Card  className='products' >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Avatar alt={rec.denumire} src="`url(${image.url})`" />
                    {rec.denumire} {rec.mod_preparare}, {rec.valori_nutritionale} {rec.numar_produse}
                </Typography>
            </CardContent>
            </Card>
        ))}
        </div>
        </>
    )
}

export default Recipe;