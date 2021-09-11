// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.use(express.json());

router.get('/', (req,res) => {
  Actions.get(req.query)
});

router.get('/:id', (req,res) => {
  Actions.get(req.params.id)
});

router.post('/', (req,res) => {
  Actions.update({})
});

router.put('/:id', (req,res) => {
  const id = req.params.id;
  const change = {project_id: 123}
  Actions.insert(id, change)
});

router.delete('/:id', (req,res) => {
  Actions.remove(req.params.id)
});

module.exports = router;