const 
  express    = require('express'),
  app        = express(),
  fs         = require('fs'),
  shell      = require('shelljs'),
  bodyParser = require('body-parser'),
  path       = require('path');

const 
  defaultFileExtension = 'json'; // Change the default file extension

var datetime = new Date();

const 
  folderPath = path.join('./', datetime.toISOString().slice(0,10), '/');

// process.exit();

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type: 'application/vnd.ms-excel' }));

app.get('/', (req, res) => res.send('Hello, I am pauluZ !'));

app.get('/testing', (req, res) => {
  console.log('requestName: ' + req);
  var dt = new Date();
  res.send('Date: ' + dt.toISOString());
});

app.post('/write', (req, res) => {
  let extension = req.body.fileExtension || defaultFileExtension,
    filePath    = `${path.join(folderPath, req.body.requestName)}.${extension}`;

  fs.writeFile(filePath, req.body.responseData, (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      console.log('filePath: ' + filePath);
      res.send('Success');
    }
  });
});

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now!');
  console.log(`${path.join(process.cwd(), folderPath)}`);
});
