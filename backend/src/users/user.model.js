const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: {
        type: String,
        required: function() {
            return this.role === 'admin'; // Solo requerido para admin
        },
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return this.role === 'admin'; // Solo requerido para admin
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    displayName: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    phone: {
        type: String,
    }
}, {
        timestamps: true,
    });

userSchema.pre('save', async function( next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User =  mongoose.model('User', userSchema);

module.exports = User;