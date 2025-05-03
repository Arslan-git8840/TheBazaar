'use client';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "../ui/button";



const orderItems = [
    {
        name: "Ryobi ONE drill/driver",
        price: "$409.00",
        img: "https://storage.googleapis.com/a1aa/image/3619ec21-ffa6-47fd-162f-5e4e7e15006e.jpg",
        alt: "Ryobi ONE drill/driver with green and black color",
    },
    {
        name: "Socket Systeme Electric",
        price: "$238.00",
        img: "https://storage.googleapis.com/a1aa/image/6ec76f03-5191-4374-b835-a29bc94372a7.jpg",
        alt: "Socket Systeme Electric, black and gray electric socket",
    },
    {
        name: "DVB-T2 receiver bbk",
        price: "$139.00",
        img: "https://storage.googleapis.com/a1aa/image/999a1805-31e9-469c-0c21-e85b0fc21716.jpg",
        alt: "DVB-T2 receiver bbk, black rectangular device",
    },
    {
        name: "Inforce oil-free compressor",
        price: "$135.00",
        img: "https://storage.googleapis.com/a1aa/image/18712004-f6f0-4944-9867-4f9e45ab5831.jpg",
        alt: "Inforce oil-free compressor, black compressor machine",
    },
    {
        name: "TIG-200 welding inverter",
        price: "$699.00",
        img: "https://storage.googleapis.com/a1aa/image/1fd17f1e-b0be-4669-8eef-73fd2825b72d.jpg",
        alt: "TIG-200 welding inverter, orange welding machine",
    },
];

const fetchOrder = async () => {
    const res = await axios.get("/api/order/get-all-orders");
    return res.data.orders;
}

