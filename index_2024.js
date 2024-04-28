const express = require('express')
const app = express()
const port = 3000

//CRUD
//READE
app.get('/', (req, res) => {
    let animalfav = "Perro";
    let numero = 45;
    let otronumero = 80;
    let resultado = numero - otronumero;
    res.send('mi animal favorito es: ' + resultado)
});

//CREATE
app.post('/', (req, res) => {
    res.send('Hello World! desde post')
});

//UPDATE
app.put('/', (req, res) => {
    res.send('Hello World! desde put')
});

//DELETE
app.delete('/', (req, res) => {
    res.send('Hello World! desde delete')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})