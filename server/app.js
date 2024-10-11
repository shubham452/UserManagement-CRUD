const express = require('express');
const cors = require('cors');
const path = require('path');
const { db } = require('./db/Conn.js');
const router = require('./Routes/router.js');
const app = express();
const { userExport } = require('./controllers/userController.js')

require('dotenv').config();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the public directory
app.use('/files', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.csv')) {
            res.setHeader('Content-Type', 'text/csv');
        }
    }
}));
router.get('/files/export/user_data.csv', userExport);

// Logging middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next(); // Proceed to the next middleware or route handler
});

// Use the router
app.use(router);

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to PORT:', PORT);
    });
};

server();
