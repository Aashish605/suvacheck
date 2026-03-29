/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';
import Hotel from '@/Hotel'
import Marquee from '@/Components/Marquee';


const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleModal = (e) => {
      if (e.target.closest('.Modal') && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleModal)
    return () => {
      document.removeEventListener("click", handleModal)
    };
  }, [isOpen]);


  return (
    <>
      <div>
        <div className='relative bg-[url(/Hotel/suva.jpg)] overflow-hidden  w-full h-[70vh] max-sm:h-[35vh] bg-top bg-cover  text-white '>
          <div className='absolute inset-0'
            style={{
              background: 'rgba(0,0,0,0.1)',
            }}
          ></div>
          <div className='absolute inset-0 flex items-center px-16 max-sm:px-3 pb-8'>
            <div className='text-white'>
              <span className='my-4 font-bold  text-6xl max-sm:text-3xl block'>Your Perfect Stay Awaits</span>
              <Link href="/contact" className='inline-block text-2xl max-sm:text-lg bg-secondary hover:bg-opacity-90 transition w-fit px-6 py-3 rounded-xl my-4 font-semibold' aria-label="Check room availability and rates">
                Check Availability
              </Link>
            </div>
          </div>
        </div>
        <Marquee />

        <section id="home" className="max-w-[95vw] mx-auto">
          <div className=" mx-auto flex flex-col md:flex-row  p-8 gap-[10vw] ">
            <div className="md:w-1/2  ">
              {/* <p className='text-xl text-secondary'>Welcome to Suva group of hotels</p> */}
              <h1 className="text-5xl max-sm:text-4xl mb-4 font-bold">Inspiring The World Through <p className="text-secondary inline">Hospitality</p></h1>
              <h1 className=""><p className='inline '>Welcome to Suva group of hotels, where hospitality meets excellence.</p> At our hotels, we are committed to provide an exceptional experience that goes beyond comfortable rooms and exquisite amenities. It&apos;s all about creating lasting memories for our guests.</h1>
            </div>
            <div className="md:w-1/2 max-sm:w-[80vw]  rounded-xl flex items-center  justify-center overflow-hidden">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/6P2oTjb_UrE?autoplay=1&mute=1&loop=1&playlist=6P2oTjb_UrE"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                className="h-[40vh] shadow-xl rounded-3xl cursor-pointer object-cover object-center"
              >
              </iframe>
            </div>
          </div>
        </section >

        {/* Esteemed Properties */}
        < div className="bg-[#f9fafb] w-full" >
          <section id="courses" className="container py-12 max-sm:py-4 max-w-[95vw] mx-auto   ">
            <h2 className="text-5xl text-secondary font-bold text-center mb-2 ">Our Esteemed Properties</h2>
            <p className="text-center font-semibold opacity-50 mb-10">Timeless architecture, superior comfort, and prime locations.</p>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
              {Hotel.map((c, i) => (
                <div key={i} className="shadow-md hover:shadow-xl transition-shadow shadow-gray-300 bg-white rounded-lg  space-y-4">
                  <img src={c.image} className="rounded-t-2xl h-[30vh] w-full object-cover object-center shadow-xl " alt="" />
                  <div className=" flex  flex-col space-y-4 p-6">
                    <h3 className="text-xl font-semibold overflow-clip">{c.title}</h3>
                    <p className="line-clamp-3  ">{c.description} </p>
                    <div className="w-full flex my-4 gap-3">
                      <Link href='' to={`/course/${c.title}/enroll`} className=" w-full font-semibold text-center px-4 py-3  cursor-pointer bg-secondary text-white rounded-md ">Explore Now</Link>
                      {/* <Link href='' to={`/course/${c.title}`} className=" w-1/2 px-4 py-2 cursor-pointer border border-secondary text-secondary rounded">Learn More</Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div >


        {/* Features */}
        < section className="bg-white  max-w-[90vw] mx-auto my-[10vh] " >
          <h1 className="text-5xl text-center font-semibold  ">Why Choose </h1>
          <h1 className="text-4xl text-center font-semibold text-secondary ">Suva Hospitality</h1>
          <div className="container mx-auto grid  gap-8 my-16  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 jus ">
            {[
              { title: "Airpot Pickup", icon: "Service/airport.png", feature: "We offers a free airport pick-up service for guests staying at the hotel. The service is available 24 hours a day, 7 days a week. To request a pick-up, please contact the hotel at least 24 hours in advance." },
              { title: "24/7 Checkin Facility", icon: "Service/check.png", feature: "Our swimming pool is a 57-foot-long and 36-foot-wide oasis for guests of all ages. The depth ranges from 4 to 6 feet for adults, and 1 foot for kids below 4 years old." },
              { title: "Swimming Pool", icon: "Service/swimming.png", feature: "We offer a 24/7 check-in facility for the convenience of our guests. This means that you can check in at any time of the day or night, and our friendly staff will be happy to help you get settled in." },
            ].map((f, i) => (
              <div key={i} className="text-center flex flex-col items-center space-y-4 ">
                <img src={`${f.icon}`} alt="" className=" w-[5vw]  border-secondary max-sm:w-[10vw] " />
                <h4 className=" font-semibold">{f.title}</h4>
                <p className="opacity-70">{f.feature} </p>
              </div>
            ))}
          </div>
        </section >

        {/* Testimonials */}
        < div className="bg-gray-50 w-full" >
          <section className=" py-12 max-w-[85vw] mx-auto">
            <h2 className="text-4xl font-bold text-center mb-2 ">What People <p className="text-secondary inline">Say</p> About Us</h2>
            <p className="mb-8 text-center opacity-70">See what people are saying about us</p>
            <Swiper className="mySwiper my-6 "
              loop={'true'}
              pagination={{
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              // navigation={true}
              modules={[Pagination, Navigation, Autoplay]}

            >
              <SwiperSlide className="">
                <div className="flex justify-center items-center mx-auto  border border-gray-300 bg-white  rounded-2xl my-4 px-8  w-[60vw]  h-fit py-10  gap-10 max-[960px]:flex-col max-[960px]:w-[80vw]  ">
                  <div className=" ">
                    <p className="max-sm:text-[0.9rem] opacity-60 text-wrap mb-6 ">
                      I would highly recommend Suva Hotel Surkhet to anyone looking for a great place to stay in Surkhet for a vacation. The hotel is clean, comfortable, and affordable, and the staff are friendly and helpful. The food is also delicious, and the hotel has its own kitchen garden, so you can be sure that you are getting fresh, healthy food.
                    </p>
                    <div className="flex items-center gap-6">
                      <img src="person.png" alt="" className='w-[8vw] max-sm:w-[18vw] ' />
                      <div>
                        <p className="font-semibold max-sm:font-medium">Sudarshan Chaudhary</p>
                        <p className="opacity-60 text-sm">Suva Hotel</p>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="">
                <div className="flex justify-center items-center mx-auto border border-gray-300 bg-white rounded-2xl my-4 px-8 w-[60vw] h-fit py-10 gap-10 max-[960px]:flex-col max-[960px]:w-[85vw]">
                  <div className=" ">
                    <p className="max-sm:text-[0.9rem] opacity-60 text-wrap mb-6 ">
                      I recently had the pleasure of staying at Suva Hotel for a week. I must say, it was a truly delightful experience that exceeded my expectations in many ways. One aspect that particularly stood out during my time at Suva Hotel was the emphasis on safety, especially for girls and ladies. As a female traveler, safety is always a top priority for me. I was pleased to find that Suva Hotel takes this matter seriously.
                    </p>
                    <div className="flex items-center gap-6  max-sm:gap-2">
                      <img src="person.png" alt="" className='w-[8vw] max-sm:w-[18vw]  ' />
                      <div>
                        <p className="font-semibold max-sm:font-medium ">Kalpana Magar</p>
                        <p className="opacity-60 text-sm">Suva Hotel</p>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="">
                <div className="flex justify-center items-center mx-auto border border-gray-300 bg-white  rounded-2xl my-4 px-8   w-[60vw]  h-fit py-10  gap-10 max-[960px]:flex-col max-[960px]:w-[80vw]  ">
                  <div className=" ">
                    <p className="max-sm:text-[0.9rem] opacity-60 text-wrap mb-6 ">
                      I stayed at Suva Hotel Surkhet for a week for a vacation, i found this hotel Budget-friendly Hotel for budget Pocket. The staff was always willing to help, they were also very accommodating to my needs as a vegetarian traveler. I especially enjoyed the simple tawa roti and vegetable, which reminded me of my mom recipe. They have their own kitchen garden, so they use fresh vegetables in their dishes.
                    </p>
                    <div className="flex items-center gap-6">
                      <img src="person.png" alt="" className='w-[8vw] max-sm:w-[18vw] ' />
                      <div>
                        <p className="font-semibold max-sm:font-medium">Suman Kathet</p>
                        <p className="opacity-60 text-sm">Suva Hotel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
        </div >

      </div >
    </>
  )
}

export default Home


