import React from 'react'

function Messagetemplate({isOwnMessage,message}) {
  return (
    <div className={`bg-[#005C4B] py-2 px-4 w-fit rounded-xl text-white flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        <p>{message}</p>
    </div>
  )
}

export default Messagetemplate