// // import React, { useEffect, useState } from "react";
// // import SummaryApi from "../common"; // Đảm bảo đường dẫn đúng
// // import { toast } from "react-toastify";
// // import moment from "moment";
// // import UploadNews from "../components/UploadNew"
// // const AllNews = () => {
// //   const [allNews, setAllNews] = useState([]);

// //   // Hàm lấy tất cả tin tức từ API
// //   const fetchAllNews = async () => {
// //     try {
// //       const fetchData = await fetch(SummaryApi.allNews.url, {
// //         method: SummaryApi.allNews.method,
// //         credentials: "include",
// //       });

// //       const dataResponse = await fetchData.json();

// //       if (dataResponse.success) {
// //         setAllNews(dataResponse.data);
// //       } else if (dataResponse.error) {
// //         toast.error(dataResponse.message);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to fetch news");
// //       console.error("Error fetching news:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllNews(); // Gọi hàm lấy dữ liệu khi component được mount
// //   }, []);

// //   return (
  
// //     <div className="bg-white pb-4">
     
// //       <table className="w-full userTable">
// //         <thead>
// //           <tr className="bg-black text-white">
// //             <th>Sr.</th>
// //             <th>Title</th>
// //             <th>Author</th>
// //             <th>Category</th>
// //             <th>Created Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {allNews.map((news, index) => (
// //             <tr key={index}>
// //               <td>{index + 1}</td>
// //               <td>{news.title}</td>
// //               <td>{news.author}</td>
// //               <td>{news.category}</td>
// //               <td>{moment(news.createdAt).format("LL")}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AllNews;
// import React, { useEffect, useState } from "react";
// import SummaryApi from "../common"; 
// import { toast } from "react-toastify";
// import moment from "moment";
// import { CgClose } from 'react-icons/cg';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from '../components/DisplayImage';

// const AllNews = () => {
//   const [allNews, setAllNews] = useState([]);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [data, setData] = useState({
//     title: '',
//     author: '',
//     category: '',
//     content: '',
//     newsImage: [],
//   });

//   const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState('');

//   // Fetch all news articles
//   const fetchAllNews = async () => {
//     try {
//       const response = await fetch(SummaryApi.allNews.url, {
//         method: SummaryApi.allNews.method,
//         credentials: "include",
//       });

//       const dataResponse = await response.json();
//       if (dataResponse.success) {
//         setAllNews(dataResponse.data);
//       } else {
//         toast.error(dataResponse.message);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch news");
//       console.error("Error fetching news:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllNews();
//   }, []);

//   // Handle form changes
//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];
//     const uploadedImage = await uploadImage(file);
//     setData((prev) => ({
//       ...prev,
//       newsImage: [...prev.newsImage, uploadedImage.url],
//     }));
//   };

