"use client"
import React from 'react'
import gsap from "gsap";
import { useEffect } from "react";



const Marquee = () => {
    useEffect(() => {
        gsap.to(".marquee", {
            xPercent: -100,
            duration: 13,
            repeat: -1,
            ease: "linear"
        });

        // animation according to the scrool of wheel   
        // window.addEventListener("wheel", (e) => {
        //     if (e.deltaY<=0) {
        //         gsap.to(".marquee", {
        //             transform:"translate(-107%)",
        //             duration: 10,
        //             repeat: -1,
        //             ease: "linear"
        //         });
        //     }
        //     else if(e.deltaY>0) {
        //         gsap.to(".marquee", {
        //             transform:"translate(7%)",
        //             duration: 10,
        //             repeat: -1,
        //             // ease: "linear"
        //         });
        //     }
        // }
        // )
    }, [])
    return (
        <>
            <div className="marquee  whitespace-nowrap  flex  ">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="bg-black  flex shrink-0 font-bold text-xs py-2 px-3 text-white gap-4">
                        ✨ Welcom To Suva Hotel
                        <div className="display:inline-block; width:10px;"></div>
                        FREE WIFI & PARKING
                        <div className="display:inline-block; width:15px;"></div>
                        24/7 GUEST SUPPORT<div className="display:inline-block; width:10px;"></div>
                        AIRPORT PICKUP AVAILABLE<div className="display:inline-block; width:15px;"></div>
                        Prime Location<div className="display:inline-block; width:10px;"></div>
                        BEST RATE GUARANTEE!<div className="display:inline-block; width:15px;"></div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Marquee
