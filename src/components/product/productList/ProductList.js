import React, { useEffect, useState } from 'react';
import { SpinnerImg } from '../../loader/Loader';
import './productList.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import Search from '../../search/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from '../../../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  deleteProduct,
  getProducts,
} from '../../../redux/features/product/productSlice';
import { Link } from 'react-router-dom';

// Quick sort implementation
const quickSort = (arr, property) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][property] < pivot[property]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left, property), pivot, ...quickSort(right, property)];
};

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState('');
  const filteredProducts = useSelector(selectFilteredPoducts);
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (selectedCategory) {
      const filteredByCategory = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
      setCurrentItems(filteredByCategory.slice(0, itemsPerPage));
      setPageCount(Math.ceil(filteredByCategory.length / itemsPerPage));
    } else {
      setCurrentItems(filteredProducts.slice(0, itemsPerPage));
      setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }
  }, [selectedCategory, filteredProducts, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  // Sort products by name before rendering
  useEffect(() => {
    // Sort filteredProducts by name
    const sortedProducts = quickSort(filteredProducts, 'name');

    // Calculate pagination variables
    const endOffset = itemOffset + itemsPerPage;
    const paginatedItems = sortedProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

    // Update state
    setCurrentItems(paginatedItems);
    setPageCount(pageCount);
  }, [itemOffset, itemsPerPage, filteredProducts]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          <span className="category-dropdown">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </span>
        </div>
        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const {
                    _id,
                    name,
                    category,
                    price,
                    quantity,
                    totalprice = price * quantity,
                  } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {'Rs '}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>{`Rs ${totalprice}`}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={'purple'} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={'green'} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={'red'}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
