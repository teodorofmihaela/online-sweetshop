import React, {useEffect, useState} from 'react';
import {Card, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';

import './Provider.css';




function Provider() {
    const [furnizori, setFurnizori] = useState();
    const baseURL = "http://localhost:8080";

    useEffect(() =>{
        const dataFetch = async () => {
            try {
            const res = await fetch(`${baseURL}/furnizori`);
                if (res.status === 200) {
                const data = await res.json();
                setFurnizori(data);
                console.log(data);
                return dataFetch;
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();
    },[]);
    
    
    



    return ( 
        <>
        <div className='provider-content'>
        {furnizori && furnizori.map((furnizor) => (
        <Box  sx={{  display: 'flex',flexDirection:'row', flexWrap: 'wrap', gap: 5, width: '80%' }}>
        <Card  >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {furnizor.nume_furnizor}
            </Typography>
            </CardContent>
        </Card>
        </Box>
         ))}
        </div>

    </>
)}

export default Provider;