export default function Orderlist() {

    const statusColors = {
        processing: "bg-yellow-300 text-yellow-700",
        cancelled: "bg-red-300 text-red-700",
        shipped: "bg-blue-300 text-blue-700",
        delivered: "bg-green-300 text-green-700",
    };

    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrder,
    });

    return (
        <div className="flex flex-col md:flex-row w-full rounded-[16px] border-2 border-[#0a1217] border-dashed overflow-x-scroll bg-[#f3f4e9] hide-scrollbar">
            {/* Sidebar */}
            {/* <aside className="bg-[#0a1217] w-48 flex flex-col justify-between p-6 text-[#cbd5db]">
                <div>
                    <div className="flex items-center mb-10 space-x-2">
                        <i className="fas fa-waveform-path text-white text-xl"></i>
                        <span className="text-white font-semibold text-lg select-none">
                            ProfitPulse
                        </span>
                    </div>

                    <nav className="space-y-3 text-sm font-medium">
                        <Link
                            href="#"
                            className="flex items-center space-x-3 text-[#a0a9b0] hover:text-white transition-colors"
                        >
                            <i className="fas fa-home text-base"></i>
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 bg-white text-[#0a1217] rounded-lg px-3 py-2 font-semibold"
                        >
                            <i className="fas fa-th-large text-base"></i>
                            <span>Orders</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 text-[#a0a9b0] hover:text-white transition-colors"
                        >
                            <i className="fas fa-credit-card text-base"></i>
                            <span>Payments</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 text-[#a0a9b0] hover:text-white transition-colors"
                        >
                            <i className="fas fa-user-friends text-base"></i>
                            <span>Customers</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 text-[#a0a9b0] hover:text-white transition-colors"
                        >
                            <i className="fas fa-file-alt text-base"></i>
                            <span>Reports</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 text-[#a0a9b0] hover:text-white transition-colors"
                        >
                            <i className="fas fa-chart-bar text-base"></i>
                            <span>Statistic</span>
                        </Link>
                    </nav>

                    <div className="mt-10 space-y-3 text-sm font-medium text-[#a0a9b0]">
                        <Link
                            href="#"
                            className="flex items-center space-x-3 hover:text-white transition-colors"
                        >
                            <i className="fas fa-bell"></i>
                            <span>Notification</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 hover:text-white transition-colors"
                        >
                            <i className="fas fa-info-circle"></i>
                            <span>Help</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 hover:text-white transition-colors"
                        >
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </Link>
                        <hr className="border-[#1a2228] my-3" />
                        <Link
                            href="#"
                            className="flex items-center space-x-3 hover:text-white transition-colors text-sm"
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Log out</span>
                        </Link>
                    </div>
                </div>
            </aside> */}
            {/* Main content */}
            <main className="flex-1 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-[#0a1217] select-none">
                        Orders
                    </h1>
                    <div className="flex items-center space-x-3">
                        <Button
                            aria-label="Messages"
                            className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-white flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]"
                        >
                            <i className="far fa-envelope"></i>
                        </Button>
                        <Button
                            aria-label="Search"
                            className="w-9 h-9 rounded-md border border-[#d9d9d9] bg-white flex items-center justify-center text-[#0a1217] hover:bg-[#f0f0f0]"
                        >
                            <i className="fas fa-search"></i>
                        </Button>
                        <div className="flex items-center space-x-3 bg-white rounded-md px-3 py-1.5">
                            <img
                                alt="Profile picture of Kristina Evans smiling, wearing a pink top"
                                className="w-8 h-8 rounded-full object-cover"
                                height="32"
                                src="https://storage.googleapis.com/a1aa/image/5799c8ea-a92e-46cc-d5fd-3c9cb7f77821.jpg"
                                width="32"
                            />
                            <div className="text-sm leading-tight">
                                <p className="font-semibold text-[#0a1217]">Kristina Evans</p>
                                <p className="text-[#6b7280]">kris.evans@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Filters and sort */}
                <div className="flex flex-wrap gap-3 mb-4 items-center">
                    <select
                        aria-label="Filter by status"
                        className="rounded-md border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#0a1217] focus:outline-none focus:ring-2 focus:ring-[#ffd966]"
                    >
                        <option>Any status</option>
                        <option>Paid</option>
                        <option>Delivered</option>
                        <option>Completed</option>
                    </select>
                    <select
                        aria-label="Filter by price range"
                        className="rounded-md border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#0a1217] focus:outline-none focus:ring-2 focus:ring-[#ffd966]"
                    >
                        <option>$100—$1500</option>
                        <option>$0—$100</option>
                        <option>$1500+</option>
                    </select>
                    <div className="ml-auto">
                        <select
                            aria-label="Sort by"
                            className="rounded-md border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#0a1217] focus:outline-none focus:ring-2 focus:ring-[#ffd966]"
                        >
                            <option>Sort by Date</option>
                            <option>Sort by Total</option>
                            <option>Sort by Status</option>
                        </select>
                    </div>
                </div>
                {/* Orders table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-separate border-spacing-y-1 text-sm text-[#0a1217]">
                        <thead>
                            <tr className="text-left text-[#0a1217] font-semibold select-none">
                                {/* <th className="w-10 pl-3">
                                    <input
                                        aria-label="Select all orders"
                                        type="checkbox"
                                        className="w-4 h-4 rounded border border-[#d9d9d9] checked:bg-[#0a1217] checked:border-[#0a1217]"
                                    />
                                </th> */}
                                <th className="w-46">Order</th>
                                <th className="w-36">Customer</th>
                                <th className="w-20">Status</th>
                                <th className="w-24">Total</th>
                                <th className="w-20">Date</th>
                                <th className="w-10 pr-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((order) => (
                                <tr
                                    key={order._id}
                                >
                                    {/* <td className="pl-3">
                                        <input
                                            aria-label={`Select order ${order.id}`}
                                            type="checkbox"
                                            defaultChecked={order.selected}
                                            className={`w-4 h-4 rounded border border-[#d9d9d9] ${order.selected
                                                ? "checked:bg-[#0a1217] checked:border-[#0a1217]"
                                                : ""
                                                }`}
                                        />
                                    </td> */}
                                    <td className="py-2 font-semibold">{order.product.name}</td>
                                    <td className="flex items-center space-x-2">
                                        <img
                                            alt={`Profile picture of ${order.product._id}`}
                                            className="w-6 h-6 rounded-full object-cover"
                                            height="24"
                                            src={'https://storage.googleapis.com/a1aa/image/e8123ad2-8373-4d02-a737-545b5a880010.jpg'}
                                            width="24"
                                        />
                                        <span>{order.user.name}</span>
                                    </td>
                                    <td>
                                        <span
                                            className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${statusColors[order.orderStatus] || "bg-gray-300 text-gray-700"}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>

                                    <td className="font-semibold">${order.totalAmount}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="pr-3 cursor-pointer select-none">...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* Order details panel */}
            <aside className="w-72 min-w-[290px] bg-white rounded-r-[16px] p-5 flex flex-col justify-between border-l border-[#d9d9d9] hidden md:flex">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-[#0a1217] text-lg select-none">
                            Order <span className="font-bold">#390561</span>
                        </h2>
                        <button
                            aria-label="Close order details"
                            className="text-[#6b7280] hover:text-[#0a1217] transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="inline-block rounded px-2 py-0.5 text-xs font-semibold bg-[#fff176] text-[#5a4d00]">
                            Paid
                        </span>
                        <span className="text-xs text-[#6b7280] select-none">
                            Jan 8, 13:52
                        </span>
                    </div>
                    <div className="flex flex-col items-center mb-6">
                        <img
                            alt="Profile picture of James Miller with yellow background and glasses"
                            className="w-16 h-16 rounded-full object-cover mb-2"
                            height="64"
                            src="https://storage.googleapis.com/a1aa/image/24ddd313-0be0-4330-8901-c1bfa7c021fc.jpg"
                            width="64"
                        />
                        <p className="font-semibold text-[#0a1217] select-none">James Miller</p>
                        <div className="flex space-x-3 mt-3">
                            <button
                                aria-label="Send email to James Miller"
                                className="w-9 h-9 rounded-full bg-[#f3f4e9] flex items-center justify-center text-[#0a1217] hover:bg-[#e0e2d7]"
                            >
                                <i className="far fa-envelope"></i>
                            </button>
                            <button
                                aria-label="Call James Miller"
                                className="w-9 h-9 rounded-full bg-[#f3f4e9] flex items-center justify-center text-[#0a1217] hover:bg-[#e0e2d7]"
                            >
                                <i className="fas fa-phone"></i>
                            </button>
                            <button
                                aria-label="WhatsApp James Miller"
                                className="w-9 h-9 rounded-full bg-[#f3f4e9] flex items-center justify-center text-[#0a1217] hover:bg-[#e0e2d7]"
                            >
                                <i className="fab fa-whatsapp"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#0a1217] mb-3 select-none">
                            Order items
                        </h3>
                        <ul className="space-y-4 text-xs text-[#0a1217]">
                            {orderItems.map((item) => (
                                <li key={item.name} className="flex space-x-3 items-center">
                                    <img
                                        alt={item.alt}
                                        className="w-10 h-10 object-contain rounded"
                                        height="40"
                                        src={item.img}
                                        width="40"
                                    />
                                    <div>
                                        <p>{item.name}</p>
                                        <p className="font-semibold mt-0.5">{item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6 border-t border-[#d9d9d9] pt-4 flex items-center justify-between text-sm font-semibold text-[#0a1217] select-none">
                    <span>Total</span>
                    <span className="text-lg">$1,620.00</span>
                </div>
                <div className="mt-4 flex space-x-3">
                    <button className="flex-1 bg-[#0a1217] text-white rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#1a2228] transition-colors">
                        <span>Track</span>
                        <i className="fas fa-eye"></i>
                    </button>
                    <button className="flex-1 bg-[#fff176] text-[#0a1217] rounded-md py-2 font-semibold flex items-center justify-center space-x-2 hover:bg-[#f7f59e] transition-colors">
                        <span>Refund</span>
                        <i className="fas fa-undo-alt"></i>
                    </button>
                </div>
            </aside>
        </div>
    );
}

// const orders = [
//     {
//         id: "#390561",
//         customer: "Michelle Black",
//         status: "Paid",
//         total: "$780.00",
//         date: "Jan 8",
//         img: "https://storage.googleapis.com/a1aa/image/a9a2b5cf-cfe1-4b7b-397f-26701760875d.jpg",
//         statusColor: "bg-[#fff176] text-[#5a4d00]",
//         selected: false,
//     },
//     {
//         id: "#663334",
//         customer: "Janice Chandler",
//         status: "Delivered",
//         total: "$1,250.00",
//         date: "Jan 6",
//         img: "https://storage.googleapis.com/a1aa/image/e8123ad2-8373-4d02-a737-545b5a880010.jpg",
//         statusColor: "bg-[#f4a261] text-[#6b3f00]",
//         selected: false,
//     },
//     {
//         id: "#418135",
//         customer: "Mildred Hall",
//         status: "Paid",
//         total: "$540.95",
//         date: "Jan 5",
//         img: "https://storage.googleapis.com/a1aa/image/26a21450-f6ef-41be-f7a0-92ee1c567c25.jpg",
//         statusColor: "bg-[#fff176] text-[#5a4d00]",
//         selected: true,
//     },
//     {
//         id: "#801999",
//         customer: "Ana Carter",
//         status: "Paid",
//         total: "$1,489.00",
//         date: "Jan 2",
//         img: "https://storage.googleapis.com/a1aa/image/e51ffa2b-0349-4547-8b05-e0e381d23e26.jpg",
//         statusColor: "bg-[#fff176] text-[#5a4d00]",
//         selected: false,
//     },
//     {
//         id: "#517783",
//         customer: "John Sherman",
//         status: "Completed",
//         total: "$925.00",
//         date: "Dec 28",
//         img: "https://storage.googleapis.com/a1aa/image/586e7ba3-d132-4c79-c5b2-a47d19057932.jpg",
//         statusColor: "bg-[#a6f4c5] text-[#064e3b]",
//         selected: false,
//     },
//     // {
//     //     id: "#602992",
//     //     customer: "James Miller",
//     //     status: "Paid",
//     //     total: "$1,620.00",
//     //     date: "Dec 26",
//     //     img: "https://storage.googleapis.com/a1aa/image/24ddd313-0be0-4330-8901-c1bfa7c021fc.jpg",
//     //     statusColor: "bg-[#fff176] text-[#5a4d00]",
//     //     selected: true,
//     // },
//     // {
//     //     id: "#730345",
//     //     customer: "Travis French",
//     //     status: "Paid",
//     //     total: "$315.50",
//     //     date: "Dec 22",
//     //     img: "https://storage.googleapis.com/a1aa/image/45bc4602-4060-4a3d-6b02-a81ebc812d86.jpg",
//     //     statusColor: "bg-[#fff176] text-[#5a4d00]",
//     //     selected: true,
//     // },
//     // {
//     //     id: "#126955",
//     //     customer: "Ralph Hall",
//     //     status: "Paid",
//     //     total: "$1,267.45",
//     //     date: "Dec 20",
//     //     img: "https://storage.googleapis.com/a1aa/image/746a8ccd-12d1-4fca-654e-10eb179c3a8a.jpg",
//     //     statusColor: "bg-[#fff176] text-[#5a4d00]",
//     //     selected: false,
//     // },
//     // {
//     //     id: "#045321",
//     //     customer: "Gary Gilbert",
//     //     status: "Completed",
//     //     total: "$287.00",
//     //     date: "Dec 18",
//     //     img: "https://storage.googleapis.com/a1aa/image/dfffcac1-7201-48be-3865-386ee87b5270.jpg",
//     //     statusColor: "bg-[#a6f4c5] text-[#064e3b]",
//     //     selected: true,
//     // },
//     // {
//     //     id: "#082848",
//     //     customer: "Frances Howell",
//     //     status: "Delivered",
//     //     total: "$1,740.00",
//     //     date: "Dec 17",
//     //     img: "https://storage.googleapis.com/a1aa/image/cdb094d4-7954-4b32-9afd-aa1e7be42ce1.jpg",
//     //     statusColor: "bg-[#f4a261] text-[#6b3f00]",
//     //     selected: false,
//     // },
//     // {
//     //     id: "#646072",
//     //     customer: "Herbert Boyd",
//     //     status: "Paid",
//     //     total: "$714.00",
//     //     date: "Dec 14",
//     //     img: "https://storage.googleapis.com/a1aa/image/8cdefe51-e33e-4db0-d34c-3a4967b67bee.jpg",
//     //     statusColor: "bg-[#fff176] text-[#5a4d00]",
//     //     selected: false,
//     // },
//     // {
//     //     id: "#432019",
//     //     customer: "Alan White",
//     //     status: "Paid",
//     //     total: "$267.65",
//     //     date: "Dec 13",
//     //     img: "https://storage.googleapis.com/a1aa/image/f3db1778-1a59-4c48-3814-e2e8b8676e3b.jpg",
//     //     statusColor: "bg-[#fff176] text-[#5a4d00]",
//     //     selected: false,
//     // },
//     // {
//     //     id: "#985927",
//     //     customer: "Julie Martin",
//     //     status: "Delivered",
//     //     total: "$389.00",
//     //     date: "Dec 11",
//     //     img: "https://storage.googleapis.com/a1aa/image/2eef6c85-cca5-48e6-e522-e659b329ed97.jpg",
//     //     statusColor: "bg-[#f4a261] text-[#6b3f00]",
//     //     selected: false,
//     // },
// ];