import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import Loading from '../components/Loading';
import SummaryApi from '../common';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassowrd = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.forgot_password.url, {
        method: SummaryApi.forgot_password.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email: email })
      })
      const data = await res.json();
      console.log(data);
      setMessage('An email has been sent to your email. Please follow the instructions in that email to reset your password.');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!loading ?
        (<section id='forgotPassword'>
          <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
              <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons' />
              </div>
              {!message ?
                (<form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                  <div className='grid'>
                    <label htmlFor='email' >Enter your email : </label>
                    <div className='bg-slate-100 p-2'>
                      <input
                        id='email'
                        type='email'
                        placeholder='enter your email'
                        className='w-full h-full outline-none bg-transparent'
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <button className='bg-gray-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Send</button>
                </form>)
                :
                (<div className='pt-6 flex flex-col gap-2 text-center'><p>{message}</p></div>)}
            </div>
          </div>
        </section>)
        :
        (<Loading />)}
    </>
  )
}

export default ForgotPassowrd