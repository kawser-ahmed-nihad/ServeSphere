import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection ';
import GallerySection from './GallerySection ';
import NewsletterSection from './NewsletterSection ';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeatureSection></FeatureSection>
            <GallerySection></GallerySection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;