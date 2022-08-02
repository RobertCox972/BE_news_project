const { selectTopics } = require('../models/app.models')



exports.getTopics = (req, res) => {
selectTopics().then((topics) => {
    //console.log(topics)
    res.status(200).send({ topics: topics})
})
}
