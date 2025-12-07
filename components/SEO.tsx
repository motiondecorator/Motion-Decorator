
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image = 'https://picsum.photos/id/180/1200/630', // Default fallback image
  type = 'website'
}) => {
  useEffect(() => {
    // 1. Standard HTML Meta Tags
    document.title = `${title} | Motion Decorator - 360° Digital Agency`;
    
    setMeta('description', description);
    setMeta('keywords', keywords?.join(', ') || 'digital marketing, graphic design, web development, branding, motion graphics, IT services');
    setMeta('author', 'Motion Decorator');

    // 2. Open Graph (Facebook, LinkedIn, etc.)
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:type', type);
    setMetaProperty('og:url', window.location.href);
    setMetaProperty('og:image', image);
    setMetaProperty('og:site_name', 'Motion Decorator');

    // 3. Twitter Cards
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', image);
    setMetaName('twitter:creator', '@motiondecorator');

    // 4. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', window.location.href);

  }, [title, description, keywords, image, type]);

  return null;
};

// Helper to set <meta name="...">
function setMeta(name: string, content: string) {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}

// Helper to set <meta property="..."> (for Open Graph)
function setMetaProperty(property: string, content: string) {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}

// Helper to set <meta name="..."> (for Twitter)
function setMetaName(name: string, content: string) {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}
