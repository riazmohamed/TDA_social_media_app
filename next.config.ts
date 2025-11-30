import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const repo = 'TDA_social_media_app';

const nextConfig: NextConfig = {
  output: 'export',
  
  // Only apply basePath in production (GitHub Pages)
  basePath: isProduction ? `/${repo}` : '',
  assetPrefix: isProduction ? `/${repo}/` : '',
  
  // Required for static export to work with GitHub Pages
  trailingSlash: true,
  
  // Disable default Image Optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
