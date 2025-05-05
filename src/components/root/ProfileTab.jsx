'use client';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Upload } from "lucide-react";

export const ProfileTab = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div>
        <h2 className="text-xl font-semibold">Profile Picture</h2>
        <p className="text-gray-500 text-sm mb-4">
          This is the avatar the store sees when you are shopping with us.
        </p>

        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.imageUrl ?? "default-url.jpg"}
              alt={user?.name ?? "User"}
            />
            <AvatarFallback>
              {user?.name ? user.name.substring(0, 2) : "U"}
            </AvatarFallback>

          </Avatar>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload new photo
          </Button>
        </div>
      </div>

      {/* Personal Info */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Personal Info</h2>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-blue-500"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          By filling in your personal info, we can make your shopping experience much more personal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b border-gray-200">{user?.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b border-gray-200">{user?.email}</div>
              )}
            </div>
          </div>

          {/* Account Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <p className="text-gray-500 text-sm mb-6">
              Edit your account details. These will not be shared with other shoppers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Customer Level</Label>
                {isEditing ? (
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="py-2 border-b border-gray-200">{user?.companyName}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRole">Loyalty Status</Label>
                {isEditing ? (
                  <Input
                    id="companyRole"
                    name="companyRole"
                    value={formData.companyRole}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="py-2 border-b border-gray-200">{user?.companyRole}</div>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
