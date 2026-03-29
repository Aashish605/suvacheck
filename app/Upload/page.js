"use client"
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Add_Items() {

    const notifySuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };


    const [img, setImg] = useState();
    const [video, setVideo] = useState();
    const imgRef = useRef(null)
    const [submitting, setSubmitting] = useState(false)
    const [payload, setPayload] = useState({
        category: "",
        productname: "",
        price: "",
        url: "",
    });


    const handleChange = (event) => {
        const { name, value } = event.target
        const val = name === 'price' ? (value === '' ? '' : Number(value)) : value
        setPayload({ ...payload, [name]: val })
    };


    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", type === "image" ? img : video);
        data.append("upload_preset", type === "image" ? "image_preset" : "video_preset");
        try {
            const cloudName = "drsfbaluf";
            const resourceType = type === "image" ? "image" : "video";
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(`Error uploading ${type}:`, error.response?.data || error.message);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true)
        try {
            const imgUrl = await uploadFile("image");
            const updatedPayload = { ...payload, url: imgUrl };
            console.log(updatedPayload);
            const response = await axios.post('api/Item', updatedPayload);
            notifySuccess("Item is added");
            console.log("Server response", response.data);
            // clear form fields
            setPayload({ category: "", productname: "", price: "", url: "" });
            setImg(undefined)
            if (imgRef.current) imgRef.current.value = ''
        } catch (error) {
            notifyError("Error during saving")
            console.error("Error during item saving", error);
        } finally {
            setSubmitting(false)
        }
    };


    return (
        <>
            <h1 className="flex justify-center items-center pt-5 font-semibold text-3xl underline">
                This is Add Items
            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 my-10 bg-white rounded-md shadow-lg"
            >
                <div className="mb-4">
                    <label
                        htmlFor="category"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Choose your category
                    </label>
                    <select
                        name="category"
                        required
                        onChange={handleChange}
                        value={payload.category}
                        id="category"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
                    >
                        <option value="" hidden>Select an option</option>
                        <option value="Veg">Veg</option>
                        <option value="Nonveg">Nonveg</option>
                        <option value="Drinks">Drinks</option>
                        <option value="SpecialItems">SpecialItems</option>
                        <option value="Coffe">Coffe</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="productname"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Product Name:
                    </label>
                    <input
                        required
                        type="text"
                        name="productname"
                        value={payload.productname}
                        onChange={handleChange}
                        id="productname"
                        placeholder="Enter product name"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price"
                        className="block text-gray-700 text-sm font-bold mb-2">
                        Price:
                    </label>
                    <input
                        name="price"
                        value={payload.price}
                        onChange={handleChange}
                        type="number"
                        id="price"
                        placeholder="Enter price"
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="img"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Upload Image:
                    </label>
                    <input ref={imgRef} required capture="camera" type="file" accept="image/*" id="img" onChange={(e) => setImg(e.target.files[0])} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer" />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className={`bg-secondary ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700'} text-white rounded-xl font-bold py-2 px-4`}
                >
                    {submitting ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </>
    );
}
