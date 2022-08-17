
// import module
const express = require('express'); 
const path = require('path'); 

let PORT = 3001;

const app = express()


const {products} = require('./data')




app.get('/', (req, res) => {
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})


/* app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found </h1> ')

}) */

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product; 
        return {id, name, image}
    })
    res.json(newProducts)

})


app.get('/api/products/:productID', (req, res) => {
    //console.log(req.params)
    const {productID} = req.params; 
    const singleProduct = products.find((product) => product.id === Number(productID))
    if(!singleProduct){
        return res.status(404).send('Product does not exists')
    }
    res.json(singleProduct)

})

app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    const {search, limit} = req.query
    //spread operator
    let sortedProduct = [...products];
    //filters through and gives us back the product that we searched for 
    //SUPER HANDY
    if(search) {
        sortedProduct = sortedProduct.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if(limit) {
        sortedProduct = sortedProduct.slice(0, Number(limit))
    }
    if(sortedProduct.length < 1){
       // res.status(200).send('no products matched your search')
       return res.status(200).json({success:true,data: []}); 
    }

    res.status(200).json(sortedProduct)
})



app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


