var mongoose = require('mongoose');
var PledgeSchema = new mongoose.Schema({
  title: String,
  pledges: {type: Number, default: 0},
});
PledgeSchema.methods.pledge = function(cb) {
  this.pledges += 1;
  this.save(cb);
};
mongoose.model('Pledges', PledgeSchema);