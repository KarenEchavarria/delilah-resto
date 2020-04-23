const app = require('express')();
const bodyParser = require('body-parser');
const productRouter = require('./resources/products/product.router');

app.use(bodyParser.json());
app.use('/products', productRouter);



const startServer = () => {
    try {
        app.listen(3005, () => {
            console.log('Server online in port 3005')
        })
    } catch (err) {
        console.error(err);
    }
};

module.exports = startServer;

