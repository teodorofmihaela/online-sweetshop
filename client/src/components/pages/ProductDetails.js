import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Tooltip, Stack, Avatar, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams  } from 'react-router-dom';
import ClientNavbar from '../clientPages/ClientNavbar.js';


function Products() {
    const [product, setProduct] = useState([]);
    const [ingredienteProd, setIngredienteProd] = useState([]);
    const [ingrediente, setIngrediente] = useState([]);
    const [prodIngrediente, setProdIngrediente] = useState([]);

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
        setUrlImg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6bll3xJNcBwCegYGjY4wCkJvk0DkaD1YEfNUA3012swsvWPt0eVx5Zyh926y8WUt6tsk&usqp=CAU');
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

    return ( 
        <>
        <div className='products-content' >
      <Box className = 'lista-retete' sx={{ display: 'flex',flexDirection:'row',  flexWrap: 'wrap', gap: 5, minWidth: 300, paddingBottom: 4, width: '80%' }}>
            
      
            <div key={product.id}>

            <Typography  variant="h3" component="div">
            {product.denumire} 
            </Typography>
            <div style={{paddingTop:10}}>
                <Typography variant="h6">
                Categorie: {product.categorie}
                </Typography>
            </div> 
            <img src={urlImg} style={{maxWidth:'80%', maxHeight:'55%', minWidth:'80%', minHeight:'55%'}}/> 
            <div> 
                <Typography variant="h5">
                    Ingrediente: 
                    {prodIngrediente && prodIngrediente.map((ingredient) => (
                    <span>{ingredient.nume}, </span>
                    ))}
                </Typography>
            </div>
            
            <div>
                { product.alergeni && product.alergeni.trim() ? 
                <Typography variant="h5">
                    Contine si: {product.alergeni}
                </Typography> :null
               }
            </div>
            <div style={{paddingBottom:10}}>
                <Typography variant="h5">
                    Pret: {product.pret_vanzare} lei
                </Typography>
            </div>            
           
                  
            </div>
            
        </Box>
        </div>
    </>
)}

export default Products;