'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  // const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      // toast({
      //   title: "Error",
      //   description: "Please enter your email address",
      //   variant: "destructive",
      // });
      return;
    }
    
    // Here you would normally make an API call to subscribe the user
    // toast({
    //   title: "Success!",
    //   description: "You've been subscribed to our newsletter",
    // });
    
    setEmail("");
  };
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest updates, exclusive offers and special discounts delivered directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </form>
          
          <div className="mt-4 text-sm text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
