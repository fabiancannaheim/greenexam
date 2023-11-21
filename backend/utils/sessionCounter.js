
let activeSessions = 0

const sessionCounterMiddleware = (req, res, next) => {
    if (typeof req.session.isNew === 'undefined') {
        req.session.isNew = true
    } else if (req.session.isNew) {
        req.session.isNew = false
        activeSessions++
    } 
    
    res.on('finish', () => {
        // Check if session is finished? Maybe if inactive for too long?
    })

    next()
}

function getActiveSessions() {
    return activeSessions
}

module.exports = { sessionCounterMiddleware, getActiveSessions }