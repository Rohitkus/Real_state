import mongoose from 'mongoose'

const listingScheme = new mongoose.Schema(
    {
      name:{
           type:String,
            required:true

      },
      description:{
        type:String,
        required:true
      },
      address:{
        type:String,
        required:true
      },
      regulatPrice:{
        type:Number,
        required:true

      },
      discountPrice:{
        type:Number,
        required:true
      },
      bathrooms:{
        type:Number,
        required:true
      },
      bedroom:{
        type:Number,
        required:true
      },
      furnished:{
        type:Boolean,
        required:true
      },
      parking:{
        type:Boolean,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      offer:{
        type:Boolean,
        required:true
      },
      imageUrls:{
        type:Array,
        required:true
      },
      userRef:{
        type:String,
        required:true
      }},{timestamps:true}
)

const Listing = mongoose.model("Listing",listingScheme)
export default Listing;