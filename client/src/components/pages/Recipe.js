import React, {useEffect, useState} from 'react';
import { useParams  } from 'react-router-dom'
import {Card, Button,Typography,Box} from '@mui/material';
import { Dialog ,DialogActions , DialogContent , DialogContentText, DialogTitle}  from '@mui/material';
import './Recipe.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
    boxContainer: {
        height:800,
        backgroundImage: `url(/images/recipeBackground.png)`
    }
};




function Recipe() {

    const [recipe, setRecipe] = useState();
    const [ingredients, setIngredients] = useState();
    const [recipeIngredients, setRecipeIngredients] = useState();
    const [finalRecipe, setFinalRecipe] = useState([]);
    const [ingredientsInRecipeIds, setIngredientsInRecipeIds] = useState([]);
    const [spreadList, setSpreadList] = useState();
    const [recipeName, setRecipeName] = useState();

    const { denumire } = useParams();
    const [open, setOpen] = React.useState(false);

    const baseURL = "http://localhost:8080";
    const notifyError = () => toast.error("Aceast produs nu are o reteta inca, puteti introduce un noua daca doriti!");
    const notifySuccess = () => toast.success("Reteta produsului a fost stearsa cu succes!");

    

useEffect(() =>{
    const dataFetch = async () => {
        try {
        const res = await fetch(`${baseURL}/retetar/denumire/${denumire}`);
        let [requestRecipe, requestRecipeIngredients, requestIngredients ]= await Promise.all([
            fetch(`${baseURL}/retetar/denumire/${denumire}`),
            fetch(`${baseURL}/ingrediente_in_retete`),
            fetch(`${baseURL}/ingrediente`)
            ]);
            if (requestRecipe.status === 200 && requestRecipeIngredients.status === 200 && requestIngredients.status === 200 ) {
            const responseRecipe = await requestRecipe.json();
            const responseIngredients = await requestIngredients.json();
            const responseRecipeIngredients = await requestRecipeIngredients.json();
            setRecipe(responseRecipe);
            setIngredients(responseIngredients);
            setRecipeIngredients(responseRecipeIngredients);
            RecipesIngredients(responseRecipe,responseIngredients, responseRecipeIngredients);
            return responseIngredients, responseRecipe, responseRecipeIngredients;
            }

        }catch(err){
            console.log(err);
        }};
    dataFetch();
},[]);



function RecipesIngredients(rec, ingr,ingredientRecipeMap){
    let n=0;
    let lista=[];
    let listIds=[];
      ingredientRecipeMap.forEach((ingredientInReteta) => {
        if(ingredientInReteta.retetarId== rec[0].id){
            listIds.push(ingredientInReteta.id);
        ingr.forEach((ingrediedients) => {
      if (ingredientInReteta.ingredienteId == ingrediedients.id) { 

            lista.push({
                "nume": `${ingrediedients.nume}`,
                "unitate_de_masura":`${ingrediedients.unitate_masura}`,
                "cantitate": `${ingredientInReteta.cantitate_ingredient}`                
            })
          }
          });
        }
      });
      setIngredientsInRecipeIds(listIds);
      console.log(ingredientsInRecipeIds);
    setFinalRecipe(lista);
    setRecipeName(rec.denumire)
    setRecipe(rec)
}

   
const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


async function deleteIngredientsInRecipes(id){
    await Promise.all(ingredientsInRecipeIds.map(async (ids) => {
        const responseIngredientsInRecipe = await fetch(`http://localhost:3000/ingrediente_in_retete/${ids}`, {
            method: 'DELETE'
    })
    if (responseIngredientsInRecipe.status === 204) {
        deleteRecipe(id);
        console.log("Success delete ingredients!");
    
    }
      }));
}


async function deleteRecipe(id) {
    if (id) {
            // navigate('/retetar');
    const response = await fetch(`http://localhost:3000/retetar/${id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
            console.log(id);
            setOpen(false);
        }
}
}


    return ( 
        <>
        <div className='description-content' style={styles.boxContainer} >
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop:2, paddingBottom:5, minWidth: 300, width: '100%' }}>
        <Button  variant="contained" color="success" href = {`http://localhost:3000/retetar/add`}  startIcon={<AddIcon />}>
        Adauga reteta 
      </Button >
        <Button  variant="contained" color="error" onClick={openDialog} startIcon={<DeleteIcon />}>
        Sterge aceasta reteta!
      </Button >
      
      </Box>
            <Box   sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 300, width: '100%' }}>
            {recipe && recipe.map((rec) => (
            <div>
                <Typography  className='box' variant="h3" color="#9500ae">
                
                {rec.denumire}
                </Typography>
                <Typography sx={{paddingTop:5}}className='box' variant="h5" color="#0d47a1">
                    Valori nutritionale: { rec.valori_nutritionale}
                </Typography>
                <Typography sx={{paddingTop:5}}className='box' variant="h5" color="#0d47a1">
                     Numar de produse rezultate: { rec.numar_produse}
                </Typography>
                <Typography sx={{paddingTop:5}}className='box-text' variant="h5" color="#0d47a1">
                     Metoda de preparare: 
                     <div sx={{paddingTop:5}}>{rec.mod_preparare}</div>
                </Typography>
                </div>
                ))}
                <Typography className='box-text' variant="h5" color="#0d47a1">
                     Ingrediente: 
                     {/* {nameList && nameList.map((l)=>(
                        <div>{l.nume} - {l.cantitate_ingredient} {l.unitate_masura} </div>
                     ))} */}
                             {finalRecipe && finalRecipe.map((rec) => (

                     <span>  {rec.nume}({rec.cantitate} {rec.unitate_de_masura}), </span>
                     ))}
                </Typography>

                <ToastContainer/>
                {recipe && recipe.map((rec) => (

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                    {"Doriti stergerea acestei retete? "}
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Aceasta actiune nu poate fi revocata! Doriti stergerea retetei {rec.denumire}?
                    </DialogContentText>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>NU</Button>
                        <Button onClick={() => {deleteIngredientsInRecipes(rec.id)}} autoFocus>DA</Button>
                    </DialogActions>
                </Dialog>
                ))}

            </Box>
      
        
        </div>
        </>
    )
}

export default Recipe;