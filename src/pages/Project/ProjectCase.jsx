import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Bio, projects } from '../../data/constants';
import { getProjectBySlug, getProjectSlug } from '../../data/projectSlugs';
import { useReducedMotion, fadeInUpVariants } from '../../motionConfig';
import { toWebpSrcSet } from '../../utils/image';
import { Icon } from '../../components/common/Icon';

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
  max-width: 860px;
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
  margin-bottom: 28px;
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

const ChipRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent-glow, #8b5cf6);
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.22);
  padding: 4px 12px;
  border-radius: 999px;
`;

const ChipMuted = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary, #a0a0b8);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 12px;
  border-radius: 999px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: var(--text-primary, #f2f2f7);
`;

const Lead = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary, #b0b0c0);
  margin: 0 0 32px 0;
  max-width: 720px;
`;

const CoverWrap = styled(motion.div)`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 48px;

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
    margin-bottom: 32px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionBlock = styled(motion.section)`
  margin: 0 0 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 14px 0;
  color: var(--text-primary, #f2f2f7);
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.01em;

  &::before {
    content: '';
    width: 4px;
    height: 22px;
    background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
    border-radius: 2px;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--text-secondary, #b0b0c0);
  margin: 0;
`;

const StackGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const StackChip = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary, #f2f2f7);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 10px;
  transition:
    border-color 200ms ease,
    color 200ms ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    color: var(--accent-glow, #8b5cf6);
  }
