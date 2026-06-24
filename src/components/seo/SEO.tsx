import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = "livestock, agriculture, farming, cattle planner, animal growth", 
  canonicalPath = "",
  isTool = false
}: SEOProps & { isTool?: boolean }) {
  const url = `https://livestock.ruralutilitycost.com${canonicalPath}`;
  const siteName = "Rural Utility Cost";
  
  const schema = isTool ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "publisher": {
      "@type": "Organization",
      "name": siteName
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": siteName
    }
  };

  return (
    <Helmet>
      <title>{title} - Livestock Tools | {siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://ruralutilitycost.com/og-image.jpg" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://ruralutilitycost.com/twitter-image.jpg" />

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
