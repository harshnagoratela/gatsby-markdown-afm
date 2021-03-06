// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  subtitle: string,
  description?: string,
  socialImage? :string
};

const Layout = ({
  children,
  title,
  subtitle,
  description,
  socialImage,
  canonicalUrl
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);
  const { subtitle: siteSubtitle } = useSiteMetadata();


  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:image" content={metaImageUrl} />
        {canonicalUrl &&
          <link rel="canonical" href={url + canonicalUrl} />
        }
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
