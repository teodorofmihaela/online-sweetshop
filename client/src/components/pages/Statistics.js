import React, {useEffect, useState} from 'react';
import {Card, Button, CardContent,CardActions,Typography, Stack, Avatar, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@mui/material";
import './Statistics.css';
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'





function Statistics() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [data, setData] = useState([]);
    const [vanzariTotale, setVanzariTotale] = useState(0);
    const [salesByCategory, setSalesByCategory] = useState([]);
    const baseURL = "http://localhost:8080";
    const theme = useTheme();
    let SalesCateg = [];

    const [dataPie, setDataPie] = useState([]);

    const monthNames = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
    "Iul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

    let dataGrafic = [{
        "id": `vanzari`,
        "color": "hsl(300, 70%, 50%)",
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
             let [requestVanzari, requestProduse ]= await Promise.all([
             fetch(`${baseURL}/vanzari`),
             fetch(`${baseURL}/produse`)
             ]);
                if (requestVanzari.status === 200 && requestProduse.status ===200) {
                const responseVanzari = await requestVanzari.json();
                const responseProduse = await requestProduse.json();
                setSales(responseVanzari);
                setProducts(responseProduse)
                responseVanzari.sort(custom_sort);
                setDataFromRequest(getMonthSums(responseVanzari));
                TotalSalesSum(responseVanzari);
                SalesCategory(responseVanzari, responseProduse);
                setDataPieFromRequest(SalesCateg);
                return responseVanzari;        
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

function TotalSalesSum(sales) {
    let sum = 0;
    for (const sale of sales) {
    sum = sum + sale.valoare_totala;
    setVanzariTotale(sum);
    }   
    return sum;
}


function SalesCategory(sales, products){

sales.forEach((j1) => {
    products.forEach((j2) => {
      if (j1.produseId === j2.id) {
        SalesCateg.push({ ...j1,...j2 });
      }
    });
  });
  
  console.log(SalesCateg);

}


function setDataPieFromRequest(salesCat){
    var i=0;
    const counts = {};

        for (const s of salesCat) 
        {
            var categorie = s.categorie
            counts[categorie] = counts[categorie] ? counts[categorie] + s.valoare_totala : s.valoare_totala;
        }

        var colorCode = 257;
        for(var categorieCount of Object.entries(counts).map(x => x[0]))
        {
            setDataPie(oldDataPie=>[
                ...oldDataPie,
                {
                    "id" : categorieCount,
                    "label" : categorieCount,
                    "value" : counts[categorieCount],
                    "color" : `hsl(${colorCode}, 80%, 40%)`
                }])

            colorCode += 200;
        }
        
  }

    return ( 
        <>
        <div className='products-content' style={{height: 400, paddingTop : 20}}>
        {/* <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 5,paddingLeft:2, paddingTop:2, paddingBottom:5, minWidth: 300, width: '98%' }}>
        <Button  variant="contained" color="success" href = {`/`}  startIcon={<AddIcon />}>
        Adauga ????? 
      </Button >
      </Box> */}

        <Typography variant="h6" style={{display: 'flex', flexWrap: 'wrap',  justifyContent: 'center',minWidth: 300, width: '98%' }}>Vanzari lunare totale (lei)</Typography>

        <ResponsiveLine
        data={dataGrafic}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: '#7B68EE',
                },
              },
              legend: {
                text: {
                  fill: '#000080',
                },
              },
              ticks: {
                line: {
                  stroke: '#7B68EE',
                  strokeWidth: 1,
                },
                text: {
                  fill: '#7B68EE',
                },
              },
            },
            legends: {
              text: {
                fill: '#000080',
              },
            },
            tooltip: {
              container: {
                color: '#7B68EE',
              },
            },
          }}

        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ 
            type: 'point' }}
        yScale={{type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: "left",
            legend: "Data",
            legendOffset: 40,
            legendPosition: "middle"}}
        axisLeft={{ 
            legend: "Valoare (lei)",
            legendPosition: "middle",
            legendOffset: -45 }}
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

        <div style={{height: 600 , paddingTop:140, paddingBottom:60}}>
        <Typography style={{display: 'flex', flexWrap: 'wrap',  justifyContent: 'center',minWidth: 300, width: '98%' }}>Vanzari pe categorii de produse</Typography>
        <Typography variant="h6" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center',minWidth: 300, width: '98%' }}>Total: {vanzariTotale} lei</Typography>

        <ResponsivePie
        data={dataPie}
        colors={{ datum: "data.color" }}
        margin={
          { top: 40, right: 80, bottom: 100, left: 50 }
        }
        sortByValue={true}
        innerRadius={0.45}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX:  20 ,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />

        </div>
    </>
)}

export default Statistics;