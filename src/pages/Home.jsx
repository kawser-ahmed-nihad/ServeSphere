import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection ';
import GallerySection from './GallerySection ';
import NewsletterSection from './NewsletterSection ';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div className='  dark:bg-black  dark:text-white'>
            <Helmet>
                <title>ServeSphere || Home</title>
            </Helmet>
            <HeroSection></HeroSection>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;