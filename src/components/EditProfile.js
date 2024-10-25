import React, { useState, useEffect, useContext } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage'; // Your upload function
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Your API routes
import Context from '../context';

const EditProfile = ({userData }) => {
  const { fetchUserDetails } = useContext(Context);

  const [data, setData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    profilePic: userData?.profilePic || '',
    userId: userData?._id || '', // Ensure the userId is part of the data being submitted
  });
  
  useEffect(() => {
    setData({
      name: userData?.name || '',
      email: userData?.email || '',
      profilePic: userData?.profilePic || '',
      userId: userData?._id || '',
    });
  }, [userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadImageCloudinary = await uploadImage(file);

      setData((prev) => ({
        ...prev,
        profilePic: uploadImageCloudinary.url,
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDeleteProfilePic = () => {
    setData((prev) => ({
      ...prev,
      profilePic: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.userId) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Ensure the correct data is being sent
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        fetchUserDetails(); // Refresh user details after successful update
      } else {
        toast.error(responseData.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Update profile error:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Profile</h2>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="email" className="mt-3">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="profilePic" className="mt-3">Profile Picture:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><FaCloudUploadAlt /></span>
                <p className="text-sm">Upload Profile Picture</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProfilePic} />
              </div>
            </div>
          </label>

          {data.profilePic && (
            <div className="relative group">
              <img
                src={data.profilePic}
                alt="Profile"
                width={80}
                height={80}
                className="bg-slate-100 border cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 p-1 text-white bg-gray-600 rounded-full hidden group-hover:block cursor-pointer" onClick={handleDeleteProfilePic}>
                <MdDelete />
              </div>
            </div>
          )}

          <button className="px-3 py-2 bg-gray-600 text-white mb-10 hover:bg-red-700">Update Profile</button>
        </form>

      </div>
    </div>
  );
};

export default EditProfile;
