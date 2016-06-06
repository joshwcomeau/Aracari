/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import nconf from 'nconf';


const app = new express();
const port = nconf.get('port') || 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const distPath = path.join(__dirname, '../dist');
app.use('/static', express.static(distPath));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
