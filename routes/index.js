const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const bodyParser = require('body-parser')
const Swal = require('sweetalert2')
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });



router.use(bodyParserJSON);
router.use(bodyParserURLEncoded);

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({fecha: 1, hora1: 1}).limit(100);

  res.render('index', {
    tasks
  });
});

router.post('/add', async (req, res, next) => {
  const task = new Task (req.body);
  await task.save();
  res.redirect('/');
});


router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
  
});


router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});


router.get('/busqueda/:fecha', async (req, res) =>{
  const fechabuscada = req.params.fecha;
    await Task.find({ fecha : fechabuscada}, (err, tasks) => {
      if (err) return res.status(500).send({message: "ERROR MAE"})
      if (!fechabuscada) return res.status(404).send({message: "NO HAY, NO EXISTE MEN"})
          res.render('index', {tasks});
    
}) .sort({fecha: 1, hora1: 1})
})



router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});



module.exports = router;
