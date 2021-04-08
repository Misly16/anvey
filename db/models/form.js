const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  views: Number,
  questions: Object,
});

module.exports = mongoose.model('Survey', surveySchema);
