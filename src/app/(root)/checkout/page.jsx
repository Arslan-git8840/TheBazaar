'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";
import { useEContext } from "@/context/context";


const Checkout = () => {

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");


  const { user } = useUser();
  const { cartsItems } = useEContext();
  console.log('cartsItems', cartsItems);


  const checkout = async () => {
    setLoading(true)
    const fullName = `${firstName} ${lastName}`;
    try {
      // step-1 extracting email
      const email = user.emailAddresses[0].emailAddress;

      // step-2 extracting user id from db 
      const response = await axios.get('/api/user-routes/get-user-by-email',
        { params: { email } }
      )
      const userId = response?.data?.user._id;
      console.log(response, userId);

      // step-3 save shipping address

      const shipaddress = await axios.post('/api/shipping', {
        user: userId,
        fullName,
        phone,
        address,
        city,
        state: stateName,
        postalCode,
        country,
      })

      // step-4 extracting id of address

      const addressId = shipaddress?.data?.savedAddress?._id;
      console.log('addressId', addressId);

      // step-5 save order to the database

      await Promise.all(
        cartsItems.map(async (item) => {
          const savedOrder = await axios.post('/api/order/save-order', {
            user: userId,
            product: item.productId,
            quantity: item.quantity,
            price: item.price,
            shippingAddress: addressId,
            totalAmount: item.totalPrice,
          });
          console.log(savedOrder);
        })
      );

      // step-6 proceed to the payment page

      const stripeResponse = await axios.post('/api/stripe', {
        cartsItems
      })

      window.location.href = stripeResponse.data.session.url;

      // step-7 update the payment status in db

      const updateOrderPaymentStatus = await Promise.all(
        cartsItems.map(async (item) => {
          const updatedOrder = await axios.patch('/api/order/update-order-status', {
            productId: item.productId,
            paymentStatus: "paid"
          });
          console.log(updatedOrder);
        })
      )


      //   const savedOrder = await axios.post('/api/order/save-order', {
      //     user: userId,
      //     product: id,
      //     quantity,
      //     price,
      //     shippingAddress: addressId,
      //     totalAmount: price * quantity,
      //   })
      //   console.log(savedOrder);
      setLoading(false);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Link>
        </div>

        <Card className="shadow-md border-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Delivery Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-medium text-lg">Shipping Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />

                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />

                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Street Address</label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your street address" />

              </div>


              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">City</label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" />

                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">State</label>
                  <Input id="state" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="Enter your state" />

                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="text-sm font-medium">Zip Code</label>
                  <Input id="zipCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter your zip code" />

                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" type="tel" />

              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium text-lg">Delivery Options</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="standard" name="deliveryOption" className="h-4 w-4 accent-[#FF6B6B]" defaultChecked />
                    <label htmlFor="standard" className="flex flex-col">
                      <span className="font-medium">Standard Delivery</span>
                      <span className="text-sm text-gray-500">Get by May 8 - May 12</span>
                    </label>
                  </div>
                  <span className="font-medium">Free</span>
                </div>

                <div className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="express" name="deliveryOption" className="h-4 w-4 accent-[#FF6B6B]" />
                    <label htmlFor="express" className="flex flex-col">
                      <span className="font-medium">Express Delivery</span>
                      <span className="text-sm text-gray-500">Get by May 5 - May 7</span>
                    </label>
                  </div>
                  <span className="font-medium">$9.99</span>
                </div>

                <div className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="nextDay" name="deliveryOption" className="h-4 w-4 accent-[#FF6B6B]" />
                    <label htmlFor="nextDay" className="flex flex-col">
                      <span className="font-medium">Next Day Delivery</span>
                      <span className="text-sm text-gray-500">Get it tomorrow, May 3</span>
                    </label>
                  </div>
                  <span className="font-medium">$19.99</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full py-6 bg-[#f95555] hover:bg-[#f93333] text-white flex items-center justify-center gap-2"
                onClick={checkout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </Button>

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Checkout;
