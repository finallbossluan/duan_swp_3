// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import  { useNavigate, useParams } from 'react-router-dom'
// import SummaryApi from '../common'
// import { FaStar } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa";
// import displayINRCurrency from '../helpers/displayCurrency';
// import VerticalCardProduct from '../components/VerticalCardProduct';
// import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import addToCart from '../helpers/addToCart';
// import Context from '../context';

// const ProductDetails = () => {
//   const [data,setData] = useState({
//     productName : "",
//     brandName : "",
//     category : "",
//     productImage : [],
//     description : "",
//     price : "",
//     sellingPrice : ""
//   })
//   const params = useParams()
//   const [loading,setLoading] = useState(true)
//   const productImageListLoading = new Array(4).fill(null)
//   const [activeImage,setActiveImage] = useState("")

//   const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
//     x : 0,
//     y : 0
//   })
//   const [zoomImage,setZoomImage] = useState(false)

//   const { fetchUserAddToCart } = useContext(Context)

//   const navigate = useNavigate()

//   const fetchProductDetails = async()=>{
//     setLoading(true)
//     const response = await fetch(SummaryApi.productDetails.url,{
//       method : SummaryApi.productDetails.method,
//       headers : {
//         "content-type" : "application/json"
//       },
//       body : JSON.stringify({
//         productId : params?.id
//       })
//     })
//     setLoading(false)
//     const dataReponse = await response.json()

//     setData(dataReponse?.data)
//     setActiveImage(dataReponse?.data?.productImage[0])

//   }

//   console.log("data",data)

//   useEffect(()=>{
//     fetchProductDetails()
//   },[params])

//   const handleMouseEnterProduct = (imageURL)=>{
//     setActiveImage(imageURL)
//   }

//   const handleZoomImage = useCallback((e) =>{
//     setZoomImage(true)
//     const { left , top, width , height } = e.target.getBoundingClientRect()
//     console.log("coordinate", left, top , width , height)

//     const x = (e.clientX - left) / width
//     const y = (e.clientY - top) / height

//     setZoomImageCoordinate({
//       x,
//       y
//     })
//   },[zoomImageCoordinate])

//   const handleLeaveImageZoom = ()=>{
//     setZoomImage(false)
//   }


//   const handleAddToCart = async(e,id) =>{
//     await addToCart(e,id)
//     fetchUserAddToCart()
//   }

//   const handleBuyProduct = async(e,id)=>{
//     await addToCart(e,id)
//     fetchUserAddToCart()
//     navigate("/cart")

//   }

//   return (
//     <div className='container mx-auto p-4'>

//       <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
//           {/***product Image */}
//           <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

//               <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
//                   <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

//                     {/**product zoom */}
//                     {
//                       zoomImage && (
//                         <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
//                           <div
//                             className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
//                             style={{
//                               background : `url(${activeImage})`,
//                               backgroundRepeat : 'no-repeat',
//                               backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
//                             }}
//                           >
    
//                           </div>
//                         </div>
//                       )
//                     }
                  
//               </div>

//               <div className='h-full'>
//                   {
//                     loading ? (
//                       <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                         {
//                           productImageListLoading.map((el,index) =>{
//                             return(
//                               <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
//                               </div>
//                             )
//                           })
//                         }
//                       </div>
                      
//                     ) : (
//                       <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                         {
//                           data?.productImage?.map((imgURL,index) =>{
//                             return(
//                               <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
//                                 <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
//                               </div>
//                             )
//                           })
//                         }
//                       </div>
//                     )
//                   }
//               </div>
//           </div>

//            {/***product details */}
//            {
//             loading ? (
//               <div className='grid gap-1 w-full'>
//                 <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
//                 <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
//                 <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

//                 <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
//                 </div>

//                 <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
//                   <p className='text-red-600 bg-slate-200 w-full'></p>
//                   <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
//                 </div>

//                 <div className='flex items-center gap-3 my-2 w-full'>
//                   <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
//                   <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
//                 </div>

//                 <div className='w-full'>
//                   <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
//                   <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
//                 </div>
//               </div>
//             ) : 
//             (
//               <div className='flex flex-col gap-1'>
//                 <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
//                 <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
//                 <p className='capitalize text-slate-400'>{data?.category}</p>

//                 <div className='text-red-600 flex items-center gap-1'>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStar/>
//                     <FaStarHalf/>
//                 </div>

//                 <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
//                   <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
//                   <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
//                 </div>

//                 <div className='flex items-center gap-3 my-2'>
//                   <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-gray-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
//                   <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-gray-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
//                 </div>

//                 <div>
//                   <p className='text-slate-600 font-medium my-1'>Description : </p>
//                   <p>{data?.description}</p>
//                 </div>
//               </div>
//             )
//            }

//       </div>



//       {
//         data.category && (
//           <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
//         )
//       }
     



//     </div>
//   )
// }

