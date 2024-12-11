import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { toast, ToastContainer } from 'react-toastify'
import Datepicker from "react-tailwindcss-datepicker"; 
import { useNavigate } from 'react-router-dom';

const Documents = () => {
    const navigate = useNavigate(); 
    const [data, setData] = useState([])
    const [query, setQuery] = useState({})
    const [isApply, setIsApply] = useState(false)
    const [value, setValue] = useState({ 
      startDate: null, 
      endDate: null
  });

    useEffect(() => {
        axiosInstance.get('/document/fetch-docs')
        .then((res) => {
            toast.success(res.message)
            setData(res.data)
        })
    }, [])
    useEffect(() => {
      if(query?.doc_name || query?.doc_id  || query?.createdBy || value?.endDate || value?.startDate) {
        setIsApply(true)
      } else {
        setQuery({})
        setIsApply(false)
      }
    }, [query?.doc_name ,query?.doc_id , query?.createdBy, value?.startDate, value?.endDate])
    const handleChange = (e) => {
      setQuery(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
    useEffect(() => {

    }, [navigate])
    const applyChanges = () => {
      const newParams = new URLSearchParams({...query, ...value})
      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      axiosInstance.get('/document/fetch-docs', 
        {
          params: {...query, ...value}
        }
      ).then((res) => {
        toast.success(res.message)
        setData(res.data)
        navigate(newUrl, {replace: true})
      }).catch((err) => {
        toast.error(err.message)
      })
    }
    const clearChanges = () => {
      navigate("/documents", {replace: true})
      axiosInstance.get('/document/fetch-docs'
      ).then((res) => {
        toast.success(res.message)
        setData(res.data)
      }).catch((err) => {
        toast.error(err.message)
      })
      setQuery({})
      setValue({startDate: null, endDate: null})
    }
  return (
    <>
      <div className='w-screen min-h-screen bg-black box-border p-5 relative'>
        <div className="text-white w-full h-[250px] backdrop-blur-sm bg-white/10 border-2 border-white shadow-custom-light mb-3 rounded-xl flex flex-row items-center relative z-20">
        <div className='w-full h-full p-3'>
          <div className='w-full h-full gap-2 rounded-xl flex flex-col'>
              <div className='w-full h-full flex flex-row jsutify-center items-center'>
                <div className='h-full w-1/5 flex justify-center items-center font-bold text-xl'>Doc Name</div>
                <div className='h-full w-full flex justify-center items-center'>
                  <input name='doc_name' value={query?.doc_name ? query?.doc_name : ""} type="text"  onChange={handleChange} className='w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white' />
                </div>
              </div>
              <div className='w-full h-full flex flex-row jsutify-center items-center'>
                <div className='h-full w-1/5 flex justify-center items-center font-bold text-xl'>Doc Id</div>
                <div className='h-full w-full flex justify-center items-center'>
                  <input name='doc_id' value={query?.doc_id ? query?.doc_id : ""} type="text"  onChange={handleChange} className='w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white' />
                </div>
              </div><div className='w-full h-full flex flex-row jsutify-center items-center'>
                <div className='h-full w-1/5 flex justify-center items-center font-bold text-xl'>Created By</div>
                <div className='h-full w-full flex justify-center items-center'>
                  <input  type="text" name='createdBy' value={query?.createdBy ? query?.createdBy : ""}  onChange={handleChange} className='w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white' />
                </div>
              </div>
          </div>
        </div>
        <div className='w-full h-full p-3 relative'>
          <div className='w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Datepicker
            displayFormat="DD/MM/YYYY"
            value={value} 
            onChange={newValue => setValue(newValue)}
            showShortcuts={true}
            showFooter={true}
            inputClassName="w-full bg-white/10 p-4 backdrop-blur-sm rounded-xl text-white"
            inputId="datepicker"
            inputName="datepicker"
          />
          </div>
          {isApply && <div className='absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 p-2 rounded-xl text-white font-bold text-sm hover:cursor-pointer hover:bg-green-600' onClick={applyChanges}>
            Apply
          </div>}
          {isApply && <div className='absolute bottom-0 right-16 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-2 rounded-xl text-white font-bold text-sm hover:cursor-pointer hover:bg-red-600' onClick={clearChanges}>
            Clear
          </div>}
        </div>
        
        </div>
      <div className="w-full h-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {
          data && data.map((doc) => {
            return (
              <div className="w-full h-40 bg-white relative rounded-b-xl rounded-t-xl" key={doc._id}>
            <div className='w-full h-1/4 font-bold text-lg rounded-t-xl flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white'>
              {doc?.doc_name?.length > 27 ? doc.doc_name.slice(0, 27) + "..." : doc.doc_name.slice(0, 27)}
            </div>
            <div className='w-full h-1/4 font-bold flex items-center px-3' onClick={() => {
              navigator.clipboard.writeText(doc.doc_id)
              toast.success("Copied to clipboard")
            }}>
              <span className='font-bold text-lg text-red-500'>Doc Id &nbsp;: &nbsp;</span><span className='hover:cursor-pointer hover:text-green-500 duration-300'>{doc.doc_id}</span> 
            </div>
            <div className='w-full h-1/4 font-bold flex items-center px-3'>
            <div ><span className='text-red-500 text-lg'>Created At</span>&nbsp;: &nbsp; {new Date(doc.createdAt).toLocaleString()}</div>
            </div>
            <div className='w-full h-1/4 font-bold rounded-t-xl flex flex-row justify-between items-center px-3'>
              <div ><span className='text-red-500 text-lg'>Created By</span>&nbsp;: &nbsp; {doc.createdBy}</div>
              <div><span className='text-red-500 text-lg animate-pulse text-2xl'>{doc.total_users}</span>&nbsp;&nbsp;</div>
            </div>
          </div>
            )
          })
        }
          
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default Documents