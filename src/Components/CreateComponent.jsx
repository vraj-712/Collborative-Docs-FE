import axios from 'axios'
import React, { useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { ToastContainer, toast } from 'react-toastify';

const CreateComponent = ({setIsOpenCreateRoom}) => {
    const [data, setData] = useState({
        doc_name: "",
        access_code: "",
        createdBy: ""
    })
    const [access_text, setAccessText] = useState("")
    const [createBtnIsDisable, setCreateBtnIsDisable] = useState(false)
    const [docId, setDocId] = useState("")
    const [isDocId, setIsDocId] = useState(false)
    const handleCreate = () => {
        setCreateBtnIsDisable(true)
        axiosInstance.post('/document/create-doc', data)
        .then((res) => {
            setCreateBtnIsDisable(false)
            toast.success(res.message)
            toast.success("Doc Id: " + res.data.doc_id)
            setDocId(res.data.doc_id)
            setIsDocId(true)
            for(let msg of res.data.message) {
                toast.success(msg)
            }
            setCreateBtnIsDisable(false)
            setData({})
        })
        .catch((err) => {
            setCreateBtnIsDisable(false)
            toast.error(err.message)
        })
    }
    const handleChange = (e) => {
        if (e.target.name === "access_code") {
            const len = e.target.value.length
            setAccessText("*".repeat(len))
        }
        setData(prev => { return {...prev, [e.target.name]:e.target.value}})
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
                                   {isDocId && <div className='absolute top-1/2 left-10 transform -translate-y-1/2 flex flex-row gap-2'>
                                    <div className='text-lg font-bold bg-gray-500 px-4 py-2 rounded-xl'>
                                        {docId?.substring(0, 50) + "..."}
                                    </div>
                                    <div onClick={() => {
                                        navigator.clipboard.writeText(docId)
                                        toast.success("Doc Id Copied!!")
                                        setIsDocId(false)
                                        setDocId("")
                                    }}
                                    className='flex justify-center items-center font-bold rounded-xl hover:cursor-pointer'>
                                        <svg fill="#FFFFFF" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>
                                    </div>
                                   </div>}
                                  <div className='h-[70px] w-[250px]  absolute top-1/2 right-10 transform -translate-y-1/2 flex flex-row gap-7 justify-around items-center'>
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