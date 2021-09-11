// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.use(express.json());

router.get('/', (req,res) => {
  Projects.get(req.query)
    .then(project => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json([])
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.get('/:id', (req,res) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
      res.status(200).json(project)        
      } else {
      res.status(404).json({message: 'There is no project with this id'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/', (req,res) => {
  Projects.insert({name: req.name})
    .then(project => {
      if(project) {
        res.status(200).json(project) 
      } else {
        res.status(400).json({message: 'Request body is missing required fields'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.put('/:id', (req,res) => {
  const changes = {name: req.name};
  const id = req.params.id;
  Projects.update(id, changes)
    .then(() => {
      return Projects.get(id)
    })
    .then(project => {
      if(project) {
      res.json(project)        
      }else if (!project.id) {
        res.status(404).json({message: 'There is no project with the given id'})
      } else if(!changes) {
        res.status(400).json({message: 'Missing a required field'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.delete('/:id', (req,res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if(project) {
      return res.json(req.id);        
      }else if(!req.params.id) {
        res.status(404).json({message: 'There is no project with that id'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      if (project) {
      return res.json([project.id])        
      }else if(!project.id) {
        res.status.json({message: 'No project with given id'})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

module.exports = router;