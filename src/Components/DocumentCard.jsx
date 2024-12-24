import React from 'react'
import format from 'date-fns/format'
const DocumentCard = ({item}) => {
  return (
    <>
    <div className='w-full h-80 break-words rounded-xl'>
        <div className='w-full h-full relative  rounded-xl'>
            <div className='w-full text-2xl border-b-2  bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-yellow-500 text-white font-bold h-[70px] rounded-t-xl flex justify-center items-center'>
                {item.doc_name}
            </div>
            <div className='w-full h-[calc(100%-70px)] text-white font-bold text-lg bg-white/20  rounded-b-xl flex flex-col'>
                <div className='w-full h-full p-3 flex items-center'><span className='font-bold text-red-500'>Doc Id&nbsp;</span> : {item.doc_id}</div>
                <div className='w-full h-full p-3 flex items-center'><span className='font-bold text-red-500'>Created By&nbsp;</span> : {item.createdBy}</div>
                <div className='w-full h-full p-3 flex items-center'><span className='font-bold text-red-500'>Created At&nbsp;</span> : {format(new Date(item.createdAt).toLocaleString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}), "dd-MM-yy") }</div>
            </div>

        </div>
    </div>
    </>
  )
}

export default DocumentCard