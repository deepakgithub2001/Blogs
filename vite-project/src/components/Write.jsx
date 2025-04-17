import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({ ...postData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://67f0d4a4c733555e24ab536e.mockapi.io/api/blogs/posts",
        {
          ...postData,
          createdAt: new Date().toISOString(),
        }
      );

      console.log("Post Created:", response.data);
      setMessage("Post created successfully!");
      setPostData({ title: "", content: "", author: "", image: "" });
      navigate(`/stories/${response.data.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post. Try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center md:min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Post</h2>
          {message && <p className="text-center text-green-500 font-semibold">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={postData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="content"
              placeholder="Enter content"
              value={postData.content}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 border border-gray-300 p-1 rounded"
            />
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={postData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Write;
