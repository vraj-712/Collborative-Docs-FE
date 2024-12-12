import React, { useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const JoinRoom = ({setIsOpenJoinRoom}) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        doc_id: "",
        access_code: ""
    })
    const [access_text, setAccessText] = useState("")
    const [joinIsDisable, setJoinIsDisable] = useState(false)
const handleChange = (e) => {
    if (e.target.name === "access_code") {
        const len = e.target.value.length
        setAccessText("*".repeat(len))
    }
    setData(prev => { return {...prev, [e.target.name]:e.target.value}})
}
const handleJoin = () => {
    setJoinIsDisable(true)
    axiosInstance.post('/document/access-doc', data, {withCredentials: true})
    .then((res) => {
        toast.success(res.message)
        navigate(`/document/${res.data.doc_id}`,{
            state: {
                doc_id: res?.data?.doc_id,
                _id: res?.data?._id,
                createdBy: res?.data?.createdBy,
                doc_name: res?.data?.doc_name,
            },
        })
        setJoinIsDisable(false)
    })
    .catch((err) => {
        toast.error(err.message)
        setJoinIsDisable(false)
    })
}
  return (
    <div className="w-screen h-screen absolute top-0 left-0 text-white">
    <div className="w-full h-full relative">
        <div className="w-1/2 h-[70%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-2xl shadow-custom-light backdrop-blur-sm bg-white/10">
            <div className='w-full h-full flex flex-col '>
                <div className="w-full h-[60px] border-b-2 border-white rounded-t-2xl relative">
                    <div onClick={() => setIsOpenJoinRoom(false)} className='absolute top-1/2 right-[1rem] transform -translate-x-1/2 -translate-y-1/2 text-4xl hover:cursor-pointer'>
                    &times;
                    </div>
                </div>
                    <div className='w-full h-full p-2'>
                        <div className="h-full w-full flex flex-col p-2 justify-between">
                               <div className='flex flex-row w-full h-1/5 rounded-xl'>
                                    <div className='border-white h-full w-1/5 flex justify-center items-center'>
                                        <p className='text-lg font-bold'>Doc ID</p>
                                    </div>
                                    <div className='w-full h-full flex justify-center items-center'>
                                        <input type="text" name='doc_id' value={data?.doc_id ? data?.doc_id : "" } onChange={handleChange} className='p-2 font-bold w-[75%] h-[50%] bg-white/10 border-2 border-white rounded-xl text-lg focus:outline-none focus:shadow-custom-light' />
                                    </div>
                               </div>
                               <div className='flex flex-row w-full h-1/5 rounded-xl'>
                                    <div className='border-white h-full w-1/5 flex justify-center items-center'>
                                        <p className='text-lg font-bold'>Access Code</p>
                                    </div>
                                    <div className='w-full h-full flex justify-center items-center'>
                                        <input type="text" name='access_code' value={data?.access_code ? data?.access_code : "" } onChange={handleChange} className='p-2 font-bold w-[75%] h-[50%] bg-white/10 border-2 border-white rounded-xl text-lg focus:outline-none focus:shadow-custom-light' />
                                    </div>
                               </div>
                               <div className='w-full h-1/5 rounded-xl relative'>
                              <div className='h-[70px] w-[200px] absolute top-1/2 right-10 transform -translate-y-1/2 flex flex-row gap-7 justify-around items-center'>
                                <div onClick={joinIsDisable ? () => {} : handleJoin} className={`bg-blue-500 px-4 py-2 rounded-xl text-lg font-bold hover:cursor-pointer hover:bg-blue-600 ${joinIsDisable ? "hover:cursor-not-allowed hover:bg-blue-500": ""} `}>Join</div>
                                <div onClick={() => setIsOpenJoinRoom(false)} className='bg-red-500 px-4 py-2 rounded-xl text-lg font-bold hover:cursor-pointer hover:bg-red-700'>Cancle</div>
                              </div>
                               </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}

export default JoinRoom