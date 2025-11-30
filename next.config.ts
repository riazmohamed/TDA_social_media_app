import type { NextConfig } from "next";

const repo = 'TDA_social_media_app';

const nextConfig: NextConfig = {
  output: 'export',
  
  // Required for GitHub Pages project sites
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  
  // Required for static export to work with GitHub Pages
  trailingSlash: true,
  
  // Disable default Image Optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
