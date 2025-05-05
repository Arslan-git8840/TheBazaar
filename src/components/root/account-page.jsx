'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/root/account/ProfileTab";
// import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const fetchUser = async () => {
    const { data } = await axios.get("/api/user-routes/get-user-by-email", {
      params: { email },
    });
    return data.user;
  };

  const { data: dbUser, isLoading, error } = useQuery({
    queryKey: ['user', email],
    queryFn: fetchUser,
    enabled: !!email,
  });

  const handleUpdateProfile = async (data) => {
    console.log(data);
    await axios.post('/api/user-routes/update-user', {
      userDetails: data
    });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error fetching user</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 md:p-8 p-2 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
          <Tabs defaultValue="account" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <TabsList className="bg-transparent border-b-0">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#3B82F6] data-[state=active]:text-[#3B82F6] rounded-none px-6 py-3 data-[state=active]:shadow-none"
                >
                  Account
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="p-6">
              <TabsContent value="account">
                <ProfileTab user={dbUser} onUpdate={handleUpdateProfile} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
