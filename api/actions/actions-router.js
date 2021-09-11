// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {validatePost, validateAction} = require('./actions-middlware');
const Projects = require('../projects/projects-model');
const router = express.Router();

router.use(express.json());
router.use(errorHandler);

router.get('/', (req,res,next) => {
  Actions.get(req.query)
  .then(action => {
    res.status(200).json(action);
  })
  .catch(error => {next(error)})
});

router.get('/:id', validateAction, (req,res,next) => {
  Actions.get(req.params.id)
  .then(action => {
    if(req.params.id) {
      res.status(200).json(action)
    }else {
      res.status(404).json({message: 'error retrieving actions'})
    }
  })
  .catch(error => {next(error)})
});

router.post('/', validatePost, validateAction, (req,res,next) => {
  Actions.update(req.body)
  .then(action => {
    if(req.body) {
      res.status(200).json(action)
    }else if (!req.body) {
      res.status(400).json({message: 'missing body'})
    }
  })
  .then((action) => {
    if(Actions.project_id === Projects) {
      res.status(200).json(action);
    }
  })
  .catch(error => {next(error)})
});

router.put('/:id', validateAction, (req,res,next) => {
  const {id}= req.params;
  const change = {project_id: 123}
  Actions.insert(id, change)
  .then(action => {
    res.status(200).json(action)
  })
  .then (action => {
    if(!action.id) {
      res.status(404).json({message: 'no action with given id.'})
    } else if(!change) {
      res.status(400).json({message: 'missing required fields'})
    }
  })
  .catch(error => next(error))
});

router.delete('/:id', (req,res,next) => {
  Actions.remove(req.params.id)
  .then(project => {
    if(project) {
    return res.json(req.id);        
    }else if(!req.params.id) {
      res.status(404).json({message: 'There is no project with that id'})
    }
  })
  .catch(error => {next(error)})
});

function errorHandler(error, req, res, next) {
  res.status(500).json(error.message);
}

module.exports = router;