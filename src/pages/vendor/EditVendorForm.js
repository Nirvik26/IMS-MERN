import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateVendor } from './vendor';
import { useSelector } from 'react-redux';
import { selectedVendor } from '../../redux/features/vendor/vendorSlice';

function EditVendorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const vendorData = useSelector(selectedVendor);

  useEffect(() => {
    // Populate form fields with existing vendor data when component mounts
    setValue('name', vendorData.name);
    setValue('email', vendorData.email);
    setValue('phone', vendorData.phone);
    setValue('address', vendorData.address);
    setValue('products', vendorData.products);
    setValue('quantity', vendorData.quantity);
  }, [vendorData, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const updatedVendor = await updateVendor(vendorData.id, data);
      console.log('Vendor updated:', updatedVendor);
      // You can perform further actions after updating the vendor
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        {...register('name', {
          required: true,
          pattern: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
        })}
      />
      {errors.name && errors.name.type === 'required' && (
        <span>Name is required</span>
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <span>Name must contain only letters</span>
      )}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        {...register('email', {
          required: true,
          pattern:
            /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@(?:gmail|yahoo|outlook)\.(?:com|org|net)$/,
        })}
      />
      {errors.email && errors.email.type === 'required' && (
        <span>Email is required</span>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <span>Email not valid</span>
      )}

      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        {...register('phone', {
          required: true,
          pattern: /^\d{10}$/,
        })}
      />
      {errors.phone && errors.phone.type === 'required' && (
        <span>Phone is required</span>
      )}
      {errors.phone && errors.phone.type === 'pattern' && (
        <span>Phone must be exactly 10 digits long</span>
      )}

      <label htmlFor="address">Address:</label>
      <textarea id="address" {...register('address', { required: true })} />
      {errors.address && <span>Address is required</span>}

      <button type="submit">Update</button>
    </form>
  );
}

export default EditVendorForm;
