'use client';

import Link from 'next/link';
import {FileUploader} from '../fileUpload';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img src="/icons/bazaar-logo.png" alt="logo" className='w-36' />
              {/* <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-serif italic text-lg">fa</span>
                </div>
                <span className="ml-1 font-serif italic text-lg">gile.</span>
              </div> */}
            </Link>

            <p className="text-gray-600 mb-6 max-w-md">
              Our e-commerce platform offers a wide range of products with exceptional quality and customer service.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              >
                {/* Facebook icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.1 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              >
                {/* Twitter icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3.00005C22.04 3.68 20.98 4.19 19.86 4.53C19.26 3.84 18.46 3.35 17.57 3.12C16.68 2.9 15.74 2.96 14.88 3.28C14.02 3.61 13.29 4.19 12.77 4.95C12.26 5.71 11.99 6.61 12 7.53V8.53C10.24 8.58 8.5 8.19 6.93 7.4C5.36 6.61 4.01 5.44 3 4C3 4 -1 13 8 17C5.94 18.4 3.49 19.1 1 19C10 24 21 19 21 7.5C21 7.22 20.97 6.94 20.92 6.67C21.94 5.66 22.66 4.39 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              >
                {/* Instagram icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17 2H7C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 11.37C16.12 12.2 15.98 13.05 15.59 13.8C15.21 14.55 14.59 15.15 13.84 15.53C13.09 15.91 12.24 16.04 11.41 15.91C10.58 15.77 9.81 15.38 9.21 14.79C8.62 14.19 8.23 13.42 8.09 12.59C7.96 11.76 8.09 10.91 8.47 10.16C8.85 9.41 9.45 8.79 10.2 8.41C10.95 8.02 11.8 7.88 12.63 8C13.48 8.13 14.26 8.52 14.87 9.13C15.48 9.74 15.87 10.52 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-navy">Home</Link></li>
              <li><Link href="/orders" className="text-gray-600 hover:text-navy">Orders</Link></li>
              <li><Link href="/products" className="text-gray-600 hover:text-navy">Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> info@bazaar.com
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Phone:</span> +1 234 567 890
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Address:</span> 123 Commerce St, NY
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500">© 2025 Bazaar. All rights reserved.</p>
        </div>
      </div>
      <FileUploader/>
    </footer>
  );
};

export default Footer;
