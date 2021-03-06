const config = require("./src/config")
const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    pathPrefix,
    title: config.title,
    titleAlt: config.alternative,
    description: config.description,
    banner: config.banner,
    icon: config.favicon,
    siteLanguage: config.siteLanguage,
    author: config.author,
    instagram: config.instagram
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.shortTitle,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "standalone",
        icon: config.favicon
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `header`,
        path: `${__dirname}/src/components/header`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `config`,
        path: `${__dirname}/src/config`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              quality: 90
            }
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank"
            }
          },
          "gatsby-remark-copy-linked-files"
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`
  ]
}