`;

const ImpactBox = styled.div`
  background: rgba(139, 92, 246, 0.07);
  border-left: 4px solid var(--accent-glow, #8b5cf6);
  border-radius: 12px;
  padding: 18px 22px;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-primary, #f2f2f7);
  font-weight: 500;
`;

const MetaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const MetaCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 18px 20px;

  h4 {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-secondary, #a0a0b8);
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text-primary, #f2f2f7);
    margin: 0;
    line-height: 1.5;
  }
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition:
    transform 200ms ease,
    border-color 200ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(139, 92, 246, 0.3);
  }
`;

const MemberImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--accent-glow, #8b5cf6);
  object-fit: cover;
  flex-shrink: 0;
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MemberName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary, #f2f2f7);
  margin-bottom: 2px;
`;

const MemberRole = styled.div`
  font-size: 0.82rem;
  color: var(--text-secondary, #a0a0b8);
`;

const LinkGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 4px;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease,
    background 200ms ease;
  background: ${({ $primary }) =>
    $primary
      ? 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6))'
      : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ $primary }) => ($primary ? 'white' : 'var(--text-primary, #f2f2f7)')};
  border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'rgba(255, 255, 255, 0.12)')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
  }

  @media (max-width: 640px) {
    flex: 1;
    min-width: 140px;
    justify-content: center;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent, rgba(139, 92, 246, 0.35), transparent);
  margin: 40px 0;
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

const levelLabel = level => {
  switch (level) {
    case 'featured':
      return 'Featured';
    case 'secondary':
      return 'Secondary';
    case 'utility':
      return 'Utility';
    default:
      return level || 'Project';
  }
};

/**
 * Normalize an image reference into an absolute URL for JSON-LD.
 * - Empty / missing → null (omit the field).
 * - Already absolute (http/https) → returned as-is (Firebase docs, etc.).
 * - Root-relative (/something.png) → prefixed with SITE_URL.
 * - Anything else (relative without leading slash) → prefixed with SITE_URL + '/'.
 */
const toAbsoluteUrl = src => {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return `${SITE_URL}${src}`;
  return `${SITE_URL}/${src}`;
};

/* ---------- Component ---------- */

const ProjectCase = () => {
  const { slug } = useParams();
  const prefersReduced = useReducedMotion();
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    return (
      <Section>
        <NotFound>
          <h2>Project not found</h2>
          <p>The project you are looking for does not exist or has been moved.</p>
          <Link to="/">← Back to portfolio</Link>
        </NotFound>
      </Section>
    );
  }

  const canonical = `${SITE_URL}/projects/${getProjectSlug(project)}`;
  const image = project.image || project.img || '';
  const absoluteImage = toAbsoluteUrl(image);
  const stack = project.stack || project.tags || [];
  const members = project.member || [];
  const links = project.links || {};
  const liveUrl = links.live || project.webapp || '';
  const githubUrl = links.github || project.github || '';
  const leadText = project.keyHighlight || project.solution || project.description || '';

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.problem || project.description || '',
    url: canonical,
    // Only include the image if we have an absolute URL — otherwise
    // omit the field so validators do not complain about a relative
    // or empty value.
    ...(absoluteImage ? { image: absoluteImage } : {}),
    dateCreated: project.date,
    author: { '@id': `${SITE_URL}/#person` },
    creator: { '@id': `${SITE_URL}/#person` },
    keywords: stack.join(', '),
  };

  return (
    <Section>
      <Helmet>
        <title>{`${project.title} | ${Bio.name}`}</title>
        <meta
          name="description"
          content={project.problem || project.solution || project.description || project.title}
        />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={project.title} />
        <meta
          property="og:description"
          content={project.problem || project.solution || project.description || project.title}
        />
        {absoluteImage && <meta property="og:image" content={absoluteImage} />}
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Usman Murtaza Portfolio" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta
          name="twitter:description"
          content={project.problem || project.solution || project.description || project.title}
        />
        {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
        <meta name="twitter:site" content="@usman_murtazaa" />
        <meta name="twitter:creator" content="@usman_murtazaa" />

        <script type="application/ld+json">{JSON.stringify(workSchema)}</script>
      </Helmet>

      <Wrapper>
        <BackLink to="/" aria-label="Back to portfolio">
          ← Back to portfolio
        </BackLink>

        <ChipRow
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          {project.categoryNormalized && <Chip>{project.categoryNormalized}</Chip>}
          {project.level && <ChipMuted>{levelLabel(project.level)}</ChipMuted>}
          {project.date && <ChipMuted>{project.date}</ChipMuted>}
          {project.complexityScore && (
            <ChipMuted>
              <Icon name="activity" size={12} /> {project.complexityScore}/10
            </ChipMuted>
          )}
        </ChipRow>

        <Title
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {project.title}
        </Title>

        {leadText && (
          <Lead
            variants={prefersReduced ? {} : fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {leadText}
          </Lead>
        )}

        {image && (
          <CoverWrap
            variants={prefersReduced ? {} : fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <picture>
              <source srcSet={toWebpSrcSet(image)} type="image/webp" />
              <img src={image} alt={project.title} loading="eager" decoding="async" />
            </picture>
          </CoverWrap>
        )}

        {/* Meta grid: role, category, stack count, date */}
        <MetaGrid
          variants={prefersReduced ? {} : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {project.myRole && (
            <MetaCard>
              <h4>My Role</h4>
              <p>{project.myRole}</p>
            </MetaCard>
          )}
          {project.categoryNormalized && (
            <MetaCard>
              <h4>Category</h4>
              <p>{project.categoryNormalized}</p>
            </MetaCard>
          )}
          {stack.length > 0 && (
            <MetaCard>
              <h4>Stack</h4>
              <p>{stack.length} technologies</p>
            </MetaCard>
          )}
          {project.date && (
            <MetaCard>
              <h4>Timeline</h4>
              <p>{project.date}</p>
            </MetaCard>
          )}
        </MetaGrid>

        <Body>
          {project.problem && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Problem</SectionTitle>
              <Paragraph>{project.problem}</Paragraph>
            </SectionBlock>
          )}

          {project.solution && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Solution</SectionTitle>
              <Paragraph>{project.solution}</Paragraph>
            </SectionBlock>
          )}

          {project.technicalChallenge && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Technical Challenge</SectionTitle>
              <Paragraph>{project.technicalChallenge}</Paragraph>
            </SectionBlock>
          )}

          {stack.length > 0 && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Tech Stack</SectionTitle>
              <StackGrid>
                {stack.map((tech, i) => (
                  <StackChip key={i}>{tech}</StackChip>
                ))}
              </StackGrid>
            </SectionBlock>
          )}

          {project.impact && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Impact</SectionTitle>
              <ImpactBox>{project.impact}</ImpactBox>
            </SectionBlock>
          )}

          {members.length > 0 && (
            <SectionBlock
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Team</SectionTitle>
              <MembersGrid>
                {members.map((member, idx) => (
                  <MemberCard key={idx}>
                    <MemberImage
                      src={member.img}
                      alt={member.name || 'Team member'}
                      loading="lazy"
                    />
                    <MemberInfo>
                      <MemberName>{member.name || 'Team Member'}</MemberName>
                      {member.role && <MemberRole>{member.role}</MemberRole>}
                    </MemberInfo>
                  </MemberCard>
                ))}
              </MembersGrid>
            </SectionBlock>
          )}
        </Body>

        {(liveUrl || githubUrl) && (
          <>
            <Divider />
            <SectionBlock
              style={{ marginBottom: 0 }}
              variants={prefersReduced ? {} : fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle>Project Links</SectionTitle>
              <LinkGroup>
                {liveUrl && (
                  <LinkButton
                    $primary
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live application"
                  >
                    <Icon name="external" size={16} /> Live Demo
                  </LinkButton>
                )}
                {githubUrl && (
                  <LinkButton
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source code on GitHub"
                  >
                    <Icon name="github" size={16} /> Source Code
                  </LinkButton>
                )}
              </LinkGroup>
            </SectionBlock>
          </>
        )}
      </Wrapper>
    </Section>
  );
};

export default ProjectCase;
