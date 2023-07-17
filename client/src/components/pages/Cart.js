import React, {useEffect, useState} from 'react';
import {AppBar, ToolBar, IconButton, } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClientNavbar from '../clientPages/ClientNavbar.js'
import {Card, Button, CardContent,CardActions,Typography, TextField, Tooltip, Stack, Avatar, Box} from '@mui/material';
import { useParams  } from 'react-router-dom';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';


function Cart({showModal, toggle}) {

const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

    const [product, setProduct] = useState([]);
    const [ingredienteProd, setIngredienteProd] = useState([]);
    const [ingrediente, setIngrediente] = useState([]);
    const [prodIngrediente, setProdIngrediente] = useState([]);
    const [cantitate, setCantitate] = useState(1);
    const [adresa, setAdresa] = useState();
    const [telefon, setTelefon] = useState();
    const [nume, setNume] = useState();

    const { id } = useParams();
    const [urlImg, setUrlImg] = useState();

    const baseURL = "http://localhost:8080";

    useEffect(() =>{
        const dataFetch = async () => {


            try {
                let [requestIngredienteProd,requestIngrediente, requestProdus ]= await Promise.all([
                    fetch(`${baseURL}/ingrediente_in_retete`),
                    fetch(`${baseURL}/ingrediente`),
                    fetch(`${baseURL}/produse/id/${id}`)                    ]);                
                if (requestIngredienteProd.status === 200 && requestIngrediente.status === 200 &&  requestProdus.status ===200) {
                    const responseIngredienteProd = await requestIngredienteProd.json();
                    const responseIngrediente = await requestIngrediente.json();
                    const responseProdus = await requestProdus.json();
                    setProduct(responseProdus);
                    imgSrc(responseProdus.denumire);
                    setIngredienteProd(responseIngredienteProd);
                    setIngrediente(responseIngrediente)
                    ProductIngredients(responseIngredienteProd, responseProdus,responseIngrediente);
                return responseIngredienteProd, responseProdus;      
                }
          
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);
    
    function ProductIngredients(ingredienteProd, produs,ingrediente){
        let ingrMap = [];
        let ingrProdMap = [];

            ingredienteProd.forEach((j1) => {
            if (j1.produseId == produs.id) {
                ingrMap.push({ ...j1,...produs });
            }
            });

            ingrMap.forEach((j1) => {
                ingrediente.forEach((j2) => {
              if (j1.ingredienteId == j2.id) {
                ingrProdMap.push({ ...j1,...j2 });
                  }
                  });
              });

            console.log(ingrProdMap); 
      
            setProdIngrediente(ingrProdMap);
            console.log(prodIngrediente);
        
      }

function imgSrc(denum){
    if (denum=='Ecler cu ciocolata cu alune') {
        setUrlImg('https://cristinamehedinteanu.ro/wp-content/uploads/2020/06/eclere-cu-ciocolata.jpg');
    }else if(denum=='Ecler cu ciocolata belgiana') {
        setUrlImg('https://www.cofetariaarmand.ro/foto_medium/3771_1.jpg');
    }else if(denum=='Ecler cu ciocolata cu lapte')  {
        setUrlImg('https://passepartoutcafe.ro/wp-content/uploads/2023/03/Passepartout-25-scaled.jpg');
    }else if(denum=='Ecler cu vanilie') {
        setUrlImg('https://www.lanach.ro/wp-content/uploads/2020/09/ecler-vanilie.jpg');
    }else if(denum=='Ecler cu zmeura') {
        setUrlImg('https://www.iffco.it/sites/default/files/styles/free_crop/public/img/recipe/Non-e%CC%80-un-e%CC%81clair-cioccolato-e-lampone-Pristine-Hulala%CC%80-Classic-more.jpg?h=c522b44c&itok=AGubPp0g');
    }else if(denum=='Ecler cu mango') {
        setUrlImg('https://passepartoutcafe.ro/wp-content/uploads/2023/03/Passepartout-27-scaled.jpg');
    }else if(denum=='Ecler cu fistic') {
        setUrlImg('https://tazzcdn.akamaized.net/uploads/cover/cover_eclaire.jpg');
    }else if(denum=='Ecler snikers') {
        setUrlImg('https://almadulce.ro/wp-content/uploads/2021/07/ECLER-SNICKERS-2.jpg');
    }else if(denum=='Ciocolata de casa') {
        setUrlImg('https://www.cofetaria-artizan.ro/wp-content/uploads/2023/02/C01_1268.jpg');
    }else if(denum=='Inghetata cu fistic') {
        setUrlImg('https://flavor-picker.ro/img/portfolio/Inghetata-de-fistic-117687905.jpg');
    }else if(denum=='Croisant cu unt') {
        setUrlImg('https://lamama.ro/cdn/shop/products/Croissantcuunt_900x.png?v=1647328817');
    }else if(denum=='Pralina cu lavanda') {
        setUrlImg('https://murichocolatier.ro/wp-content/uploads/2020/11/Bomboane-ciocolata-lavanda-muri-chocolatier-e1605178994348.jpg');
    }else if(denum=='Pralina simpla') {
        setUrlImg('https://murichocolatier.ro/wp-content/uploads/2018/09/Trufe-Caramel-768x512.jpg');
    }else if(denum=='Pralina cu ciocolata si migdale') {
        setUrlImg('https://murichocolatier.ro/wp-content/uploads/2018/09/Trufe-Almond-768x418.jpg');
    }else if(denum=='Tort cu ciocolata') {
        setUrlImg('https://cdn.contentspeed.ro/slir/w800/chocolat.websales.ro/cs-content/cs-photos/products/original/tort-lapothose_75_9_16372536510795.jpg');
    }
    
}
const notifySucces = () => toast.success("Comanda plasata cu succes!");
const notifyError = () => toast.error("Comanda nu a fost plasata!");

  const handleRemoveFromCart = (product) => {
    removeFromCart(product)
    // notifyRemovedFromCart(product)
  }

  async function finalizeaza() {
    try{
        await Promise.all(cartItems.map(async (item) => {
            let id = uuidv4();
            let listId=[];
            listId.push(id);
        const res = await fetch(`${baseURL}/produse_comanda`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "cantitate_produse": item.quantity,
                "valoare": item.pret_vanzare,
                "produseId": item.id

            })
        });
            if(res.status==201){
                finalizeazaVanzari(listId);
            }
            else if(res.status!=201 || res==null){
                notifyError();
            }
        }));
    }catch (err) {
        console.log(err);
    }
  }
  async function finalizeazaVanzari(listId) {
    try{
        await Promise.all(listId.map(async (id) => {
        let id2 = uuidv4();
        const res = await fetch(`${baseURL}/vanzari_online`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id2,
                "valoare_totala": getCartTotal(),
                "status_comanda": "initiata online",
                "produse_comandaId": id,
                "data_vaznare" : new Date(),
                "adresa_livrare" : adresa,
                "telefon" : telefon,
                "nume" : nume

            })
        });
            if(res.status==201){
                notifySucces();
                clearCart();
                onReset();
            }
            else if(res.status!=201 || res==null){
                notifyError();
            }
        }));
    }catch (err) {
        console.log(err);
    }
  }


  function onReset() {
    setNume("");
    setAdresa("");
    setTelefon("");
    

}


    return (
      <>
        <div style={{paddingLeft:'9.6%'}}>
            <ClientNavbar />
            <Box className = 'lista-retete' sx={{ display: 'flex',flexDirection:'column',  flexWrap: 'wrap', gap: 5, minWidth: 300, paddingBottom: 2, width: '80%' }}>
            <div>
            
        {cartItems.map((item) => (
        <div key={item.id}>
        <Card sx={{maxWidth:400}}>
            <CardContent>
            <Typography  variant="h3" component="div">
            {item.denumire}
            </Typography>
            <div style={{paddingBottom:10}}>
                <Typography variant="h5">
                    Pret: {item.pret_vanzare} lei
                </Typography>
            </div>        
            <div>
            <TextField type="number" className="input" size="small" style={{ width: "25%" , paddingBottom:7}} InputProps={{readOnly: true}} 
                value={item.quantity}   variant="outlined" defaultValue='1' label='Cantitate'
                onChange={ event =>setCantitate(event) }>
            </TextField>
            <Button  variant="contained" color="success" onClick={() => {
                    addToCart(item)
                  }}>
            +
            </Button >
            <Button  variant="contained" color="error" onClick={() => {
                    const cartItem = cartItems.find((product) => product.id === item.id);
                    if (cartItem.quantity === 1) {
                      handleRemoveFromCart(item);
                      
                    } else {
                      removeFromCart(item);
                    }
                  }}>
            -
            </Button >
            </div>    
            {/* <Button  variant="contained" color="error" onClick={() => {
              removeFromCart(item);
              notifyCartCleared()
            }}>
            
            Sterge
            </Button > */}
            </CardContent>
        </Card>
        
        </div>

        ))}
        <div style={{paddingTop:20, paddingBottom:20}}>
            <Button  variant="contained" color="error"  onClick={() => {
              clearCart()
            }}>
            Goleste cosul
            </Button >
            </div>
        <div>
            {cartItems ?(
            <Box sx={{ display: 'flex', flexWrap: 'wrap',  paddingLeft:2, paddingTop:1, paddingBottom:1, minWidth: 300, width: '70%' }}>
                <PaymentsIcon className='form-icon' fontSize='large'/>
                <Card style={{ minWidth: 230 }}>
                <Typography> Valoare totala: {getCartTotal()} lei</Typography>
                </Card>
                </Box>
                ):(
                    <h1 >Cosul este gol!</h1>
                )}
        </div>
        </div>

      <ToastContainer />
        <div>
            <LocalShippingIcon className='form-icon' fontSize='large' />
            {/* {adresa.length<3?
            (<TextField  value={adresa} size="small" style={{ width: " 285px" }} error helperText="Adresa trebuie sa aiba minim 3 caractere"
            onChange={ event =>
                {setAdresa(event.target.value);
                }}
                label="Adresa livrare" variant="outlined">
            </TextField>): */}
            <TextField  value={adresa} size="small" style={{ width: " 285px" }} 
            onChange={ event =>
                {setAdresa(event.target.value);
                }}
                label="Adresa livrare" variant="outlined">
            </TextField>
            
            </div>
            <div>
            <PhoneIcon className='form-icon' fontSize='large' />
            <TextField  value={telefon} size="small" style={{ width: " 285px" }}   
            onChange={ event =>
                {setTelefon(event.target.value);
                }}
                label="Telefon" variant="outlined">
            </TextField>
            </div>
            <div>
            <AccountCircleIcon className='form-icon' fontSize='large' />
            <TextField  value={nume} size="small" style={{ width: " 285px" }} 
            onChange={ event =>
                {setNume(event.target.value);
                }}
                label="Nume" variant="outlined">
            </TextField>
            </div>
            <Button  onClick={finalizeaza} variant="contained" color="success" sx={{width:'30%', paddingTop:'-70px'}}>
            Finalizeaza
            </Button >
            </Box>
        </div>
      </>
    )
  }
  
  Cart.propTypes = {
    showModal: PropTypes.bool,
    toggle: PropTypes.func
  }
  export default Cart;  
  