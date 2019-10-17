const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static(path.resolve('../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve ('../dist/index.html'))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
