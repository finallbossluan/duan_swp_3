import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../common'; 
import moment from 'moment';

const NewsDetails = () => {
  const [data, setData] = useState({
    _id: '',
    title: '',
    author: '',
    category: '',
    newsImage: [], // Đảm bảo là mảng chuỗi
    content: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const fetchNewsDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.newsDetails.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ newsId: params?.id }),
      });
      const result = await response.json();
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching news details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetails();
  }, [params]);

  if (loading) return <p>Loading...</p>;
  if (!data.title) return <p>News article not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      <p className="text-slate-500">By {data.author || 'Unknown'}</p>
      <p className="text-slate-400">{moment(data.createdAt).format('LL')}</p>

      {data.newsImage.length > 0 ? (
        <img
          src={data.newsImage[0]}
          alt={data.title}
          className="w-full max-h-96 object-cover my-4"
        />
      ) : (
        <div className="h-96 bg-slate-300"></div>
      )}

      <div>
        <p className="text-lg">{data.content}</p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default NewsDetails;
