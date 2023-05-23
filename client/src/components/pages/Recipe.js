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
    const { denumire } = useParams();
    const [open, setOpen] = React.useState(false);

    const baseURL = "http://localhost:8080";
    const notifyError = () => toast.error("Aceast produs nu are o reteta inca, puteti introduce un noua daca doriti!");
    const notifySuccess = () => toast.success("Reteta produsului a fost stearsa cu succes!");

    

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
                setRecipe(recipe=>({"denumire": 'Aceasta reteta nu a fost regasita in baza de date!',
                "mod_preparare":'a',
                "valori_nutritionale":'a',
                "numar_produse":'a'
            }));
            console.log('recipe:'+recipe);
            }

        }catch(err){
            console.log(err);
        }};
    dataFetch();
},[]);


const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


async function deleteRecipe(id) {
    if (id) {
    //         navigate('/');
    const response = await fetch(`http://localhost:3000/retetar/${id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            notifySuccess();
            alert(`Reteta a fost stearsa!`);
            console.log(id);
            setOpen(false);
            console.log("Success!");

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
      <Button  variant="contained" color="primary" href = {`retetar/add`} startIcon={<EditIcon />}>
        Editeaza aceasta reteta 
      </Button >
      </Box>
        {recipe && recipe.map((rec) => (
            <Box   sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 300, width: '100%' }}>
                <Typography className='box' variant="h3" color="#9500ae">
                {/* <Avatar alt={rec.denumire} src="`url(${image.url})`" />            */}
                {rec.denumire}
                </Typography>
                <Typography className='box' variant="h5" color="#0d47a1">
                    Valori nutritionale: {rec.valori_nutritionale}
                </Typography>
                <Typography className='box' variant="h5" color="#0d47a1">
                     Numar de produse rezultate: {rec.numar_produse}
                </Typography>
                <Typography className='box-text' variant="h5" color="#0d47a1">
                     Metoda de preparare: 
                     <div>{rec.mod_preparare}</div>
                </Typography>

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                    {"Esti sigur ca vrei sa stergi aceasta reteta? Aceasta actiune nu poate fi revocata!"}
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {rec.denumire}
                    </DialogContentText>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>NU</Button>
                        <Button onClick={() => {deleteRecipe(rec.id)}} autoFocus>DA</Button>
                    </DialogActions>
                </Dialog>

            </Box>
        ))}
        
        </div>
        </>
    )
}

export default Recipe;