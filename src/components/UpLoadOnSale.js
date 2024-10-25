import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { toast } from 'react-toastify';
import moment from 'moment';

import displayINRCurrency from '../helpers/displayCurrency';


const UploadOnSale = ({
    onClose,
    callFunc,
    product,
    onCloseChooseProduct,
}) => {

    const [salePrice, setSalePrice] = useState();
    const [expDate, setExpDate] = useState();

    console.log(callFunc);

    const handleSalePriceChange = (e) => {
        setSalePrice(e.target.value);
    };

    const handleExpDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setExpDate(newDate);
    };

    {/**upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/api/add-sale-product/${product._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                salePrice,
                expDate,
            })
        });

        const responseData = await response.json()

        if (responseData.success) {
            toast.success('Successfully Add .');
            onClose();
            onCloseChooseProduct();
            callFunc();
        };


        if (responseData.error) {
            toast.error(responseData?.message)
        };
    };

    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload On Sale Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <p>Product Name : {product.productName}</p>
                    <p>Brand Name : {product.brandName}</p>
                    <p>Selling Price : {displayINRCurrency(product.sellingPrice)}</p>

                    <label htmlFor='sale-price' className='mt-3'>Sale Price :</label>
                    <input
                        type='number'
                        id='sale-price'
                        placeholder='enter sale price'
                        value={salePrice}
                        onChange={handleSalePriceChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='exp-date' className='mt-3'>Expiration Date :</label>
                    <input
                        type='date'
                        id='exp-date'
                        placeholder='enter expiration date'
                        value={expDate}
                        onChange={handleExpDateChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
                </form>

            </div>
        </div>
    )
}

export default UploadOnSale;