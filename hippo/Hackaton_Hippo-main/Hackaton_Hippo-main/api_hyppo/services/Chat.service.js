const { Chat } = require("../models/index");

async function getAllChats(zone) {
    return await Chat.findAll({
        where: { zone: zone },
        limit: 100,
        order: [['date_time', 'DESC']]
    });
}

async function getChatById(id) {
    return await Chat.findByPk(id);
}

async function addChat(data) {
    return await Chat.create(data);
}

async function updateChat(id, newData) {
    const Chat = await Chat.findByPk(id);
    if (Chat) {
        await Chat.update(newData);
        return Chat;
    }
    return null;
}

async function deleteChat(id) {
    const Chat = await Chat.findByPk(id);
    if (Chat) {
        await Chat.destroy();
        return true;
    }
    return false;
}

module.exports = {
    getAllChats,
    getChatById,
    addChat,
    updateChat,
    deleteChat,
};