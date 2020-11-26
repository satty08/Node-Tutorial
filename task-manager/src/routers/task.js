const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        author: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    
    try{
        const tasks = await Task.find({ author: req.user._id })
        res.send(tasks)
    } catch (e) {
        res.status(404).send()
    }
    
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, author: req.user._id })
        if (!task) {
            return  res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
 
    if(!isValid){
        return res.status(400).send({
            "error": "Invalid updates!"
        })
    }
 
    try{
        // returns the new modified object and runsValidation according to the model's schema
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id})

        

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task)
            return res.status(404).send()
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
    
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)   
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, author: req.user._id})
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.send(500).send(e)
    }
})

module.exports = router