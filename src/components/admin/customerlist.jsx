'use client';
import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { HeartHandshake } from 'lucide-react';

const fetchCustomer = async () => {
    const res = await axios.get("/api/user-routes/get-all-users");
    return res.data.users;
}

function Customerlist() {

    const { data, isLoading } = useQuery({
        queryKey: ["customerList"],
        queryFn: fetchCustomer,
    });

    const customers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: 'Active',
            statusColor: 'bg-green-200 text-green-800',
            dateJoined: '2023-01-15',
            selected: false,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            status: 'Inactive',
            statusColor: 'bg-red-200 text-red-800',
            dateJoined: '2022-12-10',
            selected: false,
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            status: 'Active',
            statusColor: 'bg-green-200 text-green-800',
            dateJoined: '2023-02-20',
            selected: false,
        },
        {
            id: 4,
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            status: 'Inactive',
            statusColor: 'bg-red-200 text-red-800',
            dateJoined: '2022-11-05',
            selected: false,
        },
        {
            id: 5,
            name: 'Charlie Davis',
            email: 'charlie.davis@example.com',
            status: 'Active',
            statusColor: 'bg-green-200 text-green-800',
            dateJoined: '2023-03-12',
            selected: false,
        },
    ];

    return (
        <div className="flex flex-col md:flex-row w-full rounded-[16px] border-2 border-[#0a1217] border-dashed overflow-x-scroll bg-[#f3f4e9] hide-scrollbar">

            {/* Main content */}
            <main className="flex-1 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-[#0a1217] select-none">
                        Customers
                    </h1>
                    <div className="flex items-center space-x-3">
                        <Button
                            aria-label="Search"
                            className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-white flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]"
                        >
                            <HeartHandshake />
                        </Button>
                    </div>
                </div>

                {/* Filters and sort */}
                <div className="flex flex-wrap gap-3 mb-4 items-center">
                    <select
                        aria-label="Filter by status"
                        className="rounded-md border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#0a1217] focus:outline-none focus:ring-2 focus:ring-[#ffd966]"
                    >
                        <option>Any status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <div className="ml-auto">
                        <select
                            aria-label="Sort by"
                            className="rounded-md border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#0a1217] focus:outline-none focus:ring-2 focus:ring-[#ffd966]"
                        >
                            <option>Sort by Name</option>
                            <option>Sort by Email</option>
                            <option>Sort by Date Joined</option>
                        </select>
                    </div>
                </div>

                {/* Customers table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-separate border-spacing-y-1 text-sm text-[#0a1217]">
                        <thead>
                            <tr className="text-left text-[#0a1217] font-semibold select-none">
                                {/* <th className="w-10 pl-3">
                                    <input
                                        aria-label="Select all customers"
                                        type="checkbox"
                                        className="w-4 h-4 rounded border border-[#d9d9d9] checked:bg-[#0a1217] checked:border-[#0a1217]"
                                    />
                                </th> */}
                                <th className="w-36">Customer</th>
                                <th className="w-36">Email</th>
                                <th className="w-20">Status</th>
                                <th className="w-24">Date Joined</th>
                                <th className="w-10 pr-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((customer) => (
                                <tr
                                    key={customer._id}
                                    className="hover:bg-[#ffffff] cursor-pointer"
                                >
                                    {/* <td className="pl-3">
                                        <input
                                            aria-label={`Select customer ${customer.id}`}
                                            type="checkbox"
                                            defaultChecked={customer.selected}
                                            className={`w-4 h-4 rounded border border-[#d9d9d9] ${customer.selected ? "checked:bg-[#0a1217] checked:border-[#0a1217]" : ""}`}
                                        />
                                    </td> */}
                                    <td className="py-2 font-semibold">{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold bg-green-200`}>
                                            Active
                                        </span>
                                    </td>
                                    <td>{new Date(customer.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="pr-3 cursor-pointer select-none">...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* customer-panel */}
            <aside className="w-72 min-w-[290px] bg-white rounded-r-[16px] p-5 flex flex-col justify-between border-l border-[#d9d9d9] hidden md:flex">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-[#0a1217] text-lg select-none">
                            Customer Details
                        </h2>
                        <Button
                            aria-label="Search"
                            className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-white flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]"
                        >
                            <HeartHandshake />
                        </Button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <img
                            alt="Profile picture of the customer"
                            className="w-16 h-16 rounded-full object-cover mb-2"
                            height="64"
                            src="https://storage.googleapis.com/a1aa/image/24ddd313-0be0-4330-8901-c1bfa7c021fc.jpg"
                            width="64"
                        />
                        <p className="font-semibold text-[#0a1217] select-none">John Doe</p>
                        <p className="text-[#6b7280] text-sm">john.doe@example.com</p>
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${customers[0].statusColor}`}>
                            {customers[0].status}
                        </span>
                        <p className="text-xs text-[#6b7280] select-none">Joined on {customers[0].dateJoined}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-[#0a1217] mb-3 select-none">
                            Recent Orders
                        </h3>
                        <ul className="space-y-2 text-xs text-[#0a1217]">
                            <li className="flex justify-between">
                                <span>Order #12345</span>
                                <span>$150.00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Order #12346</span>
                                <span>$200.00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Order #12347</span>
                                <span>$75.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 flex space-x-3">
                    <button className="flex-1 bg-[#0a1217] text-white rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#1a2228] transition-colors">
                        <span>Contact</span>
                        <i className="fas fa-envelope"></i>
                    </button>
                    <button className="flex-1 bg-[#fff176] text-[#0a1217] rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#f7f59e] transition-colors">
                        <span>View Orders</span>
                        <i className="fas fa-eye"></i>
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Customerlist