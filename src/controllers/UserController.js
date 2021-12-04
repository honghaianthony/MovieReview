const models = require('../models')
const bcrypt = require('bcrypt');

module.exports = {
    CreateUser: async function (req, res, next) {
        const {username, password, name, email, phone, birth} = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            await models.User.create({
                username,
                password: hashedPassword,
                fullName: name,
                email,
                avatar: "https://drive.google.com/uc?id=1eV7Nrlh3A5NKUHlyr8Dyn6nKNvpMP0pM",
                phone, 
                role: 1,
                dateOfBirth: birth,
            });
            
            res.redirect('login');
        } catch (error) {
            res.redirect('register')
        }
        
    },
}