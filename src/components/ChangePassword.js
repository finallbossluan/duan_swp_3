import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context"; // Assuming you have a context to fetch user details if needed
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"; // Import Heroicons

const ChangePassword = () => {
  const { fetchUserDetails } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  // Accessing the passed userData
  const userData = location.state?.userData;

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    userId: userData?._id || "", // Ensure userId is available
  });

  useEffect(() => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      userId: userData?._id || "",
    });
  }, [userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId) {
      toast.error("User ID is missing");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(SummaryApi.changePassword.url, {
        method: SummaryApi.changePassword.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the full formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        fetchUserDetails?.(); // Optionally refresh user details
        navigate("/"); // Navigate after success
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Error changing password");
      console.error("Password change error:", error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-sm h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Change Password</h2>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="currentPassword">Current Password:</label>
          <div className="relative">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-gray-600"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showPassword.currentPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <label htmlFor="newPassword" className="mt-3">
            New Password:
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-gray-600"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPassword.newPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <label htmlFor="confirmNewPassword" className="mt-3">
            Confirm New Password:
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-gray-600"
              onClick={() => togglePasswordVisibility("confirmNewPassword")}
            >
              {showPassword.confirmNewPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <button className="px-3 py-2 bg-gray-600 text-white mb-10 hover:bg-red-700 mt-6">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
