const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views'); // specify the folders views
app.set('view engine', 'ejs'); // set view engine to ejs

app.get('/', (req, res) => {
  fs.readFile('./data/data.json', (err, data) => {
    if (err) console.log(err);

    const parsedData = JSON.parse(data);

    res.render('index', { data: parsedData });
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { name } = req.body;

  fs.readFile('./data/data.json', (err, data) => {
    if (err) console.log(err);

    const parsedData = JSON.parse(data);
    const newData = [...parsedData, { name: name }];

    fs.writeFile('./data/data.json', JSON.stringify(newData), err => {
      if (err) console.log(err);

      res.redirect('/');
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
