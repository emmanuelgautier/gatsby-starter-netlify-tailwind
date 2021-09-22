import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'

const IndexPage = ({ data: { postsAllMarkdownRemark: { edges: posts } } }) => (
  <Layout>
    <GatsbySeo title={`Starter Homepage`} description={`Gatsby starter with netlify CMS and TailwindCSS`} />

    <div className="lg:flex space-x-0 lg:space-x-6 mb-16">
      <div className="w-full lg:w-1/2">
        {posts.map(
          ({
            node: {
              fields: { slug },
              frontmatter: { title, description, featuredimage },
            },
          }) => (
              <div
                key={slug}
                className="rounded w-full flex flex-col lg:flex-row mb-5"
              >
                <Link to={slug}>
                  <GatsbyImage
                    image={getImage(featuredimage)}
                    alt={title}
                    title={title}
                    className="block lg:block rounded-md h-32 m-4 lg:m-0"
                  />
                </Link>
                <div className="bg-white rounded px-4">
                  <Link to={slug}>
                    <h3 className="text-gray-800 font-semibold text-lg lg:text-xl mb-2">
                      {title}
                    </h3>
                  </Link>
                  <p className="block lg:hidden p-2 pt-1 text-sm text-gray-600">
                    {description}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    postsAllMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    postsAllMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 5
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredimage {
              childImageSharp {
                gatsbyImageData(
                  height: 120
                  width: 350
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  layout: CONSTRAINED
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
