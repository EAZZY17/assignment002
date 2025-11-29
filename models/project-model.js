const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
  title: String,
  completion: Date,
  description: String,
  technologies: [String],
  github: String,
  demo: String,
  role: String,
  outcome: String,
  category: String,
  image: String
}, { collection: 'projects' });

module.exports = mongoose.model('Project', ProjectsSchema);
