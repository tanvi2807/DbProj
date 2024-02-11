const express = require('express')
const router = express.Router()

require('../db/conn')
const User = require("../model/userSchema")

router.get('/', (req, res) => {
    res.send(`Hello World From the Server router js`)
});

router.post('/adduser', async (req, res) => {

    const { name, email, phoneNumber, passingYear, collegename, companyname, higherstudiescollege } = req.body;

    if (!name || !email || !passingYear || !collegename){
        return res.status(422).json({ error: "plz fill all the fields" })
    }

    try {
        const userExist = User.findOne({ email: email });
        if (userExist == true) {
            return res.status(422).json({ error: "User already Exist" })
        }
        const user = new User({ name, email, phoneNumber, passingYear, collegename, companyname, higherstudiescollege })

        await user.save()
        console.log(user)
        res.status(201).json({ message: "user added succefully" })

    } catch (err) {
        console.log(err)
    }

});

router.get("/getAllUser", async (req, res) => {
    try {
        const alluser = await User.find({})
        // res.send({ status: "ok", data: alluser })
        res.json(alluser)
    } catch (err) {
        console.log(err)
    }
})
router.get("/getUserById/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/getUserById/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const {
            name,
            email,
            phoneNumber,
            passingYear,
            collegename,
            companyname,
            higherstudiescollege,
        } = req.body;

        // Find the user by ID and update their data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                phoneNumber,
                passingYear,
                collegename,
                companyname,
                higherstudiescollege,
            },
            { new: true } // Set { new: true } to return the updated user data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.delete("/getUserById/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID and remove them
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router

