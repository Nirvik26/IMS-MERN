import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateVendor } from './vendor';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVendor,
  selectedVendor,
} from '../../redux/features/vendor/vendorSlice';
import { useParams } from 'react-router-dom';
import "./VendorEdit.scss";

function VendorEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const vendorData = useSelector(selectedVendor);
  console.log(vendorData);
  useEffect(() => {
    dispatch(getVendor(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (vendorData) {
      setValue('name', vendorData.name);
      setValue('email', vendorData.email);
      setValue('phone', vendorData.phone);
      setValue('address', vendorData.address);
      setValue('products', vendorData.products);
      setValue('quantity', vendorData.quantity);
    }
  }, [vendorData, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const updatedVendor = await updateVendor(id, data); // Assuming updateVendor takes the vendor ID and updated data
      console.log('Vendor updated:', updatedVendor);
      // You can perform further actions after updating the vendor
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  return (
    <form className='vendor-edit' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        {...register('email', { required: true })}
      />
      {errors.email && <span>Email is required</span>}

      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" {...register('phone', { required: true })} />
      {errors.phone && <span>Phone is required</span>}

      <label htmlFor="address">Address:</label>
      <textarea id="address" {...register('address', { required: true })} />
      {errors.address && <span>Address is required</span>}

      <label htmlFor="products">Products:</label>
      <textarea id="products" {...register('products', { required: true })} />
      {errors.products && <span>Products are required</span>}

      <label htmlFor="quantity">Quantity:</label>
      <textarea id="quantity" {...register('quantity', { required: true })} />
      {errors.quantity && <span>Quantity is required</span>}

      <button type="submit">Update</button>
    </form>
  );
}

export default VendorEdit;
