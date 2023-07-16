import http from 'http';
import mongoose from 'mongoose';
import app from './app';
require('dotenv').config();
const port: number | string = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server running on ', port);
});
const MONGO_URL = process.env.MONGO_URL;
mongoose.Promise = Promise;
async function main() {
  await mongoose.connect(MONGO_URL);
}
main().catch(err => console.log(err));
