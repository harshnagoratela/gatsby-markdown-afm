// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useNewsList } from '../hooks';
import './news-list-template.css'

const NewsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const allNews = useNewsList();

  return (
    <Layout title={`News - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="News">
          <div className="newsContainer">
              {allNews && allNews.map(({ node }, index) => (
                  <div>
                      <img src={'https://source.unsplash.com/1600x900/?abstract.'+ node.articleid} alt={node.title} />
                      <Link to={`/news/${node.articleid}`}>                          
                          {node.title && <h3>{node.title}</h3>}
                      </Link>
                      {node.excerpt && <div>{node.excerpt}</div>}
                  </div>
              ))}
          </div>
        }
      </Page>
    </Layout>
  );
};

export default NewsListTemplate;
