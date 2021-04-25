module.exports = {
  siteMetadata: {
    title: `Full Stack Kitchen`,
    author: `Tara Siegel`,
    description: `Full Stack Kitchen: Unique Dessert Recipes from an Engineer's Mind`,
    siteUrl: `https://fullstackkitchen.com/`,
    social: {
      instagram: `taras.kitchen`,
    },
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-38256341-2",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Full Stack Kitchen by Tara Siegel`,
        short_name: `Full Stack Kitchen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/fsk-icon.png`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
