const mongoose = require('mongoose');

const actSchema = new mongoose.Schema({
  // userId:,
  title: {type: String, required: true},
  stat: [{type: Number, required: true, timestamps: true
                                                // {
                                                // createdAt: 'created_at',
                                                // updatedAt: 'updated_at'
                                                // }
  }]
})

const Activity = mongoose.model('Activity', actSchema);

module.exports = Activity;
