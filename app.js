import express from 'express'
import morgan from 'morgan'
import routes from './server/routes/studentRoute.js';
import router from './server/routes/studentRoute.js';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.options('*', cors(['http://localhost:4200']));
app.use('*', cors(['http://localhost:4200']));

//body parsinf

app.use(express.json({limit:'5kb'}));
app.use(express.urlencoded({extended:true, limit: '5kb'}));

if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));


/* When creating a api can change on daily basis*/
//Route Specification
app.use('/api/v1/students', router);

const port = 8000|| process.env.PORT;

const server = app.listen(port, ()=>{
    console.log(`Listening on  http://localhost:${port}`);

})