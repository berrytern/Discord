const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const Conta = require("../models/Conta")

module.exports = (req,res) => {
    //if(!req.body.token) res.send({'error': 'token faltando'})
    const params = {
        secretOrKey: process.env.AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        Conta.findById({_id: payload._id})
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)
    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}