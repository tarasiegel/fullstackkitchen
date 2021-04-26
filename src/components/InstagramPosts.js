// import React from 'react'
// import { StaticQuery, Link, graphql } from 'gatsby';

// export default() => (
//     <StaticQuery
//         query={
//             graphql`query
//             allInstaNode {
//               edges {
//                 node {
//                   id
//                   likes
//                   comments
//                   mediaType
//                   preview
//                   original
//                   timestamp
//                   caption
//                   localFile {
//                     childImageSharp {
//                       gatsbyImageData(width: 150, height: 150, layout: FIXED)
//                     }
//                   }
//                   thumbnails {
//                     src
//                     config_width
//                     config_height
//                   }
//                   dimensions {
//                     height
//                     width
//                   }
//                 }
//   }
// }
// `}
//         render={
//             data => {
//                 const edges = data.allInstaNode.edges;
//                 return (
//                     <div className="blog-post__instagram">
//                         {edges.map((post, key) => <a className="instagram-post__item" href={`https://www.instagram.com/p/${post.node.id}/`} target="_blank" rel="noreferrer" key={key}><img src={post.node.thumbnails[1].src} /></a>)}
//                     </div>
//                 )
//             }
//         }
//     />
// );
