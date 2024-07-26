/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'src', 'app', 'styles')],
    },
    env: {
        EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER,
        EMAIL_PASS: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
};

export default nextConfig;