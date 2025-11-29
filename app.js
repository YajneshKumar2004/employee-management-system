const express = require('express')
const routes = require('./routes/employee-router')
require('dotenv').config();
const port = process.env.SERVER_PORT || 3000;

const app = express();

app.set('view engine', "ejs");
app.set('views', "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

