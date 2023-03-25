import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

const app= express()

env.config()

app.use(cors())
app.use(bodyParser.json())

//fetch api keys , configure openapi
const configuration = new Configuration({
    organization: "org-8W9gvj0QseVnuKhXij9lcTa0",
    apiKey: process.env.API_KEY
})
const openai = new OpenAIApi(configuration)

//listening
app.listen("3080", ()=>console.log("listening on port 3080"))

//dummy route to test
app.get("/" , (req,res) => {
    res.send("Hello world")
})

//post route for making request

app.post('/', async (req, res)=>{
    const {message} =req.body
    try{
        const response=await openai.createCompletion({
            model: "text-davinci-003",                                  //latest version of GPT used
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5                                             // maximum number of tokens. ie. max no. of words
       })
       res.json({message:response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})


