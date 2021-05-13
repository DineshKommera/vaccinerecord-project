const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jwt');
const { serializeNodes } = require('@angular/compiler/src/i18n/digest');
const { reject } = require('lodash');
const bcrypt = require('bcryptjs');

const jwtSecret = "08011304397912975135ksdfg9065883158";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

//**Instance */
UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject, ['password','sessions']);
}

UserSchema.methods.generateAccessAuthToken = function(){
    const user = this;
    return new Promise((resolve, reject) => {
        jwt.sign({_id: user.toHexString()}, jwtSecret, {expiresIn: "15m"},(err,token) => {
            if(!err){
                resolve(token);
            }
            else{
                reject();
            }
        })
    })
}

UserSchema.methods.generateRefreshToken = function(){
    return new Promise((resolve, reject) => {
        crypto.randomButyes(64,(err,buf) => {
            if(!err){
                let token = buf.toString('hex');

                return resolve(token);
            }
        })
    })
}
UserSchema.methods.createSession = function(){
    let user = this;

    return user.generateRefreshAuthToken().then((refreshToken) => {
        returnsaveSessionToDatabase(user,refreshToken);
    }).then((refreshToken)=>{
        return refreshToken;
    }).catch((e) =>{
        return Promise.reject('Failed to save session'+e);
    })
}

UserSchema.statics.findByIdAndToken = function(_id,token){
    const User = this;
    return User.findOne({
        _id,
        'session.token': token
    });
}

UserSchmea.statics.findByCredentials = function(email,password){
    let User = this;
}

UserSchema.pre('save',function(next){
    let user = this;
    let costFactor = 10;

    if(user.isModified('password')){
        
    }
});




let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve,reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({'token':refreshToken, expiresAt})

        user.save().then(()=>{
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    })
}

let generateRefreshTokenExpiryTime = () => {

    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire*24)*60)*60;
    return ((Date.now()/1000) + secondsUntilExpire);
}
