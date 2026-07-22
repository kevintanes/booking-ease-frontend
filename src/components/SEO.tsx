interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

const SEO = ({ description, title, image }: SEOProps) => {
  const fullTitle = `BookEase - ${title}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </>
  );
};

export default SEO;
