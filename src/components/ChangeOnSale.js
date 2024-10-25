import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import moment from 'moment';

const ChangeOnSale = ({ onSaleProduct, onClose, callFunc }) => {

    const [salePrice, setSalePrice] = useState(onSaleProduct.salePrice);
    const [expDate, setExpDate] = useState(moment(onSaleProduct.expDate).format('YYYY/MM/DD'));

    console.log('sale price ', salePrice + ' exp date ', expDate);

    const handleSalePriceChange = (e) => {
        setSalePrice(e.target.value);
    }

    const handleExpDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setExpDate(newDate);
    }

    const updateOnSaleProduct = async () => {
        const fetchResponse = await fetch(`http://localhost:8080/api/update-sale-product/${onSaleProduct._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                expDate: expDate,
                salePrice: salePrice,
            })
        })

        const responseData = await fetchResponse.json()

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        };

        console.log("onSale updated", responseData);

    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>
                <div>
                    <div className='text-center'>
                        <h1 className='pb-4 text-lg font-medium'>Update On Sale Product</h1>
                    </div>
                    <p>Product Name : {onSaleProduct.productName}</p>
                    <p>Brand : {onSaleProduct.brandName}</p>
                    {/* <p>Sale Price: {onSaleProduct.salePrice}</p> */}
                    {/* <p>Expiration Date : {moment(onSaleProduct.expDate).format('YYYY/MM/DD')}</p> */}
                    <div className='flex flex-col my-4'>
                        <div className='flex flex-col'>
                            <label htmlFor='sale-price' className='mb-2'>Sale Price :</label>
                            <input id='sale-price' type='number' value={salePrice} onChange={handleSalePriceChange} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='exp-date' className='mb-2'>Expiration Date : {moment(expDate).format('YYYY/MM/DD')}</label>
                            <input id='exp-date' type='date' value={expDate} onChange={handleExpDateChange} />
                        </div>
                    </div>
                    <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-gray-600 text-white hover:bg-red-700' onClick={updateOnSaleProduct}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default ChangeOnSale;