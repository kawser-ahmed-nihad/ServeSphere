import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection ';
import GallerySection from './GallerySection ';
import NewsletterSection from './NewsletterSection ';
import { Helmet } from 'react-helmet';
import PromoSection from './BlogSection';
import BlogSection from './BlogSection';

const Home = () => {
    return (
        <div className='  dark:bg-gray-800 dark:text-white'>
            <Helmet>
                <title>ServeSphere || Home</title>
            </Helmet>
            <HeroSection></HeroSection>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <BlogSection></BlogSection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;