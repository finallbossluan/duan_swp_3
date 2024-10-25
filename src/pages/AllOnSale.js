import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import ChangeOnSale from '../components/ChangeOnSale';
import ChooseOnSaleProduct from '../components/ChooseOnSaleProduct';

const AllOnSale = () => {
    const [allOnSales, setAllOnSales] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [openUploadOnSale, setOpenUploadOnSale] = useState(false);
    const [updateOnSaleProductDetails, setUpdateOnSaleProductDetails] = useState({
        salePrice: '',
        expDate: '',
    });

    const handleDelete = async (id) => {
        const fetchData = await fetch(`http://localhost:8080/api/delete-sale-product/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const dataResponse = await fetchData.json();
        if (dataResponse.success) {
            toast.success(dataResponse.data);
            fetchAllOnSaleProduct();
        };
        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    }

    const fetchAllOnSaleProduct = async () => {
        const fetchData = await fetch('http://localhost:8080/api/get-all-sale-products', {
            method: 'GET',
            credentials: 'include',
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllOnSales(dataResponse.data);
        };

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }

    };

    useEffect(() => {
        fetchAllOnSaleProduct()
    }, [])

    return (
        <div className='bg-white pb-4 px-4 mt-3'>
            <div className='w-full flex justify-between mb-4'>
                <h1 className='text-3xl font-bold'>On Sale Products</h1>
                <button className='border-2 border-red-600 text-red-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadOnSale(true)}>
                    Add On Sale Product
                </button>
            </div>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Sale Price</th>
                        <th>Status</th>
                        <th>Expiration Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allOnSales.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el?.productName}</td>
                                    <td>{el?.brandName}</td>
                                    <td>{el?.salePrice}</td>
                                    {Date.parse(el?.expDate) > Date.now() ? (<td className='text-green-500'>Valid</td>) : (<td className='text-red-600'>InValid</td>)}
                                    <td>{moment(el?.expDate).format('LL')}</td>
                                    <td className='flex justify-around'>
                                        <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                setUpdateOnSaleProductDetails(el)
                                                setOpenUpdateRole(true)

                                            }}
                                        >
                                            <MdModeEdit />

                                        </button>
                                        <buton className='bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
                                            onClick={() => handleDelete(el._id)}
                                        >
                                            <MdDeleteForever />
                                        </buton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeOnSale
                        onClose={() => setOpenUpdateRole(false)}
                        onSaleProduct={updateOnSaleProductDetails}
                        callFunc={fetchAllOnSaleProduct}
                    />
                )
            }
            {
                openUploadOnSale && (
                    <ChooseOnSaleProduct
                        onClose={() => setOpenUploadOnSale(false)}
                        callFunc={fetchAllOnSaleProduct}
                    />
                )
            }

        </div>
    )
}

export default AllOnSale;