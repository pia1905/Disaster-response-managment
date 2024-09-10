const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Schema and Model
const exampleSchema = new Schema({
  name: String,
  age: Number
});

const Example = mongoose.model('Example', exampleSchema);

// Export the model
module.exports = Example;
