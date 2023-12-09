module.exports = (app) =>{

    //user route endpoints
    const chat = require('../controllers/chats.controller');
    app.get('/getAll', chat.findAll);    

    //const chats = require('../controllers/chats.controller');
}
