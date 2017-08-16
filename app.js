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
  { name: "Finish Daily Project", done: false, id: 1},
  {name: "Feed the Dogs", done: true, id:2}
];
const completedTODO = [];
app.get("/", function(req, res) {
  res.render('list', {
    todos: todos
  });
});

app.post("/", function(req, res) {
  const addtodo = req.body.newtodo;
  let max = 0
  for (var i = 0; i < todos.length; i++) {
    if (max < todos[i].id){
      max = todos[i].id
    }
  }
  let todo = {name: addtodo, done: false, id: max+1}
  todos.push(todo);
  res.redirect('/');
});

app.post("/:id", function(req, res) {
  console.log('button pushed');
  let id = req.params.id
  const completetodo = req.body.completebutton;
  completedTODO.push(completetodo);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Successfully started express appslication!');
});
