import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVendor,
  getVendors,
  selectAllVendors,
  deleteVendor,
  selectedVendor,
} from '../../redux/features/vendor/vendorSlice';
import { BsPencil, BsTrash } from 'react-icons/bs';
import './vendorList.scss';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteProduct } from '../../redux/features/product/productSlice';

function VendorList() {
  const [sortedVendorList, setSortedVendorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const vendorList = useSelector(selectAllVendors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVendors());
  }, [dispatch]);

  useEffect(() => {
    const sortedList = quickSort(vendorList);
    setSortedVendorList(sortedList);
  }, [vendorList]);

  const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[arr.length - 1].name;
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].name < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quickSort(left), arr[arr.length - 1], ...quickSort(right)];
  };

  const vendorData = useSelector(selectedVendor);

  // const handleDelete = async (id, email) => {
  //   try {
  //     if (!email) {
  //       toast.error('Email is required');
  //       return;
  //     }
  //     const emailRegex =
  //       /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@(?:gmail|yahoo|outlook)\.(?:com|org|net)$/;
  //     if (!emailRegex.test(email)) {
  //       toast.error('Invalid email format');
  //       return;
  //     }

  //     confirmAlert({
  //       title: 'Delete Product',
  //       message: 'Are you sure you want to delete this vendor.',
  //       buttons: [
  //         {
  //           label: 'Delete',
  //           onClick: () => {
  //             if (id) {
  //               await dispatch(deleteVendor(id));
  //               toast.success('Vendor deleted successfully');
                
  //             }
  //           },
  //         },
  //         {
  //           label: 'Cancel',
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error('Error deleting vendor:', error);
  //     toast.error('Error deleting vendor');
  //   }
  // };


  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            dispatch(deleteVendor(id));
            toast.success("Vendor Successfully Deleted")
          }
          
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  const fuseOptions = {
    keys: ['name'],
    includeScore: true,
    threshold: 0.3,
  };

  const fuse = new Fuse(sortedVendorList, fuseOptions);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSortedVendorList(quickSort(vendorList));
    } else {
      const result = fuse.search(searchTerm);
      const searchResults = result.map((res) => res.item);
      setSortedVendorList(searchResults);
    }
  }, [searchTerm, vendorList]);

  return (
    <div>
      <h2>Vendor List</h2>
      <input
        className="search-bar-container"
        type="text"
        placeholder="Search vendors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedVendorList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>
                <Link to={`/vendor/edit/${item._id}`}>
                  <BsPencil className="edit-icon" />
                </Link>
                <BsTrash
                  className="delete-icon"
                  onClick={() => confirmDelete(item._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;
