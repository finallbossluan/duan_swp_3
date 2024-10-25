import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    })
    const navigate = useNavigate();
    const { id, token } = useParams();
    // console.log(id, token);

    const handleOnChange = (e) => {

        setData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(data);

        try {
            if (data.password === data.confirmPassword) {
                const apiURL = `${SummaryApi.reset_password.url}/${id}/${token}`;
                console.log(apiURL);
                const res = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ password: data.password })
                });

                const resData = await res.json();
                if (resData.success) {
                    toast.success(resData.message);
                    navigate('/login');
                }
                else {
                    toast.error(resData.message);
                }
            }
            else {
                toast.error("Please check password and confirm password");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <h2 className='text-center text-xl font-semibold'>Reset Your Password</h2>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />

                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-gray-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Reset</button>

                    </form>

                </div>


            </div>
        </section>
    )
}

export default ResetPassword