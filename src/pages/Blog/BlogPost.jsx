import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogPostBySlug } from '../../data/blogPosts';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { toWebpSrcSet } from '../../utils/image';

const SITE_URL = 'https://usmanmurtaza.netlify.app';

/* ---------- Styled ---------- */

const Section = styled.article`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0 100px;
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 120px 0 80px;
  }

  @media (max-width: 640px) {
    padding: 110px 0 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 780px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary, #a0a0b8);
  text-decoration: none;
  padding: 6px 10px;
  margin-left: -10px;
  margin-bottom: 24px;
  border-radius: 8px;
  transition:
    color 200ms ease,
    background 200ms ease;

  &:hover {
    color: var(--accent-glow, #8b5cf6);
    background: rgba(139, 92, 246, 0.08);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 2px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.9rem, 4.5vw, 2.8rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 20px 0;
  color: var(--text-primary, #f2f2f7);
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-secondary, #a0a0b8);
  margin-bottom: 28px;

  span.dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: auto;
`;

const Tag = styled.span`
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--accent-glow, #8b5cf6);
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.22);
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
`;

const CoverWrap = styled(motion.div)`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 40px;

  picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  @media (max-width: 640px) {
    aspect-ratio: 4 / 3;
    border-radius: 0.85rem;
    margin-bottom: 28px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary, #b0b0c0);
  margin: 0 0 1.4rem 0;

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.75;
  }
`;

const H2 = styled.h2`
  font-size: 1.65rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 2.4rem 0 1rem 0;
  color: var(--text-primary, #f2f2f7);
  letter-spacing: -0.01em;

  @media (max-width: 640px) {
    font-size: 1.4rem;
    margin: 2rem 0 0.85rem 0;
  }
`;

const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 1.8rem 0 0.75rem 0;
  color: var(--text-primary, #f2f2f7);

  @media (max-width: 640px) {
    font-size: 1.12rem;
  }
`;

const CodeBlock = styled.pre`
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 18px 20px;
  margin: 1.6rem 0;
  overflow-x: auto;
  font-family: 'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', monospace;
  font-size: 0.86rem;
  line-height: 1.6;
  color: #e6e6ef;

  code {
    white-space: pre;
    font-family: inherit;
  }

  @media (max-width: 640px) {
    padding: 14px 16px;
    font-size: 0.78rem;
    border-radius: 10px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.4rem 0;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.65rem;
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--text-secondary, #b0b0c0);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-glow, #8b5cf6);
      opacity: 0.7;
    }
  }

  @media (max-width: 640px) {
    li {
      font-size: 1rem;
      padding-left: 1.25rem;
    }
  }
`;

const Quote = styled.blockquote`
  margin: 1.6rem 0;
  padding: 12px 20px;
  border-left: 3px solid var(--accent-glow, #8b5cf6);
  background: rgba(139, 92, 246, 0.05);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-primary, #f2f2f7);
  font-style: italic;
  border-radius: 0 10px 10px 0;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent, rgba(139, 92, 246, 0.4), transparent);
  margin: 3rem 0 2rem 0;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 1rem;

  p {
    font-size: 0.98rem;
    color: var(--text-secondary, #a0a0b8);
    line-height: 1.6;
    margin: 0;
  }

  a {
    color: var(--accent-glow, #8b5cf6);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    transition: border-color 200ms ease;

    &:hover {
      border-color: currentColor;
    }
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

const NotFound = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h2 {
    font-size: 1.5rem;
    color: var(--text-primary, #f2f2f7);
    margin: 0;
  }

  p {
    color: var(--text-secondary, #a0a0b8);
    margin: 0;
    line-height: 1.6;
  }

  a {
    color: var(--accent-glow, #8b5cf6);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ---------- Helpers ---------- */

const formatDate = iso => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
};

const renderBlock = (block, index) => {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph key={index}>{block.text}</Paragraph>;
    case 'heading':
      return block.level === 3 ? (
        <H3 key={index}>{block.text}</H3>
      ) : (
        <H2 key={index}>{block.text}</H2>
      );
    case 'code':
      return (
        <CodeBlock key={index}>
          <code>{block.code}</code>
        </CodeBlock>
      );
    case 'list':
      return (
        <List key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      );
    case 'quote':
      return <Quote key={index}>{block.text}</Quote>;
    default:
      return null;
  }
};

/* ---------- Component ---------- */

const BlogPost = () => {
  const { slug } = useParams();
  const prefersReduced = useReducedMotion();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <Section>
        <NotFound>
          <h2>Article not found</h2>
          <p>The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog">← Back to all articles</Link>
        </NotFound>
      </Section>
    );
  }

  const canonical = post.canonical || `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Usman Murtaza',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Usman Murtaza',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    keywords: (post.tags || []).join(', '),
  };

  return (
    <Section>
      <Helmet>
        <title>{`${post.title} | Usman Murtaza`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Usman Murtaza Portfolio" />
        <meta property="article:published_time" content={post.date} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@usman_murtazaa" />
        <meta name="twitter:creator" content="@usman_murtazaa" />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Wrapper>
        <BackLink to="/blog" aria-label="Back to all articles">
          ← Back to all articles
        </BackLink>

        <Title
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          {post.title}
        </Title>

        <Meta>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="dot" aria-hidden="true" />
          <span>{post.readingTime} read</span>
          {post.tags?.length > 0 && (
            <TagRow>
              {post.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagRow>
          )}
        </Meta>

        {post.coverImage && (
          <CoverWrap
            variants={prefersReduced ? {} : fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <picture>
              <source srcSet={toWebpSrcSet(post.coverImage)} type="image/webp" />
              <img src={post.coverImage} alt={post.title} loading="eager" decoding="async" />
            </picture>
          </CoverWrap>
        )}

        <Body>{post.content.map(renderBlock)}</Body>

        <Divider />

        <Footer>
          <p>
            Thanks for reading. If this was useful, feel free to reach out — I am always happy to
            discuss React, Node.js, or building products from scratch.
          </p>
          <div className="links">
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
              Portfolio →
            </a>
            {post.liveUrl && (
              <a href={post.liveUrl} target="_blank" rel="noopener noreferrer">
                Live demo →
              </a>
            )}
            {post.githubUrl && (
              <a href={post.githubUrl} target="_blank" rel="noopener noreferrer">
                Source code →
              </a>
            )}
          </div>
        </Footer>
      </Wrapper>
    </Section>
  );
};

export default BlogPost;
