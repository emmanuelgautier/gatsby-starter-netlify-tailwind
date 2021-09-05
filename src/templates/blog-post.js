import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import {
  GatsbySeo,
  ArticleJsonLd,
} from 'gatsby-plugin-next-seo'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

const BlogPost = ({
  data: {
    post,
    site: {
      siteMetadata: { siteUrl },
    },
  },
}) => {
  const url = `${siteUrl}${post.fields.slug}`
  const { description, featuredimage, publishedDate, title } = post.frontmatter

  return (
    <Layout>
      <GatsbySeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          article: {
            publishedTime: publishedDate,
            modifiedTime: publishedDate,
          },
          images: [
            {
              url: `${siteUrl}${getSrc(featuredimage)}`,
              alt: title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url}
        headline={title}
        images={[`${siteUrl}${getSrc(featuredimage)}`]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        publisherLogo={`${siteUrl}/logo.png`}
        description={description}
        overrides={{
          '@type': 'BlogPosting',
        }}
      />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
        <header className="pt-2 pb-2 lg:pb-4">
          <GatsbyImage
            image={getImage(featuredimage)}
            className="rounded-md object-cover w-full h-64 lg:h-96 mb-4 lg:mb-8"
            alt={title}
            title={title}
          />
          <div className="space-y-4 text-left">
            <h1 className="text-3xl leading-12 text-gray-800 lg:text-4xl lg:leading-14 mb-2">
              {title}
            </h1>
            <p class="text-sm lg:text-base font-normal text-gray-600">Published {publishedDate}</p>
          </div>
        </header>

        <div className="mt-4">
          <HTMLContent
            className="prose max-w-none"
            content={post.html}
          />
        </div>
      </article>
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date
        title
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
        description
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`
