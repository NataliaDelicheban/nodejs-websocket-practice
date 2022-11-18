const Message = require('../models/messages');

const getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1 })
        const sortedMessages = await messages.map(item => {
            return {
                fromSelf: item.user === from,
                message: item.message,
            }
        });
        res.json(sortedMessages);
    } catch (error) {
        next(error);
    }
}

module.exports = getMessages;