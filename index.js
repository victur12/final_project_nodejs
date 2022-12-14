const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const employees = require('./routes/employees');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req,res, next)=>{
    res.status(200).json({code: 1, message: "Bienvenido a la BD de Empleados"});
    res.send("Hola");
});

app.use("/user", user);
//autotentificacion
app.use(auth);
app.use("/employees", employees);

app.use(notFound);


app.listen(process.env.PORT || port, ()=>{
    console.log('server is running...');
});

