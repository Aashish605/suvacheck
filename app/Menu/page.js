/* eslint-disable @next/next/no-img-element */
"use client"
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import 'swiper/css';
import { toast } from 'react-toastify';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/Redux/Cart/CartSlice";
import { useSession } from "next-auth/react";



export default function Menu_swiper() {
    const [Item, setItem] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { data: session, status } = useSession();
    const [type, settype] = useState('Veg');


    const Num = useSelector(state => state.Num.item)

    const dispatch = useDispatch();

    const notify = (name) => {
        if (Num) {
            toast.success(`${name} Added To Cart`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error("Scan The Qr Code", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Item", {
                    params: { Type: type }
                });
                setItem(response.data);
                console.log("Loaded items", response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchData();
    }, [refresh, type]);


    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/Item/`, { data: { id } });
        console.log("server response", res.data);
        fetchData();
        setRefresh((prev) => !prev);
    };

    const handleAddToCart = (id, url, productname, category, price) => {
        dispatch(addToCart({
            id, url, productname, category, quantity: 1, price
        }));
    };


    const [itemsPerPage, setItemsPerPage] = useState(8);

    const getItemsPerPage = () => {
        if (window.innerWidth < 640) return 4;
        if (window.innerWidth < 768) return 6;
        if (window.innerWidth < 1024) return 8;
        return 10;
    };
    


    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(getItemsPerPage());
        };
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Item.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Item.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className=" lg:w-[95vw]  mx-auto">
                <div className="">
                    <img src="./Food.png" alt="" className=" w-full  lg:h-[70vh] md:h-[75vh] h-[50vh] px-2 object-cover object-left   " />
                </div>
                <div>
                    <p className="text-xs mt-3 opacity-70 text-center">MADE WITH LOVE</p>
                    <p className="text-center  font-semibold">BROWSE FOOD CATEGORIES</p>
                </div>
                <Swiper
                    className=" my-8 w-full lg:w-[95vw] h-[40vw] md:h-[30vw] lg:h-[40vh] "
                    loop={'true'}
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 2.5,
                        },
                        480: {
                            slidesPerView: 3,
                        },
                        650: {
                            slidesPerView: 4,
                        }
                    }}
                    modules={[Navigation, Pagination]}
                >
                    <SwiperSlide onClick={() => { settype('SpecialItems') }} className=" relative group overflow-hidden border border-gray-400 border-dashed bg-gray-100 ">
                        <div >
                            <img
                                className=" h-[27vh] max-[513px]:h-[23vh] max-[375px]:h-[18vh]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 ease-in-out duration-700 "
                                src="images/Today.png"
                                alt="loading"
                            />
                            <button
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base  sm:py-2 sm:px-4 hover:cursor-pointer"
                            >
                                Today&apos;s special
                            </button>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => { settype('Veg') }} className=" relative group overflow-hidden border border-gray-400 border-dashed bg-gray-100 ">
                        <div >
                            <img
                                className="h-[27vh] max-[375px]:h-[23vh] px-2 max-sm:py-8   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
                                src="images/Veg.png"
                                alt="loading"
                            />
                            <button
                                className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
                            >
                                Veg set
                            </button>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => { settype('Nonveg') }} className=" relative group overflow-hidden border border-gray-400 border-dashed bg-gray-100 ">
                        <div>
                            <img
                                className=" h-[25vh] max-[375px]:h-[20vh] px-2 max-sm:py-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
                                src="images/Nonveg.png"
                                alt="loading"
                            />
                            <button
                                className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
                            >
                                Nonveg set
                            </button>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => { settype('Drinks') }} className=" relative group overflow-hidden border border-gray-400 border-dashed bg-gray-100 ">
                        <div >
                            <img
                                className="h-[35vh] max-[375px]:h-[30vh] max-sm:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
                                src="images/Drinks.png"
                                alt="loading"
                            />
                            <button
                                className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
                            >
                                Drinks
                            </button>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => { settype('Coffe') }} className=" relative group overflow-hidden border border-gray-400 border-dashed bg-gray-100 ">
                        <div >
                            <img
                                className="h-[35vh] max-[375px]]:h-[30vh] max-sm:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 duration-500  ease-in-out"
                                src="images/coffe.png"
                                alt="loading"
                            />
                            <button
                                className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-blue-500 text-black bg-white border-dotted border-2 font-bold rounded text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4 hover:cursor-pointer"
                            >
                                Coffe
                            </button>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mb-6 px-2"
                >
                    {currentItems.map((item) => {
                        const id = item._id;

                        return (<div key={id} className="
                    group 
                    border border-gray-300 
                    rounded-lg 
                    overflow-hidden 
                    bg-white 
                    shadow-sm 
                    hover:shadow-md 
                    transition 
                    p-3
                "
                        >
                            <div className="flex justify-center overflow-hidden">
                                <img
                                    className="h-32 object-contain group-hover:scale-105 duration-500"
                                    src={item.url}
                                    alt=""
                                />
                            </div>

                            <p className="text-center text-xl font-semibold mt-2">
                                {item.productname}
                            </p>

                            <p className="text-center text-gray-600 font-medium">
                                Rs. {item.price}
                            </p>

                            <div className="flex flex-col items-center mt-3">
                                <button
                                    className="bg-black text-white px-3 py-2 w-full cursor-pointer rounded-md"
                                    onClick={() => {
                                        if (Num) {
                                            handleAddToCart(item._id, item.url, item.productname, item.category, item.price);
                                        }
                                        notify(item.productname);
                                    }}
                                >
                                    Add to cart
                                </button>

                                {session && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-2 w-full mt-2 rounded-md"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                        );
                    })}
                </section>

            </div>
            <div className="pagination flex justify-center items-center w-full my-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 text-xl py-1 border rounded ${currentPage === index + 1 ? "bg-secondary text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}


