import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import DocumentCard from "../Components/DocumentCard";

const Documents = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState({});
  const [isApply, setIsApply] = useState(false);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const queryParams = new URLSearchParams(location.search);
  // First Time calling
  useEffect(() => {
    if (
      queryParams.size <= 0 &&
      !query?.doc_name &&
      !query?.doc_id &&
      !query?.createdBy &&
      !value?.endDate &&
      !value?.startDate
    )
      return;
    const t = setTimeout(() => {
      const newParams = new URLSearchParams({ ...query, ...value });
      let newUrl;
      if (
        !query?.doc_name &&
        !query?.doc_id &&
        !query?.createdBy &&
        !value?.endDate &&
        !value?.startDate
      ) {
        newUrl = `${window.location.pathname}`;
      } else {
        newUrl = `${window.location.pathname}?${newParams.toString()}`;
      }
      axiosInstance
        .get("/document/fetch-docs", {
          params: { ...query, ...value },
        })
        .then((res) => {
          toast.success(res.message);
          setData(res.data);
          navigate(newUrl, {
            replace: true,
          });
        });
    }, 2000);
    return () => clearTimeout(t);
  }, [query, value]);
  useEffect(() => {
    const newParams = new URLSearchParams({ ...query, ...value });
    let newUrl;
    if (
      !query?.doc_name &&
      !query?.doc_id &&
      !query?.createdBy &&
      !value?.endDate &&
      !value?.startDate
    ) {
      newUrl = `${window.location.pathname}`;
    } else {
      newUrl = `${window.location.pathname}?${newParams.toString()}`;
    }
    axiosInstance
      .get("/document/fetch-docs", {
        params: { ...query, ...value },
      })
      .then((res) => {
        if(res.statusCode === 404) {
          toast.error(res.message);
          setData([]);
        }
        if(res.statusCode === 200) {
          toast.success(res.message);
          setData(res.data);
          navigate(newUrl, {
            replace: true,
          });
        }
      });
  }, []);

  // useEffect(() => {
  //   if(query?.doc_name || query?.doc_id  || query?.createdBy || value?.endDate || value?.startDate) {
  //     setIsApply(true)
  //   } else {
  //     setQuery({})
  //     setIsApply(false)
  //   }
  // }, [query?.doc_name ,query?.doc_id , query?.createdBy, value?.startDate, value?.endDate])

  const handleChange = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // const applyChanges = () => {
  //   const newParams = new URLSearchParams({...query, ...value})
  //   const newUrl = `${window.location.pathname}?${newParams.toString()}`;
  //   axiosInstance.get('/document/fetch-docs',
  //     {
  //       params: {...query, ...value}
  //     }
  //   ).then((res) => {
  //     toast.success(res.message)
  //     setData(res.data)
  //     navigate(newUrl)
  //   }).catch((err) => {
  //     toast.error(err.message)
  //   })
  // }
  // const clearChanges = () => {
  //   navigate("/documents")
  //   axiosInstance.get('/document/fetch-docs'
  //   ).then((res) => {
  //     toast.success(res.message)
  //     setData(res.data)
  //   }).catch((err) => {
  //     toast.error(err.message)
  //   })
  //   setQuery({})
  //   setValue({startDate: null, endDate: null})
  // }
  return (
    <>
      <div className="w-min-screen min-h-screen p-5 bg-black relative">
        <div className="text-white w-full h-[250px] backdrop-blur-sm bg-white/10 border-2 border-white shadow-custom-light mb-10 rounded-xl flex flex-row items-center relative z-20">
          <div className="w-full h-full p-3">
            <div className="w-full h-full gap-2 rounded-xl flex flex-col">
              <div className="w-full h-full flex flex-row jsutify-center items-center">
                <div className="h-full w-1/5 flex justify-center items-center font-bold text-xl">
                  Doc Name
                </div>
                <div className="h-full w-full flex justify-center items-center">
                  <input
                    name="doc_name"
                    value={query?.doc_name ? query?.doc_name : ""}
                    type="text"
                    onChange={handleChange}
                    className="w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-row jsutify-center items-center">
                <div className="h-full w-1/5 flex justify-center items-center font-bold text-xl">
                  Doc Id
                </div>
                <div className="h-full w-full flex justify-center items-center">
                  <input
                    name="doc_id"
                    value={query?.doc_id ? query?.doc_id : ""}
                    type="text"
                    onChange={handleChange}
                    className="w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-row jsutify-center items-center">
                <div className="h-full w-1/5 flex justify-center items-center font-bold text-xl">
                  Created By
                </div>
                <div className="h-full w-full flex justify-center items-center">
                  <input
                    type="text"
                    name="createdBy"
                    value={query?.createdBy ? query?.createdBy : ""}
                    onChange={handleChange}
                    className="w-[80%] h-[65%] rounded-xl p-3 backdrop-blur-sm bg-white/10 focus:outline-none font-bold focus:shadow-custom-light focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full p-3 relative">
            <div className="w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Datepicker
                displayFormat="DD/MM/YYYY"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                showShortcuts={true}
                showFooter={true}
                inputClassName="w-full bg-white/10 p-4 backdrop-blur-sm rounded-xl text-white"
                inputId="datepicker"
                inputName="datepicker"
              />
            </div>
            {/* {isApply && (
              <div
                className="absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 p-2 rounded-xl text-white font-bold text-sm hover:cursor-pointer hover:bg-green-600"
                onClick={applyChanges}
              >
                Apply
              </div>
            )}
            {isApply && (
              <div
                className="absolute bottom-0 right-16 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-2 rounded-xl text-white font-bold text-sm hover:cursor-pointer hover:bg-red-600"
                onClick={clearChanges}
              >
                Clear
              </div>
            )} */}
          </div>
        </div>
        <div className="w-full h-full grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-10 p-2"> {/*grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 */}
          {data?.length > 0 && data.map((item, index) => (
            <div className="hover:cursor-pointer hover:scale-105 duration-300">
            <DocumentCard key={index} item={item} />
            </div>
          )) }
        </div>
        {data?.length === 0 && <div className="h-full w-full">
          <p className="text-center text-white font-bold text-4xl">
            No Data Found !!
          </p>
        </div>}
        <ToastContainer />
      </div>
    </>
  );
};

export default Documents;
