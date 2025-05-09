'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { HeartHandshake, Plus } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const res = await axios.get('/api/all-product');
  return res.data.productss;
};

function ProductList() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['productList'],
    queryFn: fetchProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col md:flex-row w-full rounded-[16px] border-2 border-[#0a1217] border-dashed overflow-x-scroll bg-[#f3f4e9] hide-scrollbar">
      <main className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-[#0a1217] select-none">Products</h1>
          <div className="flex items-center space-x-3">
            <Link href="/admin/products/add">
              <Button className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-[#3baa99] flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]">
                <Plus />
              </Button>
            </Link>
            <Button
              aria-label="Search"
              className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-white flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]"
            >
              <HeartHandshake />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <select className="rounded-md border px-3 py-1.5 text-sm focus:ring-[#ffd966]">
            <option>All status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div className="ml-auto">
            <select className="rounded-md border px-3 py-1.5 text-sm focus:ring-[#ffd966]">
              <option>Sort by Name</option>
              <option>Sort by Category</option>
              <option>Sort by Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-1 text-sm text-[#0a1217]">
            <thead>
              <tr className="text-left font-semibold select-none">
                <th className="w-10 pl-3">
                  <input type="checkbox" className="w-4 h-4 rounded border" />
                </th>
                <th className="w-36">Product</th>
                <th className="w-36">Category</th>
                <th className="w-24">Price</th>
                <th className="w-20">Stock</th>
                <th className="w-20">Status</th>
                <th className="w-10 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} onClick={() => handleProductClick(product)} className="cursor-pointer hover:bg-gray-100">
                  <td className="pl-3">
                    <input type="checkbox" className="w-4 h-4 rounded border" />
                  </td>
                  <td className="py-2 font-semibold">{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${product.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {product.stock > 0 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="pr-3">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <aside className="w-72 min-w-[290px] bg-white rounded-r-[16px] p-5 flex-col justify-between border-l border-[#d9d9d9] hidden md:flex">
        {selectedProduct ? (
          <>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[#0a1217] text-lg">Product Details</h2>
                <Button className="text-[#6b7280] hover:text-[#0a1217]" onClick={() => setSelectedProduct(null)}>
                  <i className="fas fa-times"></i>
                </Button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <img
                  alt="Product preview"
                  className="w-16 h-16 rounded-full object-cover mb-2"
                  src={selectedProduct.images[0]} // selectedProduct.thumbnail
                />
                <p className="font-semibold">{selectedProduct.name}</p>
                <p className="text-sm text-[#6b7280]">{selectedProduct.category}</p>
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${selectedProduct.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {selectedProduct.stock > 0 ? 'Active' : 'Inactive'}
                </span>
                <p className="text-xs text-[#6b7280]">Stock: {selectedProduct.stock}</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#0a1217] mb-3">Sales History</h3>
                <ul className="space-y-2 text-xs text-[#0a1217]">
                  <li className="flex justify-between">
                    <span>Jan 10</span>
                    <span>$240</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Feb 15</span>
                    <span>$320</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mar 12</span>
                    <span>$180</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <Button className="flex-1 bg-[#0a1217] text-white rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#1a2228]">
                <span>Edit</span>
                <i className="fas fa-edit"></i>
              </Button>
              <Button className="flex-1 bg-[#fff176] text-[#0a1217] rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#f7f59e]">
                <span>Delete</span>
                <i className="fas fa-trash-alt"></i>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-10">Click a product to see details</p>
        )}
      </aside>
    </div>
  );
}

export default ProductList;



// const products = [
//     {
//         id: 1,
//         name: 'Nike Air Max',
//         category: 'Shoes',
//         price: '$120',
//         stock: 20,
//         status: 'Active',
//         statusColor: 'bg-green-200 text-green-800',
//         image: '/nike.jpg',
//     },
//     {
//         id: 2,
//         name: 'Adidas Ultraboost',
//         category: 'Shoes',
//         price: '$140',
//         stock: 0,
//         status: 'Inactive',
//         statusColor: 'bg-red-200 text-red-800',
//         image: '/nike.jpg',
//     },
//     {
//         id: 3,
//         name: 'Puma RS-X',
//         category: 'Sneakers',
//         price: '$110',
//         stock: 15,
//         status: 'Active',
//         statusColor: 'bg-green-200 text-green-800',
//         image: '/nike.jpg/nike.jpg',
//     },
//     {
//         id: 4,
//         name: 'Reebok Classic',
//         category: 'Casual',
//         price: '$90',
//         stock: 0,
//         status: 'Inactive',
//         statusColor: 'bg-red-200 text-red-800',
//         image: '/nike.jpg',
//     },
//     {
//         id: 5,
//         name: 'New Balance 574',
//         category: 'Running',
//         price: '$100',
//         stock: 12,
//         status: 'Active',
//         statusColor: 'bg-green-200 text-green-800',
//         image: '/nike.jpg',
//     },
// ];