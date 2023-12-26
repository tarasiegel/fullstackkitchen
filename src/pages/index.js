import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  let posts = data.allMarkdownRemark.nodes;
  posts = posts.filter(post => post.fields.slug !== '/about/');

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified
          for the "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Homepage" />
      <div className="home-item__container">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <div className="home-item" key={post.fields.slug}>
              <div className="home-item__image">
                <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                  <GatsbyImage
                    image={post.frontmatter.image.childImageSharp.gatsbyImageData}
                    alt={title}
                  />
                </Link>
              </div>
              <div className="home-item__category">{post.frontmatter.tags[0]}</div>
              <div className="home-item__date">{post.frontmatter.date}</div>
              <div className="home-item__title">
                <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                  {title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          image {
            childImageSharp {
              resize(width: 650, height: 650) {
                src
              }
              gatsbyImageData(width: 786, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;
