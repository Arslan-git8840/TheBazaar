import React from 'react';
import { Bell, CreditCard, Settings, Star, User, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettings() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f7fa]">
      {/* Main Settings Panel */}
      <main className="flex-1 bg-white p-4 sm:p-6 lg:p-8 rounded-none lg:rounded-l-3xl shadow-xl">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search for product"
            className="border rounded-full px-4 py-2 w-full sm:w-1/2 text-sm focus:outline-none"
          />
          <div className="flex flex-col items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between">
            <Button className="bg-[#0f1b3f] text-white w-full sm:w-auto">Upload New</Button>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">John</div>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8 text-[#0f1b3f]">
          {/* Sidebar */}
          <div className="space-y-4 lg:w-64 w-full">
            <div className="flex items-start gap-2 cursor-pointer border-l-4 lg:border-r-4 lg:border-l-0 border-orange-500 pl-2 lg:pl-0 lg:pr-2">
              <User size={18} />
              <div>
                <h2 className="font-semibold text-sm">Your Account</h2>
                <p className="text-xs text-gray-500">Details of your account</p>
              </div>
            </div>
            <div className="flex items-start gap-2 cursor-pointer text-gray-600">
              <CreditCard size={18} />
              <div>
                <h2 className="font-semibold text-sm">Billings</h2>
                <p className="text-xs">Setup payment methods</p>
              </div>
            </div>
            <div className="flex items-start gap-2 cursor-pointer text-gray-600">
              <Bell size={18} />
              <div>
                <h2 className="font-semibold text-sm">Notification settings</h2>
                <p className="text-xs">Custom your notifications</p>
              </div>
            </div>
            <div className="flex items-start gap-2 cursor-pointer text-gray-600">
              <Star size={18} />
              <div>
                <h2 className="font-semibold text-sm">Product feedback</h2>
                <p className="text-xs">Customer feedback and reviews</p>
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div className="flex-1 space-y-6 w-full">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0f1b3f]">
                John Doe <span className="text-red-400 text-sm ml-2 cursor-pointer">(Change)</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-white">
                <User />
              </div>
              <div className="text-sm space-y-2 sm:space-x-3">
                <Button className="bg-transparent text-blue-600 hover:underline px-0">Upload New Picture</Button>
                <Button className="bg-transparent text-red-500 hover:underline px-0">Remove</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email address</label>
                <div className="flex flex-col sm:flex-row gap-2 mt-1">
                  <input
                    type="email"
                    defaultValue="johnathan.may@gmail.com"
                    className="border rounded-md px-3 py-2 text-sm w-full"
                  />
                  <Button className="bg-[#0f1b3f] text-white w-full sm:w-auto">Update</Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="flex flex-col sm:flex-row gap-2 mt-1">
                  <input
                    type="password"
                    defaultValue="***********"
                    className="border rounded-md px-3 py-2 text-sm w-full"
                  />
                  <Button className="bg-[#0f1b3f] text-white w-full sm:w-auto">Update</Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" defaultChecked className="accent-orange-500 w-5 h-5" />
                <span className="text-sm font-medium">Password reset protection: <span className="text-orange-500">on</span></span>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-red-600">Delete Account</label>
                <p className="text-sm text-gray-500">
                  By deleting your account you will lose all your saved data
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Button className="bg-red-500 text-white w-full sm:w-auto">Delete</Button>
                  <Button className="bg-orange-500 text-white w-full sm:w-auto">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
