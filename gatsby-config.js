const siteUrl = 'https://gatsby-starter-netlify-tailwind.netlify.app/'
const title = 'Gatsby Starter Netlify Tailwind'
const description =
  'This repo contains an example blog website that is built with Gatsby, and Netlify CMS.It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.'
const logo = '/img/logo.png'
const srcLogo = 'src/images/gatsby-icon.png'
const color = '#433e85'
const social = {
  twitter: 'gautier_manu',
  instagram: '',
  youtube: '',
  github: 'emmanuelgautier',
  linkedin: 'emmanuelgautier1',
}
const gtagId = 'G-V165P2CKRK'

module.exports = {
  siteMetadata: {
    siteUrl,
    logo,
    title,
    description,
    color,
    social,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,

              linkImagesToOriginal: true,
              loading: 'lazy',
              showCaptions: true,
              disableBgImage: true,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        title,
        language: 'en',
        description,
        canonical: siteUrl,
        openGraph: {
          type: 'website',
          locale: 'en_US',
          url: siteUrl,
          description,
          title,
          site_name: title,
        },
        twitter: {
          site: social.twitter,
          cardType: 'summary_large_image',
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
                ) {
                      edges {
                      node {
                      html
                      fields { slug }
                      frontmatter {
                      title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Blog RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [gtagId],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: color,
        display: `minimal-ui`,
        icon: srcLogo,
      },
    },
  ],
}
