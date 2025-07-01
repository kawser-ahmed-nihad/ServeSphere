import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get('/blogPosts.json')
      .then((res) => {
        setBlogPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto text-center text-orange-500 font-semibold text-xl">
          Loading blog posts...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-0 bg-white dark:bg-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-10">Community Blog</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <p className="text-orange-500 font-medium">{post.date}</p>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 leading-snug">{post.title.slice(0, 20)}...</h2>
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg w-full h-48 object-cover my-4"
                />
              </div>
              <h1 className="font-medium text-gray-800 dark:text-gray-400 mt-4">{post.author}</h1>
              <Link
                to={`/blogs/${post.id}`}
                className="text-orange-500 font-medium inline-flex items-center hover:underline"
              >
                Read More <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
