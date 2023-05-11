import express from 'express';
import pkg from 'express';
const {json} = pkg;
import cors from 'cors';
import { initialize } from './repository.mjs';
import {join,resolve} from 'path';
import routes from './routes.mjs';



const application = express();

application.use(cors())
    .use(json())
    .use(express.static(join(resolve(),'../client/public')))
    .use('/', routes);


application.listen(8080, async ()=>{
    try{
        await initialize();
    }catch(error){
        console.error(error);
    }
});
