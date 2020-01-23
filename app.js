const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    //console.log("the root path was called");
    res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
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
    let computerArr = [];
    let matches = 0;
    for(let i=0; i<=6; i++) {
        const number = Math.floor(Math.random() * 20);
        computerArr.push(number);
    }

    for(let a=0; a<arr.length; a++){
        for(let b=0; b<computerArr.length; b++){
            if(parseInt(arr[a]) == parseInt(computerArr[b])){
                matches = matches + 1;
            }
        }
    }
    if(matches == 6) {
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
    if(matches == 5) {
        res.send('Congratulations! you win $100!')
    }
    if (matches == 4) {
        res.send('Congratulations! You win a free ticket')
    }
    if (matches < 4) {
        res.send('Sorry, you lose.')
    }
    
    res.send(`array is ${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[4]}, ${arr[5]}
    computer array is ${computerArr[0]}, ${computerArr[1]}, ${computerArr[2]}, ${computerArr[3]}, ${computerArr[4]}, ${computerArr[5]}
    commonOccurences is ${matches} common: ${common}`)
    
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});