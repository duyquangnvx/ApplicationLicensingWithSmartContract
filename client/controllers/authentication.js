const utility = require('../utility');
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
};

