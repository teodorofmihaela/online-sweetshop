import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './Statistics.css';
import { ResponsiveLine } from '@nivo/line'




function Statistics() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [data, setData] = useState([]);
    const baseURL = "http://localhost:8080";


    const monthNames = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
    "Iul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

    let dataProba = [{
        "id": `123`,
        "color": "hsl(3, 70%, 50%)",
        "data": data
    }];


    useEffect(() =>{
        const dataFetch = async () => {
            try {
            const request = await fetch(`${baseURL}/produse`);
                if (request.status === 200) {
                const response = await request.json();
                setProducts(response)
                return response;           
                }
            }catch(err){
                console.log(err);
            }};
        dataFetch();


        const dataVanzari = async () => {
            try {
            const request = await fetch(`${baseURL}/vanzari`);
                if (request.status === 200) {
                const response = await request.json();
                setSales(response);
                response.sort(custom_sort);
                setDataFromRequest(getMonthSums(response));
                console.log(dataProba);
                return response;        
                }
            }catch(err){
                console.log(err);
            }};
        dataVanzari();
    },[]);
    
 

function setDataFromRequest(response)
{
            let entries = Object.entries(response)
            entries.map( ([key, val] ) => {

        setData(oldArray=>[
            ...oldArray,
            {
                "x": `${key}`,
                "y" : `${val}`
            }])
        })      
}


function custom_sort(a, b) {
    return new Date(a.data) - new Date(b.data);
}

function getMonthName(inputDate) {
    var monthNumber = new Date(inputDate).getMonth();
    var year = new Date(inputDate).getFullYear();
    var monthName = monthNames[monthNumber];
    var monthYear = `${monthName} ${year}`
    return monthYear;
  }

function getMonthSums(inputArray)
{
    const counts = {};

    for (const num of inputArray) 
    {
        var luna = getMonthName(num.data)
        counts[luna] = counts[luna] ? counts[luna] + num.valoare_totala : num.valoare_totala;
    }

    return counts;
}




    return ( 
        <>
        <div className='products-content' style={{height: 200}}>
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5,paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/`}  startIcon={<AddIcon />}>
        Adauga ????? 
      </Button >
      </Box>
{/* 
      {sales && sales.map((sale) => (
              <div>
        {sale.data}
        </div>
        ))} */}

{sales && sales.map((saleByMonth) => (
              <div>
        {saleByMonth.data}
        </div>
        ))}


{dataProba && dataProba.map((dat) => (
              <div>
        {dat.data.x}
        </div>
        ))}





{/* 
<div style={{height: 200}}>

<ResponsiveLine
        data={dataProba}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        xFormat=" >-"
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Data',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Vanzari totale',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />



</div>
 */}












        <ResponsiveLine
        data={dataProba}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ 
            type: 'point' }}
        yScale={{type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false }}
        // xFormat="time:%Hh"
        // axisTop={null}
        // axisRight={null}
        axisBottom={{
             orient: "left",
        // format: "%d%m%Y [%d]",
        legend: "Data",
        legendOffset: 40,
        legendPosition: "middle"}}
        axisLeft={{ 
            legend: "Valoare (lei)",
            legendPosition: "middle",
            legendOffset: -40 }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    /> 


        </div>
    </>
)}

export default Statistics;