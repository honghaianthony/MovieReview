const models = require('../models')
const bcrypt = require('bcrypt');

module.exports = {
    CreateUser: async function (req, res, next) {
        const {username, password, name, email, phone, birth} = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            await models.user.create({
                username,
                password: hashedPassword,
                fullName: name,
                email,
                phone, 
                role: 1,
                dateOfBirth: birth,
            });
            
            res.redirect('login');
        } catch (error) {
            res.redirect('/user/register')
        }
        
    },
}