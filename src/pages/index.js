import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>David</h1>
    <p>This is fast</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>Index</h2>
    <ul>    
      {
        data.allMarkdownRemark.edges.map(post => (
          <li><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></li>
        ))
      }
    </ul>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default IndexPage
