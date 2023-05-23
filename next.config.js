/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      domains: ['raw.githubusercontent.com'],
    },
    publicRuntimeConfig: {
      imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || 'https://raw.githubusercontent.com/GuilherveMasco/soccer-react-app/development/src/components/Images/soccer-app-logo.png',
    },
};
