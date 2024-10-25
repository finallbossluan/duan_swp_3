import React from 'react'
import forgotpasswnedSend from '../assest/forgotpasswnedSend.gif'

function Loading() {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <img src={forgotpasswnedSend} />
        </div>
    )
}

export default Loading;