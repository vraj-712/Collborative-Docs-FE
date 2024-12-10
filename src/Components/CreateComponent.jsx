import axios from 'axios'
import React, { useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { ToastContainer, toast } from 'react-toastify';

const CreateComponent = ({setIsOpenCreateRoom}) => {
    const [data, setData] = useState({})
    const [access_text, setAccessText] = useState("")
    const [createBtnIsDisable, setCreateBtnIsDisable] = useState(true)
    const handleCreate = () => {
        axiosInstance.post('/document/create-doc', data, {withCredentials: true})
        .then((res) => {
            setCreateBtnIsDisable(false)
            toast.success(res.message)
            toast.success("Doc Id: " + res.data.doc_id)
            for(let msg of res.data.message) {
                toast.success(msg)
            }
        setData({})
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }
    const handleChange = (e) => {
        if (e.target.name === "access_code") {
            const len = e.target.value.length
            setAccessText("*".repeat(len))
        }
        setData(prev => { return {...prev, [e.target.name]:e.target.value}})

        if (data?.doc_name && data?.access_code && data?.createdBy) {
            console.log(data?.doc_name && data?.access_code && data?.createdBy);
            setCreateBtnIsDisable(false)
        } else {
            setCreateBtnIsDisable(true)
        }
    }

  return (
    <>
    <div className="w-screen h-screen absolute top-0 left-0 text-white">
        <div className="w-full h-full relative">
            <div className="w-1/2 h-[70%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-2xl shadow-custom-light backdrop-blur-sm bg-white/10">
                <div className='w-full h-full flex flex-col '>
                    <div className="w-full h-[60px] border-b-2 border-white rounded-t-2xl relative">
                        <div onClick={() => setIsOpenCreateRoom(false)} className='absolute top-1/2 right-[1rem] transform -translate-x-1/2 -translate-y-1/2 text-4xl hover:cursor-pointer'>
                        &times;
                        </div>
                    </div>
                        <div className='w-full h-full p-2'>
                            <div className="h-full w-full flex flex-col p-2 justify-between">
                                   <div className='flex flex-row w-full h-1/5 rounded-xl'>
                                        <div className='border-white h-full w-1/5 flex justify-center items-center'>
                                            <p className='text-lg font-bold'>Doc Name</p>
                                        </div>
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <input onChange={handleChange} value={data?.doc_name ? data?.doc_name : ""} type="text" name='doc_name' className='p-2 font-bold w-[75%] h-[50%] bg-white/10 border-2 border-white rounded-xl text-lg focus:outline-none focus:shadow-custom-light' />
                                        </div>
                                   </div>
                                   <div className='flex flex-row w-full h-1/5 rounded-xl'>
                                        <div className='border-white h-full w-1/5 flex justify-center items-center'>
                                            <p className='text-lg font-bold'>Created By</p>
                                        </div>
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <input onChange={handleChange} value={data?.createdBy ? data?.createdBy : ""} type="text" name='createdBy' className='p-2 font-bold w-[75%] h-[50%] bg-white/10 border-2 border-white rounded-xl text-lg focus:outline-none focus:shadow-custom-light' />
                                        </div>
                                   </div><div className='flex flex-row w-full h-1/5 rounded-xl'>
                                        <div className='border-white h-full w-1/5 flex justify-center items-center'>
                                            <p className='text-lg font-bold'>Access Code</p>
                                        </div>
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <input onChange={handleChange} value={data?.access_code ? data?.access_code : ""} type="text" name='access_code' className='p-2 font-bold w-[75%] h-[50%] bg-white/10 border-2 border-white rounded-xl text-lg focus:outline-none focus:shadow-custom-light' />
                                        </div>
                                   </div>
                                   <div className='w-full h-1/5 rounded-xl relative'>
                                  <div className='h-[70px] w-[200px] absolute top-1/2 right-10 transform -translate-y-1/2 flex flex-row gap-7 justify-around items-center'>
                                    <div onClick={createBtnIsDisable ? () => {} : handleCreate} className={`bg-green-500 px-4 py-2 rounded-xl text-lg font-bold hover:cursor-pointer hover:bg-green-600 ${createBtnIsDisable ? "hover:cursor-not-allowed hover:bg-green-500" : ""}`}>Create</div>
                                    <div onClick={() => setIsOpenCreateRoom(false)} className='bg-red-500 px-4 py-2 rounded-xl text-lg font-bold hover:cursor-pointer hover:bg-red-700'>Cancle</div>

                                  </div>
                                   </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    </>
  )
}

export default CreateComponent