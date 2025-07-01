import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/blogPosts.json')
      .then((res) => {
        setBlogData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const post = blogData.find(p => p.id === parseInt(id));

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-gray-900 text-center">
        <div className="text-orange-500 text-lg font-semibold animate-pulse">
          Loading blog details...
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-24 bg-white dark:bg-gray-900 text-center">
        <div className="text-red-500 text-lg font-semibold">Blog not found.</div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>ServeSphere | Blog | {post.title}</title>
      </Helmet>

      <section className="py-16 px-4 md:px-0 bg-white dark:bg-gray-800 dark:text-gray-200">
        <div className="max-w-7xl mx-auto space-y-10">
         
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">{post.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By <span className="font-medium">{post.author}</span> • {post.date}
            </p>
          </div>

          
          <div className="w-full max-h-[500px] overflow-hidden rounded-2xl shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          
          <div className="text-lg leading-relaxed tracking-wide text-gray-800 dark:text-gray-300 space-y-5">
            {post.excerpt.split('\n').map((para, idx) => (
              <p key={idx}>{para.trim()}</p>
            ))}
          </div>

        
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
 