const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');
const ProductSchema = new mongoose.Schema( {
 user: {
   nickname: {
    type: String,
    require: true
   },
 },
 client: {
   name: {
     type: String,
     required: false,

   },
   email: {
     type: String,
     required: false,
   }
 },
 info: {
   product_id: {
     type: String,
     required: true,
   },
 },
 finished: {
  type: Boolean,
  default: false,
}
 
});
 
//ProductSchema.plugin(mongoosePaginate);
 mongoose.model('Client', ProductSchema);