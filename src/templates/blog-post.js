import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Recipe from '../components/Recipe';
// import InstagramPosts from '../components/InstagramPosts';
import { rhythm, scale } from '../utils/typography';
import './blog-post.css';

import { Icon } from 'react-icons-kit';
import {instagram} from 'react-icons-kit/fa/instagram';
import {facebook} from 'react-icons-kit/fa/facebook';
import {envelope} from 'react-icons-kit/fa/envelope';

class BlogPostTemplate extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      recipeData: []
      };
  }

  componentDidMount() {
      const { slug } = this.props.pageContext;
      this.getRecipeData(slug).then((results) => {
          this.setState({
              recipeData: results.default
          });
      }).catch(error => {
          this.setState({
              recipeData: false
          });
      });
  }

  async getRecipeData (slug) {
    return import(`../../content/blog${slug}recipe.js`);
  }
  
  render() {
    const { previous, next } = this.props.pageContext,
    post = this.props.data.markdownRemark,
    siteTitle = this.props.data.site.siteMetadata.title;

    return (
        <Layout location={this.props.location} title={siteTitle}>
            <SEO 
                title={post.frontmatter.title}
                description={post.excerpt}
                image={post.frontmatter.image.childImageSharp.fluid.src}
            />
            
            <div className="blog-post--left">
                <h1 className="blog-post__title">{post.frontmatter.title}</h1>
                <p className="blog-post__date" >
                    {post.frontmatter.date}
                </p>
                <div className="blog-html" dangerouslySetInnerHTML={{ __html: post.html }} />
                
                {(this.state.recipeData) ? 
                <div className="recipe-container">
                    <Recipe 
                        recipe={this.state.recipeData}
                        name={post.frontmatter.title}
                        keywords={post.frontmatter.tags}
                        date={post.frontmatter.date}
                        description={post.frontmatter.description}
                        image={post.frontmatter.image.childImageSharp.fluid}
                    />
                </div>
                : null
                }
                <hr
                    style={{
                    marginBottom: rhythm(1),
                    }}
                />

                <div className="recipe-tags">
                    { post.frontmatter.tags.map((tag, key) => 
                        <a className="recipe-tag" href={`/recipes`} key={key} >{`  ${tag}  `}</a>
                    ) }
                </div>


                <ul className="blog-post__navigation">
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                            {`< ${previous.frontmatter.title}`}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                            {`${next.frontmatter.title} >`}
                            </Link>
                        )}
                    </li>
                </ul>

                <div className="blog-post__bottom">
                    <div className="blog-post__bottom-title">follow at <a href="https://www.instagram.com/taras.kitchen" target="_blank" rel="noreferrer">@taras.kitchen</a></div>
                    <div className="blog-post__share-tools desktop">
                    <a className="is-icon" href="https://www.instagram.com/taras.kitchen" target="_blank" rel="noreferrer"><Icon size={25} icon={instagram}/></a>
                    <a className="is-icon" href="https://www.facebook.com/tarasiegelskitchen/" target="_blank" rel="noreferrer"><Icon size={25} icon={facebook}/></a>
                    <a className="is-icon" href="mailto:tarafsiegel@gmail.com" target="_blank" rel="noreferrer"><Icon size={25} icon={envelope}/></a>
                </div>
                    
                <div className="blog-post__share-tools mobile">
                    <a className="is-icon" href="https://www.instagram.com/taras.kitchen" target="_blank" rel="noreferrer"><Icon size={30} icon={instagram}/></a>
                    <a className="is-icon" href="https://www.facebook.com/tarasiegelskitchen/" target="_blank" rel="noreferrer"><Icon size={30} icon={facebook}/></a>
                    <a className="is-icon" href="mailto:tarafsiegel@gmail.com" target="_blank" rel="noreferrer"><Icon size={30} icon={envelope}/></a>
                </div>  
                            
                </div>
            </div>
            <div className="blog-post--right"></div>
        </Layout>
    )
                        }
}
export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($id: String!) {
        site {
          siteMetadata {
              title
              author {
                name
              }
          }
        }
        markdownRemark(id: { eq: $id }) {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
              title
              description
              tags
              image {
              childImageSharp {
                  resize(width: 650, height: 650) {
                  src
                  }
                  fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                  }
              }
              }
              date(formatString: "MMMM DD, YYYY")
          }
        }
    }
    `
