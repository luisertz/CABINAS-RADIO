const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const TaskSchema = Schema({
  cabina: {
    type: String,
    required: true,
    trim: false
}, 

prog: {
    type: String,
    required: true,
    trim: false
}, 
fecha: {
    type: String,
    required: true,
    
},

hora1: {
    type: String,
    required: true,
    unique: false
},
hora2: {
    type: String,
    required: true,
    unique: false,
} ,
reqtec: {
    type: String,
    required: false,
    unique: false,
},
coments: {
    type: String,
    required: false,
    unique: false,
} , status: {
  type: Boolean,
  default: false } 

} , {
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);