//   const handleDeleteImage = (index) => {
//     const updatedImages = [...data.newsImage];
//     updatedImages.splice(index, 1);
//     setData((prev) => ({ ...prev, newsImage: updatedImages }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(SummaryApi.uploadNews.url, {
//         method: SummaryApi.uploadNews.method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       if (result.success) {
//         toast.success(result.message);
//         fetchAllNews(); // Refresh the news list
//         setShowUploadForm(false); // Close the form
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error) {
//       toast.error('Failed to upload news');
//       console.error('Upload error:', error);
//     }
//   };

//   return (
//     <div className="bg-white pb-4">
//       {/* Upload News Button */}
//       <div className="flex justify-between items-center p-4">
//         <h2 className="font-bold text-lg">All News</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={() => setShowUploadForm(true)}
//         >
//           Upload News
//         </button>
//       </div>

//       {/* News List Table */}
//       <table className="w-full userTable">
//         <thead>
//           <tr className="bg-black text-white">
//             <th>STT</th>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Category</th>
//             <th>Content</th>
//              <th>Image</th>
//             <th>Created Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allNews.map((news, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{news.title}</td>
//               <td>{news.author}</td>
//               <td>{news.category}</td>
//               <td>{news.content}</td>
//               <td>{news.DisplayImage}</td>
//               <td>{moment(news.createdAt).format("LL")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Upload News Form */}
//       {showUploadForm && (
//         <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
//           <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
//             <div className="flex justify-between items-center pb-3">
//               <h2 className="font-bold text-lg">Upload News</h2>
//               <CgClose
//                 className="text-2xl hover:text-red-600 cursor-pointer"
//                 onClick={() => setShowUploadForm(false)}
//               />
//             </div>

//             <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
//               <label htmlFor="title">Title:</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={data.title}
//                 onChange={handleOnChange}
//                 placeholder="Enter news title"
//                 className="p-2 bg-slate-100 border rounded"
//                 required
//               />

//               <label htmlFor="author" className="mt-3">Author:</label>
//               <input
//                 type="text"
//                 id="author"
//                 name="author"
//                 value={data.author}
//                 onChange={handleOnChange}
//                 placeholder="Enter author name"
//                 className="p-2 bg-slate-100 border rounded"
//               />

//               <label htmlFor="category" className="mt-3">Category:</label>
//               <input
//                 type="text"
//                 id="category"
//                 name="category"
//                 value={data.category}
//                 onChange={handleOnChange}
//                 placeholder="Enter news category"
//                 className="p-2 bg-slate-100 border rounded"
//                 required
//               />

//               <label htmlFor="content" className="mt-3">Content:</label>
//               <textarea
//                 name="content"
//                 id="content"
//                 value={data.content}
//                 onChange={handleOnChange}
//                 placeholder="Enter news content"
//                 rows="5"
//                 className="p-2 bg-slate-100 border rounded"
//                 required
//               ></textarea>

//               <label htmlFor="uploadImage" className="mt-3">News Image:</label>
//               <label htmlFor="uploadImageInput">
//                 <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
//                   <FaCloudUploadAlt className="text-4xl" />
//                   <input
//                     type="file"
//                     id="uploadImageInput"
//                     className="hidden"
//                     onChange={handleUploadImage}
//                   />
//                 </div>
//               </label>

//               {data.newsImage.length > 0 && (
//                 <div className="flex items-center gap-2 mt-2">
//                   {data.newsImage.map((img, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={img}
//                         alt="news"
//                         width={80}
//                         height={80}
//                         className="bg-slate-100 border cursor-pointer"
//                         onClick={() => {
//                           setOpenFullScreenImage(true);
//                           setFullScreenImage(img);
//                         }}
//                       />
//                       <MdDelete
//                         className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
//                         onClick={() => handleDeleteImage(index)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <button className="px-3 py-2 bg-blue-600 text-white mt-4 hover:bg-blue-700">
//                 Upload News
//               </button>
//             </form>
//           </div>

//           {openFullScreenImage && (
//             <DisplayImage
//               onClose={() => setOpenFullScreenImage(false)}
//               imgUrl={fullScreenImage}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllNews;

import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import moment from "moment";
import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from '../components/DisplayImage';

const AllNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [data, setData] = useState({
    title: '',
    author: '',
    category: '',
    content: '',
    newsImage: [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');

  // Fetch all news articles
  const fetchAllNews = async () => {
    try {
      const response = await fetch(SummaryApi.allNews.url, {
        method: SummaryApi.allNews.method,
        credentials: "include",
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setAllNews(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch news");
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadedImage = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      newsImage: [...prev.newsImage, uploadedImage.url],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...data.newsImage];
    updatedImages.splice(index, 1);
    setData((prev) => ({ ...prev, newsImage: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Data to submit:', data); // Kiểm tra payload trước khi gửi
  
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
  
    try {
      const response = await fetch(SummaryApi.uploadNews.url, {
        method: SummaryApi.uploadNews.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gửi token trong header nếu cần
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.success) {
        toast.success(result.message);
        fetchAllNews();
        setShowUploadForm(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Upload news error:', error);
      toast.error('Failed to upload news.');
    }
  };
  

  return (
    <div className="bg-white pb-4">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-lg">All News</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowUploadForm(true)}
        >
          Upload News
        </button>
      </div>

      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>STT</th>
            <th>Title</th>
            <th>Author</th>
            {/* <th>Category</th>
            <th>Content</th> */}
            <th>Image</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {allNews.map((news, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{news.title}</td>
              <td>{news.author}</td>
              {/* <td>{news.category}</td>
              <td>{news.content}</td> */}
              <td>
                {news.newsImage && news.newsImage.length > 0 ? (
                  <img
                    src={news.newsImage[0]}
                    alt="news"
                    width={80}
                    height={80}
                    className="rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{moment(news.createdAt).format("LL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUploadForm && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
            <div className="flex justify-between items-center pb-3">
              <h2 className="font-bold text-lg">Upload News</h2>
              <CgClose
                className="text-2xl hover:text-red-600 cursor-pointer"
                onClick={() => setShowUploadForm(false)}
              />
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
                placeholder="Enter news category"
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

              <label htmlFor="uploadImage" className="mt-3">News Image:</label>
              <label htmlFor="uploadImageInput">
                <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
                  <FaCloudUploadAlt className="text-4xl" />
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                </div>
              </label>

              {data.newsImage.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  {data.newsImage.map((img, index) => (
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
                      <MdDelete
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button className="px-3 py-2 bg-blue-600 text-white mt-4 hover:bg-blue-700">
                Upload News
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
      )}
    </div>
  );
};

export default AllNews;
