const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')


const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String, 
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        max: [10, 'Store ID must be less than 10 characters'],

    },
    address: {
        type: String,
        required: [true, "Please add a address"]
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
          },
          coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//geocode and create location
StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    console.log(loc, "loc");
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    //do not save address
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', StoreSchema);