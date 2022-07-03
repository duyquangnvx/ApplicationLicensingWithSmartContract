const express = require('express'); 
const app = express();

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

const http = require('http');
const server = http.createServer(app);
server.listen(5000);


const LicenseToken = require('./license_token/license-token');
(async () => {
    await LicenseToken.initContract();
    require('./controllers/license')(app);
})();






    
