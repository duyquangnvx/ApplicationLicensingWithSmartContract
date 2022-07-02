const express = require('express'); 
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.static('public'));
app.use('/scripts', express.static(`${__dirname}/node_modules/web3.js-browser/build`));
app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

const http = require('http');
const server = http.createServer(app);
server.listen(5000, () => {
    console.log('api running on port 5000')
});

require('./controllers/authentication')(app);

const LicenseToken = require('./base/license-token');
(async () => {
    await LicenseToken.initContract();
    require('./controllers/license')(app);
})();






    
