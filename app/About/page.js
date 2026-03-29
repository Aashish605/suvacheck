/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


const About = () => {
    return (
        <div className="max-w-[85vw] mx-auto">

            <div className='relative bg-[url(/Hotel/suva.jpg)] overflow-hidden my-12 w-full h-[35vh] max-sm:h-[35vh] bg-top bg-cover   rounded-2xl text-white '>
                <div className='absolute inset-0'
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                    }}
                ></div>
                <div className='absolute inset-0 flex items-center px-16 max-sm:px-3 pb-8'>
                    <div className='text-white'>
                        <span className='my-4 font-bold  text-4xl max-sm:text-3xl block'>About Suva Hotel Pvt Ltd.</span>
                        <p className='text-xl '>Where hospitality meets excellence.</p>
                    </div>
                </div>
            </div>

            <section className="mb-12 ">
                <span className="text-3xl font-bold mb-12 underline underline-offset-10 decoration-secondary ">About Us</span>
                <p className="my-6">
                    <span className='font-semibold inline'>SUVA HOSPITALITY</span>, where our name reflects our commitment to provide every guest with a good time. Our modern hotels are designed for the all travellers, whether for business or pleasure, and we offer international hospitality standards with a Nepali touch. Our hotels are conveniently located and surrounded by shopping centres, touristic hotspots, restaurants, pubs, hospitals, banks, and even the local police station, making us the perfect choice for a comfortable and hassle-free stay.
                </p>
            </section>

            {/* Explore with us */}
            <section className="mb-12  ">
                <h2 className="text-3xl font-bold mb-4 underline underline-offset-10 decoration-secondary ">Explore With Us</h2>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        900: {
                            slidesPerView: 3,
                        }
                    }}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide className=' '>
                        <img src="Visit/1.jpg" alt="" className='h-[40vh] w-full object-cover shadow-md object-center rounded-2xl ' />
                    </SwiperSlide>
                    <SwiperSlide className=' '>
                        <img src="Visit/2.jpg" alt="" className='h-[40vh] w-full object-cover shadow-md object-center rounded-2xl ' />
                    </SwiperSlide>
                    <SwiperSlide className=' '>
                        <img src="Visit/3.jpg" alt="" className='h-[40vh] w-full object-cover shadow-md object-center rounded-2xl ' />
                    </SwiperSlide>
                    <SwiperSlide className=' '>
                        <img src="Visit/4.jpg" alt="" className='h-[40vh] w-full object-cover shadow-md object-center rounded-2xl ' />
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* Why peoples Choose Us */}
            < div className="bg-gray-50 w-full" >
                <section className="mb-12 ">
                    <h2 className="text-3xl font-bold py-12 text-center underline underline-offset-10 mx-2 decoration-secondary">Why People Choose Us</h2>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mx-6 pb-12">
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="Service/rairport.png" alt="" className='w-[7vh] object-center object-cover ' />
                            </div>
                            <h3 className="font-bold mb-2 text-center md:text-xl">Aiport Pick-up</h3>
                            <p className=" px-4 opacity-70">
                                We offers a free airport pick-up service for guests staying at the hotel. The service is available 24 hours a day, 7 days a week. To request a pick-up, please contact the hotel at least 24 hours in advance.
                            </p>
                        </div>
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="Service/rswimming.png" alt="" className='w-[7vh] object-center object-cover ' />

                            </div>
                            <h3 className="font-bold mb-2 text-center md:text-xl">Swimming Pool</h3>
                            <p className="px-4 opacity-70">
                                Our swimming pool is a 57-foot-long and 36-foot-wide oasis for guests of all ages. The depth ranges from 4 to 6 feet for adults, and 1 foot for kids below 4 years old.
                            </p>
                        </div>
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="Service/rcheck.png" alt="" className='w-[7vh] object-center object-cover ' />
                            </div>
                            <h3 className="font-bold mb-2 text-center md:text-xl">24/7 Check-in Facility</h3>
                            <p className="px-4 opacity-70">
                                Suva Hotel Surkhet offers a 24/7 check-in facility for the convenience of our guests. This means that you can check in at any time of the day or night, and our friendly staff will be happy to help you get settled in
                            </p>
                        </div>
                    </div>
                    <p className='max-w-[65vw] mx-auto text-center md:text-xl  opacity-70 py-7 '>
                        Founded by experienced hotel professionals and frontline hospitality staff, Suva Hospitality is dedicated to cultivating high service standards and well-trained teams who create memorable guest experiences.
                    </p>
                </section>
            </div >

            {/*Suva Family Message */}
            <section className="mb-12 h-fit rounded-2xl shadow-md overflow-hidden  flex items-center bg-secondary max-[1130px]:bg-white justify-center gap-7 max-[1130px]:flex-col ">
                <div className=' flex flex-col items-center justify-center py-6 bg-secondary max-[1130px]:w-full w-1/3 h-full   '>
                    <img src="About/person.png" alt="" className='' />
                    <span className='text-2xl text-white font-bold text-center'>Message From <br /> Suva Hospitality Family</span>
                </div>
                <div className=' w-2/3 max-[1130px]:w-full max-[1130px]:px-4 max-[1130px]:py-6 py-12 px-6 bg-white'>
                    <p className="mb-4">
                        Dear valued guests, welcome to Suva Hospitality. We are honored to host travelers from near and far and committed to making every stay warm, safe, and memorable.
                    </p>
                    <p className="mb-4">
                        Our team blends genuine Nepali hospitality with professional service standards — from comfortable, well-prepared rooms to attentive on-site staff and locally inspired cuisine. We focus on cleanliness, safety, and personal attention to ensure you feel at home.
                    </p>
                    <p className="mb-4">
                        Located in the heart of Surkhet and close to key attractions, shopping, and transport links, Suva Hotel is the perfect base for both business and leisure. Let our front desk assist with reservations, local recommendations, and any special requests.
                    </p>
                    <p className="mb-4">
                        We look forward to welcoming you soon. Book directly for the best rates and personalized service.
                    </p>
                    <p>
                        Warm regards,<br />
                        - The Suva Hospitality Family
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="mb-[10vh] flex items-center flex-col">
                <h2 className="text-3xl font-bold text-center mb-6">Ready to stay With us, Start Booking Today</h2>
                <Link href="/contact" to={'/contact'} className='mx-auto border-2 cursor-pointer border-secondary text-secondary px-6  py-3 rounded-md'>Check Availabilty</Link>
            </section>
        </div>
    )
}


export default About