import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import axios from "axios";
// import { Post } from "./Post";
import { Switch, Route, Link } from "react-router-dom";

export const Blog = () => {
  const searchInput = useSelector(selectUserInput);
  const API = `https://gnews.io/api/v4/search?q=${searchInput}&token=aeffa6b971d2888a23e863c78ef8d86c`;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(API)
      .then((Response) => {
        dispatch(setBlogData(Response.data));
        setPosts(Response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold  mt-6 text-center">Blog Posts</h1>
      {loading ? <h2 className="text-xl  text-center">Loading...</h2> : ""}
      <div>
        <div class="min-h-screen my-8 py-8 px-6">
          <div class="box-border container mx-auto md:masonry before:box-inherit after:box-inherit ">
            {posts?.articles?.map((post) => (
              <div class="  bg-white shadow-2xl rounded-lg break-inside mb-6">
                <div className="md:flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 rounded-lg rounded-b-none"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-2xl text-gray-800 tracking-normal mb-4">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-700 px-2 mb-4  ">
                    {post.description}
                  </p>
                  <Link
                    to=""
                    rel="noreferrer"
                    className="text-blue-800 underline"
                  >
                    show more
                  </Link>
                </div>
              </div>
            ))}

            {posts?.totalArticles == 0 && (
              <h2 className="text-2xl text-center mx-auto">
                {" "}
                no posts available 😢
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
