// require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()

const port = 9000

app.use(cors())

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.set('strictQuery', false);

// connect to mongodb atlas
const mongouri =  `mongodb+srv://fauwaaz:Fauroj19F20S@cluster0.k1ymcuf.mongodb.net/felix`
mongoose.connect(mongouri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully!');
    }
);

// import routes
const adminRoutes = require('./routes/admin.routes')
const instructorRoutes = require('./routes/instructor.routes')

// use routes
app.use('/admin', adminRoutes)
app.use('/instructor', instructorRoutes)

app.get('/', (req, res) => {
    console.log("Working");
})

app.listen(port, () => {
    console.log("Server running on port : " + port);
})