import { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import OnSaleCard from './OnSaleCard';

function ChooseOnSaleProduct(
    {
        onClose,
        callFunc,
    }
) {

    const [allProduct, setAllProduct] = useState([]);

    console.log(callFunc);

    const fetchAllProduct = async () => {
        const response = await fetch('http://localhost:8080/api/get-product');
        const dataResponse = await response.json()

        const products = dataResponse.data.filter((item, index) => {
            return item.onSale === false;
        })

        setAllProduct(products || []);
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-4xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload On Sale Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                    {
                        allProduct.map((product, index) => {
                            return (
                                <OnSaleCard data={product} key={index + "allProduct"} fetchdata={callFunc} fetchAllProducts={fetchAllProduct} onClose={onClose} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChooseOnSaleProduct;