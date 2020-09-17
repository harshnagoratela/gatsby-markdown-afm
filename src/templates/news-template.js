// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import RelatedPosts from '../components/RelatedPosts';
import { useSiteMetadata, usePostsList } from '../hooks';

const NewsTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title, excerpt, articleid, author, source,text, dateadded, highlight, highlight2, url, tags, keywords } = data.news;
  const metaDescription = excerpt !== null ? excerpt : siteSubtitle;

  return (
    <Layout title={`${title} - ${siteTitle}`} description={metaDescription} >
      <Sidebar isIndex />
      <Page title={title}>
        <div>
            Posted: {dateadded}
            <img src={'https://source.unsplash.com/1600x900/?abstract.'+ articleid} alt={title} />
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <div>From {author} at {source}</div>
            <blockquote>{highlight}</blockquote>
            <blockquote>{highlight2}</blockquote>
            <a href={url} target="_blank" >Read the original post &gt;</a>
        </div>
      </Page>
    </Layout>
  );
};
 
export const query = graphql`
  query NewsPost($id: String!) {
    news: googleSheetLinksRow(id: { eq: $id }) {
      articleid
      author
      dateadded
      excerpt
      extractedkeywords
      highlight
      highlight2
      images
      image
      id
      keywords
      publishdate
      source
      source2
      tags
      text
      title
      url
      popularity
    }  
  }
`;

export default NewsTemplate;
