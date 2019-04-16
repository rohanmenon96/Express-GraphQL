//Packages Imported
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log("App is listening at port ",port)
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.get("/",async(req,res)=>{
    res.send("Hello!");
})