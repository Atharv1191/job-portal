require("./config/instrument");
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Sentry = require("@sentry/node");
require('dotenv').config();
const { clerkWebhooks } = require('./controllers/webhooks');


//initialize app
const app = express();

//connect to database
connectDB();

//middeleeares
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) =>{
    res.send('Hello World');
});
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks',clerkWebhooks)
  

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

//listen to port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));