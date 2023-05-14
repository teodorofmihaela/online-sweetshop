import React, {useState} from 'react';
import './AddRecipe.css';
import {Typography,FormGroup, Grid, Button, IconButton, InputAdornment,
     TextField, TextareaAutosize, AlertTitle, Card, Fade  } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';
// import {Item} from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import EggIcon from '@mui/icons-material/Egg';

function Recipe() {

    const [recipeNameInput, setRecipeNameInput] = useState();
    const [productsNumberInput, setProductsNumberInput] = useState();
    const [valoriNutritionaleInput, setValoriNutritionaleInput] = useState();
    const [ingredientsInput, setIngredientsInput] = useState();
    const [instructionsInput, setInstructionsInput] = useState();


function onReset() {
    setRecipeNameInput("");
    setProductsNumberInput("");
    setValoriNutritionaleInput("");
    setIngredientsInput("");
    setInstructionsInput("");
}


    return ( 
        <>
        <div className='recipe-content'>

            <FormGroup id="page" >
            <Grid id="form">
                <Stack spacing={5}>
                    {/* <Item> */}
                        <Typography variant="h4" color="primary">Adauga o reteta noua</Typography>
                    {/* </Item> */}
                    {/* <Item> */}
                        <Stack spacing={3}>
                            <div>
                                <MenuBookIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={recipeNameInput} size="small" style={{ width: "250px" }}
                                    onChange={event => setRecipeNameInput(event.target.value)}
                                    label="Denumire reteta" variant="outlined">
                                </TextField>
                            </div>
                            <div>
                                <FoodBankIcon className='form-icon' fontSize='large' />
                                <TextareaAutosize minRows={3} placeholder="Mod de preparare reteta" variant="outlined" style={{ width: "250px" }}
                                value={instructionsInput} onChange={event => setInstructionsInput(event.target.value)}></TextareaAutosize>
                            </div>
                            <div>
                                <InventoryIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" size="small" style={{ width: "250px" }}
                                    value={productsNumberInput}  label="Numar produse" variant="outlined" onChange={event => setProductsNumberInput(event.target.value)}>
                                </TextField>
                            </div>
                            <div>
                                <MenuBookIcon className='form-icon' fontSize='large' />
                                <TextField type="number" className="input" value={valoriNutritionaleInput} size="small" style={{ width: "250px" }}
                                    onChange={event => setValoriNutritionaleInput(event.target.value)}
                                    label="Valori nutritionale" variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">kcal</InputAdornment>,
                                      }}
                                    >
                                </TextField>
                            </div>
                            <div>
                                <EggIcon className='form-icon' fontSize='large' />
                                <TextField className="input" value={ingredientsInput} size="small" style={{ width: "250px" }}
                                    onChange={event => setIngredientsInput(event.target.value)}
                                    label="Ingrediente" variant="outlined">
                                </TextField>
                            </div>
                            {/* <Item> */}
                                <div className='button-add'>
                                    <Button  variant="contained" color="Primary" onClick={onReset}>Adauga <AddCircleOutlineIcon style={{ paddingLeft: "7px" }} /></Button>
                                    <Button  variant="contained" color="Primary" onClick={onReset}>Reset <AutorenewIcon style={{ paddingLeft: "7px" }} /></Button>
                                </div>
                            {/* </Item> */}
                            <div>
                                {/* <Fade
                                    in={alertLoginVisibility} //Write the needed condition here to make it appear
                                    timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                                    addEndListener={() => {
                                        setTimeout(() => {
                                            setAlertLoginVisibility(false)
                                        }, 2000);
                                    }}>
                                    {showLoginAlert ?
                                        <Alert severity="success" className="alert">
                                            <AlertTitle>Success</AlertTitle>
                                            Registration Successful!
                                        </Alert> :
                                        <Alert severity="error" className="alert">
                                            <AlertTitle>Failed</AlertTitle>
                                            Registration Not Successful!
                                        </Alert>}
                                </Fade> */}

                            </div>
                        </Stack>
                    {/* </Item> */}
                </Stack>
                <div>
                <img src="/images/cooking.svg" height="400em"></img>
                </div>
            </Grid>
        </FormGroup>



        </div>

        </>
    )}

export default Recipe;