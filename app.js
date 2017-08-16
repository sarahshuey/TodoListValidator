const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/public', express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

const todos = [
  "Finish Daily Project",
  "Feed Dogs",
  "Cook Dinner"
];
const completedTODO = [];
app.get("/", function(req, res) {
  res.render('list', {
    todos: todos
  });
});

app.post("/", function(req, res) {
  const addtodo = req.body.newtodo;
  todos.push(addtodo);
  res.redirect('/');
});

app.post("/completed", function(req, res) {
  console.log('button pushed');
  const completetodo = req.body.completebutton;
  completedTODO.push(completetodo);
  res.redirect('/');
});




app.listen(3000, function() {
  console.log('Successfully started express appslication!');
});
