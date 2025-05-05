'use client';
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import DashboardLayout from "@/components/admin/Dashboard/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const dbUser = async () => {
      if (!email) return;
      try {
        const dbRes = await axios.get("/api/user-routes/get-user-by-email", {
          params: { email },
        });
        const role = dbRes?.data?.user?.role;
        if (role !== "admin") {
          router.push("/");
        }
      } catch (error) {
        console.log("Fetch userId error:", error);
      }
    };

    dbUser();
  }, [email, router]);

  return (
    <div className="w-full flex flex-1">
      <DashboardLayout />
    </div>
  );
}
