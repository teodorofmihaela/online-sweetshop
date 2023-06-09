import React, {useEffect, useState} from 'react';
import simpleSalesForecasting from 'simple-sales-forecasting';





2021-06,525
2021-07,730
2021-08,480
2021-09,695
2021-10,710
2021-11,925
2021-12,1125
2022-01,1130
2022-02,1380
2022-03,1495
2022-04,1410





function forecastSales() {

const forecastedValuesObject = simpleSalesForecasting(
    [13409, 29389, 128940, 490059, 290394, 1928904, 3892019, 2903945],
    2,
    4
  );
   
  
  return(
    <>
    <div>
        
    </div>
    </>
  )

}

export default forecastSales;