let router = require('express').Router()
let Tasks = require('../models/task')

router.get('/:listId', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid, listId: req.params.listId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send('ACCESS DENIED')
      }
      task.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("SUCCESSFULLY UPDATED")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

router.delete('/:id', (req, res, next) => {
  Tasks.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
    .then(task => {
      // if (!board.authorId.equals(req.session.uid)) {
      //   return res.status(401).send("ACCESS DENIED!")
      // }
      // board.remove(err => {
      //   if (err) {
      //     console.log(err)
      //     next()
      //     return
      //   }
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})

router.post('/:id/comments', (req, res, next) => {
  Tasks.findOne({ _id: req.params.id })
    .then(task => {
      task.comments.push(req.body)
      task.save(err => {
        if (err) {
          return res.status(500).send(err)
        }
        res.send(task)
      })
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/:id/comments/:commentId', (req, res, next) => {
  Tasks.findOne({ _id: req.params.id })
    .then(task => {
      task.comments.forEach((comment, index) => {
        if (comment._id == req.params.commentId) {
          task.comments.splice(index, 1)
        }
      })
      task.save(err => {
        if (err) {
          return res.status(500).send(err)
        }
        res.send({ message: 'Task successfully updated! Comment deleted!' })
      })
    })
})



module.exports = router