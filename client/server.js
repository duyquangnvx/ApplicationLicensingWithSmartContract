const express = require('express'); 
const app = express();
app.use(express.static('public'));
app.use('/scripts', express.static(`${__dirname}/node_modules/web3.js-browser/build`));
app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const http = require('http');
const server = http.createServer(app);
server.listen(3000);

require('./controllers/authentication')(app);

const LicenseToken = require('./license-token');
(async () => {
    await LicenseToken.initContract();
    require('./controllers/license')(app);
})();






    
