const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.l93jg.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
console.log(uri);
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Base de datos conectada')).catch(e => console.log('error db:', e))
// import routes

// route middlewares
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})