'use client';
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { appwrite } from "@/appwrite/uploadFile";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }).toLowerCase(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  discount: z.coerce.number().min(0, {
    message: "Discount must be a positive number.",
  }).default(0),
  stock: z.coerce.number().min(0, {
    message: "Stock must be a positive number.",
  }).default(0),
  brand: z.string().optional(),
  ratings: z.coerce.number().min(0).max(5).default(0),
  numReviews: z.coerce.number().min(0).default(0),
  isFeatured: z.boolean().default(false),
  category: z.string().optional(),
  subcategory: z.string().optional(),
});

const AddProduct = () => {
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      discount: 0,
      stock: 0,
      brand: "",
      ratings: 0,
      numReviews: 0,
      isFeatured: false,
      category: "",
      subcategory: "",
    },
  });

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files)); // Convert FileList to an array
    }
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      console.log("Please upload at least one product image");
      return;
    }

    const uploadedImageResults = await Promise.all(
      images.map((image) => appwrite.uploadFile(image))
    );

    const fileIds = uploadedImageResults.map((result) => result.uploadedFile.$id);

    console.log("File IDs:", fileIds); //[]

    // Step 3: Get preview URLs using file IDs
    const previewUrlResults = await Promise.all(
      fileIds.map((fileId) => appwrite.getFileUrl(fileId))
    );
    console.log("PreviewResults URLs:", previewUrlResults);

    // Step 4: Extract successful preview URLs
    const previewUrls = previewUrlResults.map((result) => result.result);
    console.log("Preview URLs:", previewUrls);

    // Step 5: Final product data
    const productData = {
      ...data,
      images: previewUrls,
    };
    console.log("Product data with images:", productData);

    // Step 6: Store data into database

    const responseFromDb = await axios.post('/api/add-product', productData);

    if (responseFromDb.data.success === 201) {
      console.log("Product added successfully");
    }

    // Reset form and images after submission
    form.reset();
    setImages([]);
  };

  return (
    <div className="px-1 py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (!form.getValues("slug")) {
                                form.setValue("slug", generateSlug(e.target.value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="product-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL-friendly version of the name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Images</h3>
                <Separator />
                <div>
                  <input type="file" onChange={handleFileChange} multiple />
                </div>
                <div className="mt-2">
                  <ul>
                    {images.length > 0 && images.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Price & Inventory</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Classification</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SubCategory</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Sub-category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Details</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ratings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ratings (0-5)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numReviews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Reviews</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Product</FormLabel>
                        <FormDescription>
                          This product will be displayed in featured sections
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit" className='bg-[#ff8989] hover:bg-[#ff6b6b]'>Create Product</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;







// 'use client';
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Switch } from "@/components/ui/switch";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { ImageUpload } from "@/components/admin/ImageUpload";
// // import { toast } from "sonner";
// import { Plus, Trash } from "lucide-react";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Product name must be at least 2 characters.",
//   }),
//   slug: z.string().min(2, {
//     message: "Slug must be at least 2 characters.",
//   }).toLowerCase(),
//   description: z.string().optional(),
//   price: z.coerce.number().min(0, {
//     message: "Price must be a positive number.",
//   }),
//   discount: z.coerce.number().min(0, {
//     message: "Discount must be a positive number.",
//   }).default(0),
//   stock: z.coerce.number().min(0, {
//     message: "Stock must be a positive number.",
//   }).default(0),
//   brand: z.string().optional(),
//   ratings: z.coerce.number().min(0).max(5).default(0),
//   numReviews: z.coerce.number().min(0).default(0),
//   isFeatured: z.boolean().default(false),
//   category: z.string().optional(),
// });



// const AddProduct = () => {
//   const [images, setImages] = useState([]);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       slug: "",
//       description: "",
//       price: 0,
//       discount: 0,
//       stock: 0,
//       brand: "",
//       ratings: 0,
//       numReviews: 0,
//       isFeatured: false,
//       category: "",
//       subcategory: "",
//     },
//   });

//   const generateSlug = (name) => {
//     return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
//   };

//   const onSubmit = (data) => {
//     if (images.length === 0) {
//       //   toast.error("Please upload at least one product image");
//       return;
//     }

//     // Add images to the form data
//     const productData = {
//       ...data,
//       images,
//     };

//     console.log("Product data:", productData);
//     // toast.success("Product added successfully!");

//     // Reset form after submission
//     form.reset();
//     setImages([]);
//   };

//   return (
//     <div className="px-1 py-2">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Basic Information</h3>
//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Product Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter product name"
//                             {...field}
//                             onChange={(e) => {
//                               field.onChange(e);
//                               if (!form.getValues("slug")) {
//                                 form.setValue("slug", generateSlug(e.target.value));
//                               }
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="slug"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Slug</FormLabel>
//                         <FormControl>
//                           <Input placeholder="product-slug" {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           URL-friendly version of the name
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter product description"
//                           className="min-h-[120px]"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Images</h3>
//                 <Separator />
//                 {/* <ImageUpload images={images} setImages={setImages} /> */}
//                 <div>
//                   <input type="file" onChange={handleFileChange} multiple />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Price & Inventory</h3>
//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Price ($)</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" step="0.01" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="discount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Discount ($)</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" step="0.01" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="stock"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Stock</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Classification</h3>
//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="brand"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Brand</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter brand name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="category"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Category</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter category" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="subcategory"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>SubCategory</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter Sub-category" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">Additional Details</h3>
//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="ratings"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Ratings (0-5)</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             min="0"
//                             max="5"
//                             step="0.1"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="numReviews"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Number of Reviews</FormLabel>
//                         <FormControl>
//                           <Input type="number" min="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="isFeatured"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                       <div className="space-y-1 leading-none">
//                         <FormLabel>Featured Product</FormLabel>
//                         <FormDescription>
//                           This product will be displayed in featured sections
//                         </FormDescription>
//                       </div>
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <Button type="button" variant="outline">Cancel</Button>
//                 <Button type="submit" className='bg-[#ff8989] hover:bg-[#ff6b6b]'>Create Product</Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddProduct;