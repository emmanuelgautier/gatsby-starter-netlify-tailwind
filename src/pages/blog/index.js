import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'

const BlogIndexPage = ({
  data: {
    postsAllMarkdownRemark: { edges: postEdges },
    site: {
      siteMetadata: { siteUrl, title: siteTitle, description: siteDescription },
    },
  },
}) => {
  return (
    <Layout>
      <GatsbySeo
        title={`${siteTitle} blog posts`}
        description={siteDescription}
        canonical={`${siteUrl}blog/`}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {postEdges.map(
            ({
              node: {
                fields: { slug },
                frontmatter: { title, description, featuredimage },
              },
            }) => (
              <BlogPostCard
                slug={slug}
                title={title}
                description={description}
                image={featuredimage}
              />
            )
          )}
        </div>
      </section>
    </Layout>
  )
}

export default BlogIndexPage

export const pageQuery = graphql`
  query BlogIndexPage {
    postsAllMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
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
                  height: 350
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
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
  }
`
