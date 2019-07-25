const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views'); // specify the folders views
app.set('view engine', 'ejs'); // set view engine to ejs

app.get('/', (req, res) => {
  fs.readFile('./data/data.json', (err, data) => {
    if (err) console.log(err);
  
    const parsedData = JSON.parse(data);
    
    res.render('user/index', { data: parsedData });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
