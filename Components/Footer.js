/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";


const Footer = () => {
    return (
        <>
            <div className="bg-primary  text-white">
                <div className="flex flex-wrap justify-between w-full p-10 gap-8">
                    {/* About Us Section */}
                    <div className="w-[32%]  max-md:w-[50%] max-sm:w-full ">
                        <div className="  flex items-center  gap-x-4">
                            <img src="logo.png" alt="logo" className=" w-[10vw] max-sm:w-[15vw] max-sm:h-[10vh] max-[375px]:w-[18vw] max-[375px]:h-[15vw]    rounded-2xl  bg-white" />
                            <div>
                                <p className="text-5xl max-sm:text-3xl ">Suva </p>
                                <p className="text-2xl max-sm:text-xl ">Hospitality </p>
                            </div>
                        </div>
                        <p className="mt-3 text-wrap ">
                            Welcome to Suva group of hotels, where hospitality meets excellence. At our hotels, we are committed to provide an exceptional experience that goes beyond comfortable rooms and exquisite amenities. It's all about creating lasting memories for our guests.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="w-full text-center sm:w-[30%]">
                        <p className="text-3xl max-sm:text-2xl">Quick Links</p>
                        <div className=" ">
                            <Link href='/Menu' ><li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-5">Menu</li></Link>
                            <Link href='/About' ><li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">About Us</li></Link>
                            <Link href='/Contact' ><li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Contact</li></Link>
                        </div>
                    </div>

                    {/* Connect with Us Section */}
                    <div className="w-full sm:w-[30%] text-center">
                        <p className="text-3xl max-sm:text-2xl">Connect With Us</p>
                        <div className="flex  justify-center items-center gap-6 my-4">
                            <Link href="https://www.facebook.com/SuvaHotelSurkhet" target="_blank" rel="noopener noreferrer" className=" hover:text-white flex items-center gap-2">
                                <FaFacebook size={20} />
                            </Link>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaTiktok size={20} />
                            </a>
                        </div>
                        <div className="  flex justify-center items-center mb-4  gap-x-4">
                            <img src="/Contact/mail.png" alt="logo" className="w-6 h-8 rounded-2xl  " />
                            <div>
                                <p className="">info@suvahospitality.com</p>
                            </div>
                        </div>
                        <div className="  flex justify-center items-center  gap-x-4">
                            <img src="Contact/phone.png" alt="logo" className="w-[2vw] max-sm:w-[5vw] rounded-2xl " />
                            <div>
                                <p className=" ">9779851171515 </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-0.5 w-[95%] mx-auto mt-4 bg-gray-300 opacity-50"></div>

                <div className="  max-sm:text-xs py-10 flex flex-wrap items-center justify-center gap-6  ">
                    <li className=" list-none">
                        &copy;2025, <Link href='' className="">Suva Hospitality</Link>
                    </li>
                    <li>
                        <Link href='' className="w-fit ">ALl Right Reserved</Link>
                    </li>
                    <li>
                        <Link href='https://www.facebook.com/aashish.khadka.37625' to='' className="w-fit text-white  hover:underline hover:underline-offset-4">Website Designed and Developed By <p className="text-secondary font-semibold inline">CodexNepal</p></Link>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Footer;





