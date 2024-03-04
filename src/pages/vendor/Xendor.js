import React from 'react';
import { useForm } from 'react-hook-form';
import { createVendor } from './vendor';
import './Xendor.scss';
import { toast } from 'react-toastify';

function Xendor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const newVendor = await createVendor(data);
      console.log('New vendor added:', newVendor);
      reset();
      toast.success('Vendor added successfully');
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <form className="xendor" onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit">Add</button>
    </form>
  );
}

export default Xendor;
