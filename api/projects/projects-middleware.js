// add middlewares here related to projects
function logger(req, res, next) {
  const date = new Date().toLocaleString()
  const method = req.method;
  const url = req.originalUrl;

  console.log(`${date}, ${method} to ${url}`)
  next()
}

function validatePost(req, res, next) {
  const {desciption} = req.body;

  if(!desciption) {
    res.status(400).json({message: 'missing required name'})    
  }else {
  next()    
  }
}

function validateProject(req, res, next) {
  const {name} = req.body;

  if(!name) {
    res.status(400).json({message: 'missing required name'})
  } else {
    next()
  }
}

module.exports = {logger, validatePost, validateProject}