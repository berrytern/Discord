const ValidationException = require('./validation.exception')

class ApiExceptionManager{
    build(err, res) {
        switch (err.contructor) {
            case ValidationException:
                return res.status(400).send(err.message)
            default:
                return res.status(500).send()
        }
    }
}
module.exports = ApiExceptionManager