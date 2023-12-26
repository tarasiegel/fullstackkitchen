// import React from 'react';
// import Image from 'gatsby-image';
// import useInstagram from '../hooks/use-instagram';

// const InstagramPosts = props => {
//   const { limit = 32 } = props;
//   let instaPhotos = useInstagram();
//   instaPhotos = instaPhotos ? instaPhotos.slice(0, limit) : [];
//   const username = instaPhotos?.[0]?.username;

//   return instaPhotos.length > 0 ? (
//     <div className="blog-post__instagram">
//       {instaPhotos.map((photo, key) => (
//         <a
//           className="instagram-post__item"
//           href={`https://www.instagram.com/p/${photo.id}/`}
//           target="_blank"
//           rel="noreferrer"
//           key={key}
//         >
//           <Image key={photo.id} fluid={photo.fluid} alt={photo.caption} />
//         </a>
//       ))}
//       <a href={`https://instagram.com/${username}`}>See more on Instagram &rarr;</a>
//     </div>
//   ) : null;
// };

// export default InstagramPosts;
