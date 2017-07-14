const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actSchema = new mongoose.Schema({
  // userId:,
  title: {type: String, required: true},
  owner: {type: Schema.ObjectId, ref: 'User'},
  stat: [
     {
        value: Number,
        date: Date
    }
  ]
})

const Activity = mongoose.model('Activity', actSchema);

module.exports = Activity;
