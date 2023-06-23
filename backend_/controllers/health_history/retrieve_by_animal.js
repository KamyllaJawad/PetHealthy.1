const { HealthHistory } = require("../../app/models");

module.exports = async function (req, res) {
    try {
        const animals = await HealthHistory.findAll({
            where: {
                fk_animal: req.params.animal_id
            }
        })
        return res.send(animals)
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
}