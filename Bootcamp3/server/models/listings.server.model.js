//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  code: String,
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  address: String,
});

/* create a 'pre' function that adds the updated_at and created_at if not already there property */
listingSchema.pre('save', function(next) {
  // Sanity check to make sure name and code are provided
  if (this.name == undefined) throw '[DB]: name not provided';
  if (this.code == undefined) throw '[DB]: code not provided';

  // Get date object
  var currDate = new Date();
  // Update the updated_at property
  this.updated_at = currDate;
  // If created_at is not present then create it
  if (!this.created_at) this.created_at = currDate;
  // Pass onto next middleware
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = Listing;
