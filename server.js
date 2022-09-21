if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }
  
const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const logger = require("morgan");
const cors = require('cors')
const PORT = 4000



/*  ---------------------------------------------  */
/*                     MongoDB                     */
/*  ---------------------------------------------  */
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => {
    console.log('Connected to MongoDB')
    console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
})



/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));




/*  ---------------------------------------------  */
/*                Routes Middleware                */
/*  ---------------------------------------------  */
const authRouter = require('./routes/auth')
app.use(('/auth'), authRouter);




app.listen(process.env.PORT || PORT, async () => {
    console.log('-------------------------------------------------');
    console.log('SERVER RUNNING ON PORT: ' + process.env.PORT || PORT);
    console.log('-------------------------------------------------');
});