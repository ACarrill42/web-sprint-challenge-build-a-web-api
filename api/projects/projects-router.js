// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {validatePost, validateProject} = require('./projects-middleware');

const router = express.Router();

router.use(express.json());
router.use(errorHandler);

router.get('/', (req,res,next) => { 
  Projects.get(req.query)
    .then(project => {
      if(project) {
        res.status(200).json(project)        
      }else {
        res.status(404).json([])         
      }
      })
    .catch(error => {next(error)})
});

router.get('/:id', validateProject, (req,res,next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
      res.status(200).json(project)        
      }else {
      res.status(404).json({message: 'There is no project with this id'})
      }
    })
    .catch(error => {next(error)})
});

router.post('/', validatePost, validateProject, (req,res,next) => {
  Projects.insert(req.body)
    .then(project => {
      if(project) {
        res.status(200).json(project) 
      }else {
        res.status(400).json({message: 'Request body is missing required fields'})
      }
    })
    .catch(error => {next(error)})
});

router.put('/:id', validateProject, (req,res,next) => {
  const changes = {name: req.name};
  const {id} = req.params;
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
    .catch(error => {next(error)})
});

router.delete('/:id', (req,res,next) => {
  Projects.remove(req.params.id)
    .then(project => {
      if(project) {
      return res.json(req.id);        
      }else if(!req.params.id) {
        res.status(404).json({message: 'There is no project with that id'})
      }
    })
    .catch(error => {next(error)})
});

router.get('/:id/actions', (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      if (project) {
      return res.json([project.id])        
      }else if(!project.id) {
        res.status.json({message: 'No project with given id'})
      }
    })
    .catch(error => {next(error)})
});

function errorHandler(error, req, res, next) {
  res.status(500).json(error.message);
}

module.exports = router;