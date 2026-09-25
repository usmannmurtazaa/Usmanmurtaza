import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReducedMotion, springTransition } from '../../motionConfig';
import { toWebpSrcSet } from '../../utils/image';

/* ---------- Styled ---------- */

const Card = styled(motion.a)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.25rem;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow:
      var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6)),
      0 0 24px rgba(139, 92, 246, 0.18);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-glow, #8b5cf6);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    padding: 12px;
    border-radius: 1rem;
  }
`;

const Cover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 0.85rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);

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
    transition: transform 500ms ease;
  }

  @media (hover: hover) {
    ${Card}:hover & img {
      transform: scale(1.04);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
    ${Card}:hover & img {
      transform: none;
    }
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: var(--text-secondary, #a0a0b8);
  letter-spacing: 0.02em;

  span.dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary, #f2f2f7);
  margin: 0;
  letter-spacing: -0.01em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 1.05rem;
  }
`;

const Description = styled.p`
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-secondary, #a0a0b8);
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
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

const ReadMore = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent-glow, #8b5cf6);
  transition: gap 200ms ease;

  span.arrow {
    display: inline-block;
    transition: transform 200ms ease;
  }

  ${Card}:hover & span.arrow {
    transform: translateX(3px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    ${Card}:hover & span.arrow {
      transform: none;
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
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
};

/* ---------- Component ---------- */

const BlogCard = ({ post }) => {
  const prefersReduced = useReducedMotion();

  const href = `/blog/${post.slug}`;
  const cover = post.coverImage;

  const motionProps = prefersReduced
    ? {}
    : {
        whileTap: { scale: 0.99, transition: springTransition },
      };

  return (
    <Card href={href} {...motionProps}>
      <Cover>
        <picture>
          <source srcSet={toWebpSrcSet(cover)} type="image/webp" />
          <img src={cover} alt={post.title} loading="lazy" decoding="async" />
        </picture>
      </Cover>

      <Meta>
        <span>{formatDate(post.date)}</span>
        <span className="dot" aria-hidden="true" />
        <span>{post.readingTime} read</span>
      </Meta>

      <Title>{post.title}</Title>
      <Description>{post.description}</Description>

      {post.tags?.length > 0 && (
        <TagRow>
          {post.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagRow>
      )}

      <ReadMore>
        Read article <span className="arrow">→</span>
      </ReadMore>
    </Card>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    readingTime: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    coverImage: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
