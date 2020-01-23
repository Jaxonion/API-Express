const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    //console.log("the root path was called");
    res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const c = a + b;
    //const greeting = `The sum of a and b is ${c}`
    if(!a) {
        return res.status(400).send("Please provide a and b as a query string")
    }
    if(!b) {
        return res.status(400).send("Please provide a and b as a query string")
    }
    res.send(`The sum of a and b is ${c}`)
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = Math.floor(req.query.shift);
    const encryptedText = String.fromCharCode(text.charCodeAt(0) + shift);
    
    if(!text || !shift) {
        return res.status(400).send("Please provide text and shift as a query string")
    }
    res.send(`encrypted code is ${encryptedText}, shift ${shift}`)
});

app.get('/lotto', (req, res) => {
    const arr = req.query.arr;
    const computerArr = [];
    const matches = 0;
    const commonOccurences = computerArr
    for(let i=0; i<=6; i++) {
        const number = Math.floor(Math.random() * 20);
        computerArr.push(number);
    }
    res.send(`array is ${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]}, ${arr[5]}
        computer array is ${computerArr[0]}, ${computerArr[1]}, ${computerArr[2]}, ${computerArr[3]}, ${computerArr[4]}, ${computerArr[5]}
        commonOccurences is ${commonOccurences}`)
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});