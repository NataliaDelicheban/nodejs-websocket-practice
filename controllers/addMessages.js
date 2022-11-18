const Message = require('../models/messages');

const addMessages = async (req, res, next) => {
    const { from, to } = req.body;
    const data = await Message.create({
        message, user: from, users: [from, to]
    })
    if (data) {
        res.json(data)
    }
   
}

module.exports = addMessages;