// export default ProductDetails
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import AddReview from '../components/AddReview';
import ListReview from '../components/ListReview';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: ''
    });
    const params = useParams();
    const productId = params.id;
    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState('');

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    });
    const [zoomImage, setZoomImage] = useState(false);

    const { fetchUserAddToCart } = useContext(Context);

    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    const fetchProductDetails = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                productId: params?.id
            })
        });
        setLoading(false);
        const dataReponse = await response.json();

        setData(dataReponse?.data);
        setActiveImage(dataReponse?.data?.productImage[0]);
    };

    console.log('data', data);

    const fetchReviews = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${SummaryApi.getReviews.url}/${productId}`,
                {
                    method: SummaryApi.getReviews.method,
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: params?.id
                    })
                }
            );
            setLoading(false);

            const data = await response.json();
            if (data.success) {
                setReviews(data.data); // Only set reviews if the response is successful
            } else {
                console.error('Error fetching reviews:', data.message);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductDetails(); // Ensure this function exists and fetches product details correctly
            fetchReviews(); // Fetch reviews after the product details
        }
    }, [productId]); // Add productId as a dependency

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };
    const handleZoomImage = useCallback(
        (e) => {
            setZoomImage(true);
            const { left, top, width, height } =
                e.target.getBoundingClientRect();
            console.log('coordinate', left, top, width, height);

            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            setZoomImageCoordinate({
                x,
                y
            });
        },
        [zoomImageCoordinate]
    );

    const handleLeaveImageZoom = () => {
        setZoomImage(false);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
        navigate('/cart');
    };
    const handleReviewAdded = () => {
        console.log('Review has been added!');
        //fetchReviews(); // Refetch reviews after a new one is added
    };

    return (
        <div className='container p-4 mx-auto'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/***product Image */}
                <div className='flex flex-col gap-4 h-96 lg:flex-row-reverse'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img
                            src={activeImage}
                            className='object-scale-down w-full h-full mix-blend-multiply'
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleLeaveImageZoom}
                        />

                        {/**product zoom */}
                        {zoomImage && (
                            <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                <div
                                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                    style={{
                                        background: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${
                                            zoomImageCoordinate.x * 100
                                        }% ${zoomImageCoordinate.y * 100}% `
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>

                    <div className='h-full'>
                        {loading ? (
                            <div className='flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-none'>
                                {productImageListLoading.map((el, index) => {
                                    return (
                                        <div
                                            className='w-20 h-20 rounded bg-slate-200 animate-pulse'
                                            key={'loadingImage' + index}
                                        ></div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className='flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-none'>
                                {data?.productImage?.map((imgURL, index) => {
                                    return (
                                        <div
                                            className='w-20 h-20 p-1 rounded bg-slate-200'
                                            key={imgURL}
                                        >
                                            <img
                                                src={imgURL}
                                                className='object-scale-down w-full h-full cursor-pointer mix-blend-multiply'
                                                onMouseEnter={() =>
                                                    handleMouseEnterProduct(
                                                        imgURL
                                                    )
                                                }
                                                onClick={() =>
                                                    handleMouseEnterProduct(
                                                        imgURL
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/***product details */}
                {loading ? (
                    <div className='grid w-full gap-1'>
                        <p className='inline-block w-full h-6 rounded-full bg-slate-200 animate-pulse lg:h-8'></p>
                        <h2 className='w-full h-6 text-2xl font-medium lg:text-4xl lg:h-8 bg-slate-200 animate-pulse'></h2>
                        <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                        <div className='flex items-center w-full h-6 gap-1 text-red-600 bg-slate-200 lg:h-8 animate-pulse'></div>

                        <div className='flex items-center w-full h-6 gap-2 my-1 text-2xl font-medium lg:text-3xl lg:h-8 animate-pulse'>
                            <p className='w-full text-red-600 bg-slate-200'></p>
                            <p className='w-full line-through text-slate-400 bg-slate-200'></p>
                        </div>

                        <div className='flex items-center w-full gap-3 my-2'>
                            <button className='w-full h-6 rounded lg:h-8 bg-slate-200 animate-pulse'></button>
                            <button className='w-full h-6 rounded lg:h-8 bg-slate-200 animate-pulse'></button>
                        </div>

                        <div className='w-full'>
                            <p className='w-full h-6 my-1 font-medium rounded text-slate-600 lg:h-8 bg-slate-200 animate-pulse'></p>
                            <p className='w-full h-10 rounded  bg-slate-200 animate-pulse lg:h-12'></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-1'>
                        <p className='inline-block px-2 text-red-600 bg-red-200 rounded-full w-fit'>
                            {data?.brandName}
                        </p>
                        <h2 className='text-2xl font-medium lg:text-4xl'>
                            {data?.productName}
                        </h2>
                        <p className='capitalize text-slate-400'>
                            {data?.category}
                        </p>

                        <div className='flex items-center gap-1 text-red-600'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                        </div>

                        <div className='flex items-center gap-2 my-1 text-2xl font-medium lg:text-3xl'>
                            <p className='text-red-600'>
                                {displayINRCurrency(data?.sellingPrice)}
                            </p>
                            <p className='line-through text-slate-400'>
                                {displayINRCurrency(data?.price)}
                            </p>
                        </div>

                        <div className='flex items-center gap-3 my-2'>
                            <button
                                className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-gray-600 hover:text-white'
                                onClick={(e) => handleBuyProduct(e, data?._id)}
                            >
                                Buy
                            </button>
                            <button
                                className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-gray-600 hover:text-red-600 hover:bg-white'
                                onClick={(e) => handleAddToCart(e, data?._id)}
                            >
                                Add To Cart
                            </button>
                        </div>

                        <div>
                            <p className='my-1 font-medium text-slate-600'>
                                Description :{' '}
                            </p>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                )}
            </div>
            <AddReview
                productId={params?.id}
                onReviewAdded={handleReviewAdded}
            />
            <ListReview reviews={reviews} />
            {data?.category && (
                <CategroyWiseProductDisplay
                    category={data?.category}
                    heading={'Recommended Product'}
                />
            )}
        </div>
    );
};

export default ProductDetails;
