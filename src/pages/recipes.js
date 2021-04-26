import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'underscore';
import Layout from '../components/layout';
import Seo from '../components/seo';
// import { GatsbyImage } from "gatsby-plugin-image";
import './recipePage.css';

class Recipes extends React.Component {
    getPosts = (posts) => {
        let postHtml = [];
        posts.forEach(post => {
            postHtml.push(<div className="recipe-page__title">
                <Link style={{ boxShadow: `none` }} to={post.slug} key={post.slug} >
                    {post.title}
                </Link>
            </div>);
        });

        console.log(postHtml);
        return postHtml;
    }

    getCategories = (orderedPostMap) => {
       let catsHtml = [];
        _.each(orderedPostMap, (posts, cat) => {
            catsHtml.push(<div className="recipe-page" key={cat}>
                <div className="recipe-page__category" >{cat}</div>
                {this.getPosts(posts)}
            </div>);
        });
        return catsHtml;
    }

    render() {
        const { data } = this.props,
            siteTitle = data.site.siteMetadata.title,
            posts = data.allMarkdownRemark.edges;

        let postMap = {}, orderedPostMap = {};

        posts.forEach(({node}) => {
            let post = {
                slug: node.fields.slug,
                title: node.frontmatter.title || node.fields.slug
            };

            node.frontmatter.tags.forEach(tag => {
                if (postMap[tag]) {
                    postMap[tag].push(post);
                } else {
                    postMap[tag] = [post];
                }
            });
        });
        
        Object.keys(postMap).sort().forEach(key => {
            orderedPostMap[key] = postMap[key];
        });

        return (
        <Layout location={this.props.location} title={siteTitle}>
            <Seo title="Recipes" image="" />
            <div className="recipe-page__container">
                {this.getCategories(orderedPostMap)}
        </div>
        
      </Layout>
    )
  }
}

export default Recipes;

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}
    filter: {fileAbsolutePath: {regex: "//blog//"}}
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD YYYY")
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
}
`