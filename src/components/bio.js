/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  console.log(social);
  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={75}
        height={75}
        quality={95}
        alt="Profile picture"
      />
      <p style={{ maxWidth: 292 }}>
        Personal blog by{" "}
        <a
          href={social.github}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          {author.name}
        </a>.{" "}
        {author.summary}
      </p>
    </div>
  )
}

export default Bio
