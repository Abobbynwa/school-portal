const express = require('express');
const path = require('path');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
const frontend = path.join(__dirname, '../frontend');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(frontend));
app.use('/api', apiRoutes);

app.get('/', (req, res) => res.sendFile(path.join(frontend, 'index.html')));
app.get('/student', (req, res) => res.sendFile(path.join(frontend, 'student.html')));
app.get('/staff', (req, res) => res.sendFile(path.join(frontend, 'staff.html')));
app.get('/login', (req, res) => res.sendFile(path.join(frontend, 'login.html')));
app.use((req, res) => res.status(404).send('Not Found'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/classes', require('./routes/classses'));
app.listen(3000, () => console.log('Server running on port 3000'));

