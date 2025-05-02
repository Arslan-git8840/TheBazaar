'use client';


import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/admin/FileInput";
// import { toast } from "sonner";
import { Trash, Upload } from "lucide-react";
import { cn } from "@/lib/utils";


export const ImageUpload = ({ images, setImages }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = e.target.files[0];
    console.log(files)
    if (!files || files.length === 0) return;
  
    setIsUploading(true);
  
    const uploadedImages = [];
  
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) continue;
  
      try {
        // ✅ Replace this line with your upload logic
        // For example: const url = await uploadToAppwrite(file);
        const url = URL.createObjectURL(file); // TEMPORARY preview fallback
  
        uploadedImages.push(url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
  
    setImages((prev) => [...prev, ...uploadedImages]);
    setIsUploading(false);
  
    if (e.target) e.target.value = "";
  };
  

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <FileInput
            onChange={handleFileChange}
            accept="image/*"
            multiple
            disabled={isUploading}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Upload product images (PNG, JPG, WEBP)
          </p>
        </CardContent>
      </Card>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="h-24 w-full object-cover rounded-md border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
