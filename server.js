"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile('Hello');
});
app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
});
