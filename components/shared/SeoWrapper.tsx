/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Iprops {
  title: string;
  metaDescription?: string;
  children: React.ReactElement;
  canonicalPath?: string;
  ogImage?: string;
}
export const SeoWrapper: React.FC<Iprops> = ({
  title,
  metaDescription = 'Welcome to Covid Beds. This is the platform where you can get idea about remaining beds in diffrenet hospitals according to your place.',
  canonicalPath,
  ogImage = 'CovidBeds.png',
  children,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={title} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="en_IN" />
        <meta property="og:url" key="og:url" content={`${process.env.NEXTAUTH_URL}${router.asPath}`} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:description" key="og:description" content={metaDescription} />
        <meta
          property="og:image"
          key="og:image"
          content={
            ogImage.includes('public/uploads/') ? `${process.env.NEXTAUTH_URL}/${ogImage.split('public/')[1]}` : ogImage
          }
        />
        <link rel="canonical" href={`${process.env.NEXTAUTH_URL}${canonicalPath ? canonicalPath : router.asPath}`} />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div>{children}</div>
    </>
  );
};
