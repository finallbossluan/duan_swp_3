import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import SummaryApi from '../common'; // Ensure the API path is correct
import moment from 'moment';

const HorizontalCardNews = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(6).fill(null); // Simulating loading placeholders

  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.allNews.url}`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        // Filter news based on category prop
        const filteredData = result.data.filter(
          (news) => news.category.toLowerCase() === category.toLowerCase()
        );
        setData(filteredData);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); // Fetch news data on component mount or category change
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[600px] max-w-[800px] h-56 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="text-slate-500 bg-slate-200 animate-pulse rounded-full p-1"></p>
                  <p className="text-slate-500 bg-slate-200 animate-pulse rounded-full p-1"></p>
                </div>
              </div>
            ))
          : data.map((news, index) => (
              // <Link
              //   key={index}
              //   to={`/news/${news._id}`}
              //   className="w-full min-w-[600px] max-w-[800px] h-56 bg-white rounded-sm shadow flex hover:shadow-lg transition-all"
              // >
              //   <div className="min-w-[300px]">
              //     {news.newsImage && news.newsImage.length > 0 ? (
              //       <img
              //         src={news.newsImage[0]}
              //         alt="news"
              //         className="object-cover h-full w-full rounded-l-sm"
              //       />
              //     ) : (
              //       <div className="bg-slate-200 h-full"></div>
              //     )}
              //   </div>

              //   <div className="p-4 flex flex-col justify-between w-full">
              //     <h2 className="font-medium text-lg text-ellipsis line-clamp-2">
              //       {news.title}
              //     </h2>
              //     <p className="text-slate-500 text-sm">{news.category}</p>
              //     <p className="text-slate-400 text-xs">
              //       {moment(news.createdAt).format('LL')}
              //     </p>
              //   </div>
              // </Link>
              <Link
  key={index}
  to={`/news/${news._id}`}
  className="w-full min-w-[600px] max-w-[800px] h-56 bg-white rounded-sm shadow flex hover:shadow-lg transition-all"
>
  <div className="min-w-[300px]">
    {news.newsImage && news.newsImage.length > 0 ? (
      <img
        src={news.newsImage[0]}
        alt="news"
        className="object-cover h-full w-full rounded-l-sm"
      />
    ) : (
      <div className="bg-slate-200 h-full"></div>
    )}
  </div>

  <div className="p-4 flex flex-col justify-between w-full">
    <h2 className="font-medium text-lg text-ellipsis line-clamp-2">
      {news.title}
    </h2>
    <p className="text-slate-500 text-sm">{news.category}</p>
    <p className="text-slate-400 text-xs">
      {moment(news.createdAt).format('LL')}
    </p>
  </div>
</Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardNews;
