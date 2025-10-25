import express from 'express';
const bodyParser = (await import('body-parser')).default;
const {check, validationResult} = (await import('express-validator')).default;
import fetch from 'node-fetch';
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.set("view engine", "ejs");
//store img and css static files in file public
app.use(express.static("public"));

//routes
//root route
app.get('/', async (req, res) => {
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers"
    let respone = await fetch(url);
    let data = await respone.json();
    let i = Math.floor(Math.random()*50);
    let img = data.hits[i].webformatURL;
    res.render('home.ejs', {img});
});
app.get('/Nick', async (req, res) => {
    let url = "https://www.behindthename.com/api/related.json?name=nicholas&usage=eng&key=ni956886090"
    let respone = await fetch(url);
    let data = await respone.json();
    res.render('nick.ejs', {data});
});
app.get('/Search', async (req, res) => {
    let name = req.body; 
    let url = `https://www.behindthename.com/api/lookup.json?name=mary&key=ni956886090`
    let respone = await fetch(url);
    let usage = await respone.json();
    res.render('Search.ejs', {usage});
});
app.post('/Search', urlencodedParser, async(req, res) => {
    let name = req.body.name; 
    if(name == ""){
        name = "mary"
    }
    let url = `https://www.behindthename.com/api/lookup.json?name=${name}&key=ni956886090`
    let respone = await fetch(url);
    let usage = await respone.json();
    res.render('Search.ejs', {usage});
});
app.get('/Random', async (req, res) => {
    let url = " https://www.behindthename.com/api/random.json?usage=ita&gender=f&key=ni956886090"
    let respone = await fetch(url);
    let data = await respone.json();
    let used = data.names[0]
    url = `https://www.behindthename.com/api/lookup.json?name=${used}&key=ni956886090`
    respone = await fetch(url);
    let usage = await respone.json();
    res.render('Random.ejs', {usage});
});
app.get('/RandomMan', async (req, res) => {
    let url = " https://www.behindthename.com/api/random.json?usage=ita&gender=m&key=ni956886090"
    let respone = await fetch(url);
    let data = await respone.json();
    let used = data.names[0]
    url = `https://www.behindthename.com/api/lookup.json?name=${used}&key=ni956886090`
    respone = await fetch(url);
    let usage = await respone.json();
    res.render('RandomMan.ejs', {usage});
});
//starts the web server
app.listen(3000, () => {
   console.log('server started');
});
//ctrl c to stop server