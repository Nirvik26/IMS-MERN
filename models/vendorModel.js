const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      minLength: [10, 'Phone number must be up to 10 digits'],
      maxLength: [10, 'Phone number must be 10 digits only'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
    products: [
      {
        type: String,
        ref: 'Product',
      },
    ],
    quantity: [
      {
        type: String,
        required: [true, 'Please add quantity'],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;
