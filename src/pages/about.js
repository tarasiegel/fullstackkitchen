import * as React from 'react';
import { graphql } from 'gatsby';

import { Icon } from 'react-icons-kit';
// import {github} from 'react-icons-kit/fa/github';
import { instagram } from 'react-icons-kit/fa/instagram';
import { envelope } from 'react-icons-kit/fa/envelope';
import { facebookSquare } from 'react-icons-kit/fa/facebookSquare';
import { pinterest } from 'react-icons-kit/fa/pinterest';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import './about.css';

const About = ({ data, location }) => {
  const { author, title } = data.site.siteMetadata;
  const pages = data.aboutData.edges;

  return (
    <Layout location={location} title={title}>
      {pages.map(({ node }) => {
        return (
          <div className="about-container" key={node.fields.slug}>
            <Seo title="About" image={node.frontmatter.image.childImageSharp.gatsbyImageData.src} />
            <div className="about-container__image">
              <GatsbyImage
                image={node.frontmatter.image.childImageSharp.gatsbyImageData}
                alt={author.name}
              />
              <div className="about-container__icons-container">
                <div className="about-container__icons">
                  <a
                    className="about-container__icon"
                    aria-label="instagram-icon"
                    href="https://www.instagram.com/taras.kitchen"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon icon={instagram} size={30} />
                  </a>
                  <a
                    className="about-container__icon"
                    aria-label="facebook-icon"
                    href="https://www.facebook.com/tarasiegelskitchen/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon icon={facebookSquare} size={30} />
                  </a>
                  <a
                    className="about-container__icon"
                    aria-label="pinterest-icon"
                    href="https://www.pinterest.com/0nfiiuo5uh7y1wqmo900o9c6p2ic40/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon icon={pinterest} size={30} />
                  </a>
                  <a
                    className="about-container__icon"
                    aria-label="mail-icon"
                    href="mailto:tarafsiegel@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={25} icon={envelope} />
                  </a>
                </div>
              </div>
            </div>
            <div className="about-container__text-container">
              <div className="blog-html" dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default About;

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    aboutData: allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {fileAbsolutePath: {regex: "//pages//"}}
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD YYYY")
            title
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
  }
`;
