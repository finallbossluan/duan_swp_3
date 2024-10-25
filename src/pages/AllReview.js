import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const AllReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm fetch tất cả các đánh giá
    const fetchAllReview = async () => {
        try {
            const response = await fetch(SummaryApi.allreview.url, {
                method: SummaryApi.allreview.method,
                credentials: "include",
              });
            const dataResponse = await response.json();

            if (dataResponse.success) {
                setReviews(dataResponse.data);
            } else {
                setError(dataResponse.message || 'Failed to fetch reviews');
            }
        } catch (err) {
            setError('Error fetching reviews: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReview();
    }, []);

    return (
        <div className='container p-6 mx-auto'>
            <h2 className='mb-6 text-3xl font-bold text-center'>All Reviews</h2>
            {loading ? (
                <p className='text-lg text-center'>Loading reviews...</p>
            ) : error ? (
                <p className='text-center text-red-500'>{error}</p>
            ) : reviews.length === 0 ? (
                <p className='text-lg text-center'>No reviews available</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full bg-white rounded-lg shadow-md table-auto'>
                        <thead>
                            <tr className='text-sm leading-normal text-gray-600 uppercase bg-gray-200'>
                                <th className='px-6 py-3 text-left'>
                                    Product ID
                                </th>
                                <th className='px-6 py-3 text-left'>Comment</th>
                                <th className='px-6 py-3 text-center'>
                                    Rating
                                </th>
                                <th className='px-6 py-3 text-center'>User</th>
                                <th className='px-6 py-3 text-center'>
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-light text-gray-600'>
                            {reviews.map((review) => (
                                <tr
                                    key={review._id}
                                    className='border-b border-gray-200 hover:bg-gray-100'
                                >
                                    <td className='px-6 py-3 text-left whitespace-nowrap'>
                                        {review.productId}
                                    </td>
                                    <td className='px-6 py-3 text-left'>
                                        {review.comment}
                                    </td>
                                    <td className='px-6 py-3 text-center'>
                                        {review.rating}
                                    </td>
                                    <td className='px-6 py-3 text-center'>
                                        {review.isAnonymous
                                            ? 'Anonymous'
                                            : review.userId || 'N/A'}
                                    </td>
                                    <td className='px-6 py-3 text-center'>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllReview;
