// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req,res) => {
  Actions.get(req.query)
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      console.log('get all: ', err);
      res.status(500).json({message: 'Error retrieving actions'});
    });
});

router.get('/:id', (req,res) => {
  Actions.get(req.params.id)
    .then(act => {
      if(act) {
        res.status(200).json(act);
      } else {
        res.status(404).json({message: 'Action not found.'});
      }
    })
    .catch(err => {
      console.log('get by id: ', err)
      res.status(500).json({
        message: 'Error retrieving action.'
      })
    })
});

router.post('/', (req,res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log('post: ', err)
      res.status(400).json({message: 'request body is missing'});
    })
});

router.put('/:id', (req,res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
    .then(update => {
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(404).json({message: 'No action with given id'})
      }
    })
    .catch(err => {
      console.log('put: ', err)
      res.status(400).json({message: 'Request body is missing'})
    })
});

router.delete('/:id', (req,res) => {
  Actions.remove(req.params.id)
    .then(remove => {
      res.status(200).json({message: remove});
    })
    .catch(err => {
      console.log('delete: ', err)
      res.status(500).json({message: 'Error removing Action.'})
    })
});


module.exports = router;