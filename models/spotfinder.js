// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');
const SpotfinderSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    typeOfVacation: {
      type: String,
      enum: ['Long Vacation','Short Vacation'],
      default: 'Short Vacation'
    },
    holidayBudget: {
      type: Number,
      required: true
    }
   }, {
    timestamps: true,
    toJSON: {
      getters: true
    }
  });
  SpotfinderSchema.query.long = function () {
    return this.where({
      status: 'Long Vacation'
    })
  };
  
  SpotfinderSchema.query.short = function () {
    return this.where({
      status: 'Short Vacation'
    })
  };

module.exports = mongoose.model('spotfinder', SpotfinderSchema);