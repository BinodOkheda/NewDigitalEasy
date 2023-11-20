const express = require('express');
const userRouter = express.Router();
const { User } = require('../models/userModel.js');

// GET route for retrieving users with sorting and pagination
userRouter.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';

    // Determine the sorting order based on the sortOrder parameter
    const sort = {};
    sort[sortField] = sortOrder === 'asc' ? 1 : -1;

    try {
        const users = await User.find()
            .sort(sort) // Sort the users
            .skip((page - 1) * limit) // Skip the results on previous pages
            .limit(limit); // Limit the number of results per page

        const totalUsers = await User.countDocuments(); // Count total users for pagination

        res.json({
            users,
            page,
            pages: Math.ceil(totalUsers / limit), // Calculate total pages
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});




userRouter.get('/:id', async (req, res) => {
    const userId = req.params.id;

 

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});






// POST route to create a new user
userRouter.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);

        // Save the user and handle errors
        const saveduser = await newUser.save();
        res.send({
            message:"user has been added..."
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// PUT route to update an existing user by ID
userRouter.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body; // Assuming the request body contains updated user data
        const updateduser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updateduser) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json(updateduser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// DELETE route to delete a user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteduser = await User.findByIdAndDelete(userId);
        if (!deleteduser) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json({ message: 'user deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});



module.exports = { userRouter };