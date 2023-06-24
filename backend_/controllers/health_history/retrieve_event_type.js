const { Event } = require('../../app/models');

module.exports = async (req, res) => {
  try {
    const enumValues = await Event.rawAttributes.event_type.values;
    // console.log(enumValues)
    return res.json({ event_type: enumValues });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
