import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage'; // Optional for full-screen image preview

const AdminEditNews = ({ onClose, newsData, fetchData }) => {
  const [data, setData] = useState({
    ...newsData,
    title: newsData?.title || '',
    author: newsData?.author || 'Anonymous',
    category: newsData?.category || '',
    content: newsData?.content || '',
    images: newsData?.images || [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadedImage = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      images: [...prev.images, uploadedImage.url],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...data.images];
    updatedImages.splice(index, 1);

    setData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.updateNews.url, {
        method : SummaryApi.updateNews.method,
        credentials : 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success('News updated successfully!');
        fetchData(); // Refresh the news list
        onClose(); // Close the edit form
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('Failed to update news');
      console.error('Update error:', error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit News</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            placeholder="Enter news title"
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="author" className="mt-3">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={data.author}
            onChange={handleOnChange}
            placeholder="Enter author name"
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category" className="mt-3">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            placeholder="Enter category (e.g., highlight, news, promotion)"
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="content" className="mt-3">Content:</label>
          <textarea
            name="content"
            id="content"
            value={data.content}
            onChange={handleOnChange}
            placeholder="Enter news content"
            rows="5"
            className="p-2 bg-slate-100 border rounded"
            required
          ></textarea>

          <label htmlFor="uploadImage" className="mt-3">Upload Images:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex flex-col items-center gap-2">
                <FaCloudUploadAlt className="text-4xl" />
                <p className="text-sm">Upload Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </label>

          {data.images.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {data.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt="news"
                    width={80}
                    height={80}
                    className="bg-slate-100 border cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 p-1 text-white bg-gray-600 rounded-full hidden group-hover:block cursor-pointer"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="px-3 py-2 bg-blue-600 text-white mt-4 hover:bg-blue-700">
            Update News
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditNews;
