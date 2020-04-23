const express = require('express');
const app = express();

const { testingConnection } = require('./util/database');
const startServer = require('./server');

testingConnection();
startServer();

