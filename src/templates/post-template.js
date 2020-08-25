// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import RelatedPosts from '../components/RelatedPosts';
import { useSiteMetadata, usePostsList } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const allPostEdges = usePostsList();
  const { frontmatter } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage, localImage } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage} >
      <Sidebar isIndex />
      <Post post={data.markdownRemark} />
      <RelatedPosts post={data.markdownRemark} allPosts={allPostEdges}/>
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        category
        title
        socialImage {
            childImageSharp {
                fluid (srcSetBreakpoints: [200, 400]) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        localImage {
            childImageSharp {
                fluid (srcSetBreakpoints: [200, 400]) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        featuredImage
      }
    }
  }
`;

export default PostTemplate;
