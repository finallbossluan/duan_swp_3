import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditNews from './AdminEditNews';

const AdminNewsCard = ({ data, fetchData }) => {
  const [editNews, setEditNews] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-60">
      <div className="w-full">
        <div className="w-32 h-32 flex justify-center items-center mx-auto">
          <img
            src={data?.images[0]}
            alt="News"
            className="object-fill h-full w-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2 font-bold mt-2">
          {data.title}
        </h1>

        <p className="text-sm text-gray-500">{data.category}</p>
        <p className="text-sm mb-4">By {data.author || 'Anonymous'}</p>

        <div className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer">
          <MdModeEditOutline onClick={() => setEditNews(true)} />
        </div>
      </div>

      {editNews && (
        <AdminEditNews
          newsData={data}
          onClose={() => setEditNews(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminNewsCard;
