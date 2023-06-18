import React from 'react'
import NavBar from '@/components/navbar'
import ChatBox from '@/components/chatbox'

function chat() {
    return (
        <div>
                <NavBar />
                <div className='mt-24'><ChatBox /></div>
        </div>

    )
}

export default chat
