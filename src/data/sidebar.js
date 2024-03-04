import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa';
import { GiShop } from 'react-icons/gi';
import { BiImageAdd, BiPlus } from 'react-icons/bi';

const menu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        path: '/edit-profile',
      },
    ],
  },
  {
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
  // {
  //   title: 'Catogories',
  //   icon: <BiCategory />,
  //   path: '/categories',
  // },
  {
    title: 'Vendor List',
    icon: <GiShop />,
    path: '/vendor',
  },
  {
    title: 'Add Vendor',
    icon: <BiPlus />,
    path: '/vendor/list',
  },
];

export default menu;
