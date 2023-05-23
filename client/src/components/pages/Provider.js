import React, {useEffect, useState} from 'react';

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
            <div>
            {furnizor.nume}
            </div>
        ))}
             Here is provider

        </div>
    </>
)}

export default Provider;