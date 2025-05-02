import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import SalesAnalytic from './SalesAnalytic';
import SalesTarget from './SalesTarget';
import TopSellingProducts from './TopSellingProducts';
import CurrentOffer from './CurrentOffer';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import Header from './Header';

const DashboardLayout= () => {
  return (
    // dfdaae
    <div className="p-6 w-full bg-[#F3F4E9] rounded-[16px] border-2 border-[#0a1217] border-dashed">
      <Header/>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AnalyticsCard 
          title="Total Revenue" 
          value="$82,650" 
          period="Last 30 days" 
          percentChange={11} 
          icon={<DollarSign size={24} color="#66D1B7" />}
        />
        <AnalyticsCard 
          title="Total Order" 
          value="1645" 
          period="Last 30 days" 
          percentChange={11} 
          icon={<ShoppingCart size={24} color="#66D1B7" />}
        />
        <AnalyticsCard 
          title="Total Customer" 
          value="1,462" 
          period="Last 30 days" 
          percentChange={-17} 
          icon={<Users size={24} color="#66D1B7" />}
        />
        <AnalyticsCard 
          title="Pending Delivery" 
          value="117" 
          period="Last 30 days" 
          percentChange={5} 
          icon={<Package size={24} color="#66D1B7" />}
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesAnalytic />
        </div>
        <div>
          <SalesTarget />
        </div>
      </div>

      {/* Products and Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopSellingProducts />
        </div>
        <div>
          <CurrentOffer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;