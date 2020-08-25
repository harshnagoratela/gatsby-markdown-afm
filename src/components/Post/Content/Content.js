// @flow strict
import React from 'react';
import styles from './Content.module.scss';
import Image from 'gatsby-image';

type Props = {
  body: string,
  title: string,
  featuredImage: string,
  socialImage: File,
  localImage: File
};

const Content = ({ body, title, featuredImage, localImage }: Props) => (
  <div className={styles['content']}>

    {/*localImage is gatsby optimized , featuredImage is simple image. So if localImage is found try to render it first else featuredImage */}
    {localImage &&
        <div className={styles['content__body']}><p><Image fluid={localImage.childImageSharp.fluid}  alt={title} /></p></div>
    }
    {!localImage && featuredImage &&
        <div className={styles['content__body']}><p><img src={featuredImage} alt={title} /></p></div>
    }
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />

  </div>
);

export default Content;
