const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({user: user.getPublicProfile(), token})
        res.send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try{
        req.user.tokens = []

        await req.user.save()
        res.send(200)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    // try{
    //     const userFind = await User.find({})
    //     res.status(201).send(userFind)
    // } catch (e) {
    //     res.status(500).send()
    // }
})

// GET USER BY ID
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try{
//         const userByID = await User.findById(_id)
//         if (!userByID) {
//             return res.status(404).send()
//         }

//         res.send(userByID)
//     } catch(e) {
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }

//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })

//     // console.log(req.params);
// })



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try{

        // const user = await User.findById(req.user._id)

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return req.status(404).send()
        // }

        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const profileImage = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }

        cb(undefined, true)
    }
})


router.post('/users/me/avatar', auth, profileImage.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router