import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { getMetaTags, siteMetadata } from '../../utils/seo';

const MetaTags = ({ page, customData = {} }) => {
  const meta = getMetaTags(page, customData);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="author" content="Usman Murtaza" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={meta.url} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={meta.type || 'website'} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:locale" content="en_US" />
      {/* Twitter Card */}
      <meta name="twitter:card" content={meta.twitterCard || 'summary_large_image'} />
      <meta name="twitter:url" content={meta.url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.twitterSite && <meta name="twitter:site" content={meta.twitterSite} />}
      {meta.twitterCreator && <meta name="twitter:creator" content={meta.twitterCreator} />}
      {/* PWA / Mobile */}
      <meta name="theme-color" content="#0c0c1d" /> {/* Dark SaaS background */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      {/* Additional SEO */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

MetaTags.propTypes = {
  page: PropTypes.oneOf(['home', 'projects', 'about', 'contact', 'tools']).isRequired,
  customData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default MetaTags;
