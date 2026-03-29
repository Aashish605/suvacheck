/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, closeSidebar } from '../Redux/Sidebar/SidebarSlice'
import { addRoomNO } from '../Redux/Num/NumSlice'
import { useEffect, useState,Suspense } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'



function Navbar() {
        const dispatch = useDispatch();
    const select = useSelector((state) => state.Sidebar.isSidebarOpen);
    const { data: session, status } = useSession();
    const logIn = !!session;


    const [dropdown, setDropdown] = useState(false)

    const [Courses, setCourses] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (select) {
                dispatch(closeSidebar());
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [select, dispatch]);

    useEffect(() => {
        const handleSidebar = (e) => {
            if (!e.target.closest('.sidebar') && select) {
                dispatch(closeSidebar())
            }
        }

        const handledropdown = (e) => {
            if (!e.target.closest('.dropdown') && Courses) {
                setCourses(false)
            }
        }
        const handleimgdropdown = (e) => {
            if (!e.target.closest('.drop') && dropdown) {
                setDropdown(false)
            }
        }


        document.addEventListener("click", handleSidebar)
        document.addEventListener("click", handledropdown)
        document.addEventListener("click", handleimgdropdown)
        return () => {
            document.removeEventListener("click", handleSidebar)
            document.removeEventListener("click", handledropdown)
            document.removeEventListener("click", handleimgdropdown)
        };
    }, [dispatch, select, Courses, dropdown]);

    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    const searchParams = useSearchParams()
    const RoomNo = searchParams.get('RoomNo')

    useEffect(() => {
        if (RoomNo) {
            dispatch(addRoomNO(RoomNo))
        }
    }, [RoomNo, dispatch])


    return (
        <>
            {/* mobile */}
            <nav className={`min-[815px]:hidden sidebar sticky top-0 z-30 shadow-md w-full text-black bg-white h-16 `}>
                <div className={` px-3  flex items-center justify-between  `}>
                    <Link href='' onClick={() => (dispatch(toggleSidebar()))} to=''>
                        <img src="/logo.png" alt="logo" className="h-12 sm:h-16 w-auto" />
                    </Link>
                    <div>
                        <svg className={`ml-2 menu  ${select ? 'hidden' : ''}`} onClick={() => { dispatch(toggleSidebar()) }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 70 40">
                            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                        </svg>
                        <svg className={`ml-2 close ${select ? '' : 'hidden'} `} onClick={() => { dispatch(toggleSidebar()) }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 24 24">
                            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                        </svg>
                    </div>
                    <div className={`absolute flex flex-col shadow-md shadow-gray-200  left-0 top-full text-create  overflow-scroll  w-full max-[425px]:w-full   h-fit  z-10  gap-10 bg-white ${select ? ' ' : ' hidden '}  `} >
                        <div className=" overflow-scroll mx-8  overflow-x-hidden flex flex-col  grow gap-y-2 ">
                            <Link href='/' onClick={() => (dispatch(toggleSidebar()))} to="" className={`hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60  ${isActive('/') ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : " "}`}>
                                Home
                            </Link>
                            <Link href='/Menu' onClick={() => (dispatch(toggleSidebar()))}
                                className={
                                    `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive('/Menu') ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : " "}`
                                }
                            >
                                Menu
                            </Link>
                            <Link href='/Contact' onClick={() => (dispatch(toggleSidebar()))}
                                className={
                                    `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60  ${isActive('/Contact') ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : " "}`
                                }
                            >
                                Contact
                            </Link>
                            <Link href='/About' onClick={() => (dispatch(toggleSidebar()))}
                                className={
                                    `hover:underline hover:underline-offset-4 my-1 hover:decoration-0 opacity-60 ${isActive('/About') ? `font-medium underline underline-offset-4 decoration-1 opacity-100` : " "}`
                                }
                            >
                                About Us
                            </Link>
                        </div>
                        <div className="flex flex-col shrink-0 py-6">
                            <h1 className="w-full h-[1.5px] bg-black opacity-10"></h1>
                            {session ?
                                <Link href='/Dashboard' to={'/login'} onClick={() => (dispatch(toggleSidebar()))} className='my-4 border border-gray-400 w-fit px-2 py-3 rounded-xl text-white bg-secondary text-create font-medium  mx-8' > {session.user.id}</Link>
                                :
                                <Link href='/Login' to={'/login'} onClick={() => (dispatch(toggleSidebar()))} className='my-4 text-create font-medium opacity-50 mx-8' >Sign in</Link>}
                        </div>
                    </div>
                </div>
            </nav >

            {/* desktop */}
            < nav className={` hidden top-0 z-30  bg-white text-black shadow-md w-full min-[815px]:sticky min-[815px]:flex justify-between items-center px-10 py-2 gap-20 `
            }>
                <Link href='' to=''>
                    <img src="/logo.png" alt="logo" className="h-20 w-auto " />
                </Link>
                <div className="flex flex-wrap items-center justify-center text-center gap-10">
                    <Link href='/'
                        className={
                            `relative hover:font-semibold  ${isActive('/') ? `before:content-['' font-semibold before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-0.5 before:bg-secondary before:scale-x-125` : " "}`
                        }
                    >
                        Home
                    </Link>
                    <Link href='/Menu'
                        className={
                            `relative hover:font-semibold  ${isActive('/Menu') ? `before:content-[''] font-semibold before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-0.5 before:bg-secondary before:scale-x-125` : " "}`
                        }
                    >
                        Menu
                    </Link>
                    <Link href='/Contact'
                        className={
                            `relative hover:font-semibold  ${isActive('/Contact') ? `before:content-[''] font-semibold before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-0.5 before:bg-secondary before:scale-x-125` : " "}`
                        }
                    >
                        Contact
                    </Link>
                    <Link href='/About'
                        className={
                            `relative hover:font-semibold  ${isActive('/About') ? `before:content-[''] font-semibold before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-0.5 before:bg-secondary before:scale-x-125` : " "}`
                        }
                    >
                        About Us
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {logIn ?
                        <Link href='/Dashboard' className="relative drop cursor-pointer" >
                            <div className=" bg-secondary rounded-[80%] text-xl text-white px-4 py-4 ">
                                {session.user.id
                                    .split(" ")
                                    .map(word => word[0])
                                    .join("")
                                    .toUpperCase()
                                }
                            </div>
                        </Link>
                        : < Link href='/Login' className="outline-1 bg-secondary text-white px-4 py-2 rounded-4xl min-w-fit cursor-pointer " > Sign in </Link>
                    }
                </div>
            </nav >
        </>
    );
}

export default function Nav() {
    return (
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
            <Navbar />
        </Suspense>
    );
}
