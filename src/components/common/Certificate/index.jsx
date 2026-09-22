import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* ---------- Styled ---------- */

const Card = styled.article`
  position: relative;
  width: 100%;
  aspect-ratio: 1.414 / 1;
  background: linear-gradient(180deg, #0b1327 0%, #0a1020 100%);
  color: #eef2f8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  overflow: hidden;
  container-type: inline-size;
  container-name: certificate;
  box-shadow:
    0 18px 44px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition:
    transform 350ms ease,
    box-shadow 350ms ease,
    border-color 350ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow:
      0 26px 60px rgba(0, 0, 0, 0.6),
      0 0 40px rgba(139, 92, 246, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  /* Subtle dot grid decoration — top-right corner */
  &::before {
    content: '';
    position: absolute;
    top: 6%;
    right: 5%;
    width: 22cqw;
    height: 18cqw;
    background-image: radial-gradient(circle, rgba(139, 92, 246, 0.28) 1px, transparent 1.5px);
    background-size: 1.4cqw 1.4cqw;
    opacity: 0.55;
    pointer-events: none;
    mask-image: radial-gradient(ellipse at top right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 75%);
    -webkit-mask-image: radial-gradient(
      ellipse at top right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%
    );
  }
`;

const Inner = styled.div`
  position: relative;
  height: 100%;
  padding: 6.5cqw 7cqw 5.5cqw 7cqw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3cqw;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
`;

const IssuerBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6cqw;
  min-width: 0;
`;

const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.4cqw;
  height: 4.4cqw;
  color: var(--accent-glow, #8b5cf6);
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const IssuerName = styled.span`
  font-size: 1.55cqw;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #eef2f8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TopLabel = styled.span`
  font-size: 1.15cqw;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.42);
  white-space: nowrap;
`;

const AccentRule = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(139, 92, 246, 0.7) 0%,
    rgba(139, 92, 246, 0.25) 40%,
    rgba(255, 255, 255, 0.05) 100%
  );
`;

const Body = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.4cqw;
  padding: 1.5cqw 2cqw;
`;

const Designation = styled.p`
  font-size: 1.7cqw;
  font-weight: 500;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.62);
  margin: 0;
`;

const Intro = styled.p`
  font-size: 1.35cqw;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: rgba(238, 242, 248, 0.55);
  margin: 1.6cqw 0 0 0;
`;

const Recipient = styled.h2`
  font-size: 4.6cqw;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: 0.005em;
  color: #f6f8fc;
  margin: 0.6cqw 0 0.4cqw 0;
  background: linear-gradient(
    100deg,
    #8b5cf6 0%,
    #6366f1 40%,
    #06b6d4 60%,
    #6366f1 80%,
    #8b5cf6 100%
  );
  background-size: 220% 100%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const RecipientRule = styled.div`
  width: 26cqw;
  max-width: 320px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(139, 92, 246, 0.55) 50%,
    transparent 100%
  );
  margin: 0.8cqw 0 1.8cqw 0;
`;

const CompletionNote = styled.p`
  font-size: 1.35cqw;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: rgba(238, 242, 248, 0.55);
  margin: 0;
`;

const CourseTitle = styled.h3`
  font-size: 2.5cqw;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.005em;
  color: #eef2f8;
  max-width: 78cqw;
  margin: 0.6cqw 0 0 0;
  text-wrap: balance;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3cqw;
  padding-top: 2.5cqw;
`;

const FooterLeft = styled.span`
  font-size: 1.15cqw;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FooterCenter = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.8cqw;
  font-size: 1.05cqw;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.32);
  white-space: nowrap;
`;

const FooterDot = styled.span`
  display: inline-block;
  width: 0.5cqw;
  height: 0.5cqw;
  min-width: 3px;
  min-height: 3px;
  border-radius: 50%;
  background: var(--accent-glow, #8b5cf6);
  opacity: 0.75;
`;

const FooterRight = styled.span`
  font-size: 1.05cqw;
  font-weight: 400;
  letter-spacing: 0.14em;
  color: rgba(238, 242, 248, 0.28);
  white-space: nowrap;
`;

/* ---------- Component ---------- */

const Certificate = ({
  issuer,
  designation = 'Certificate of Completion',
  recipient = 'Usman Murtaza',
  courseTitle,
  issuedNote = 'has successfully completed',
  topLabel = 'Certificate',
}) => {
  return (
    <Card aria-label={`${issuer} — ${courseTitle}`}>
      <Inner>
        <div>
          <Header>
            <IssuerBlock>
              <Mark aria-hidden="true">
                {/* Abstract geometric mark — not a logo, not an imitation of
                    any real brandmark. A simple hexagon outline with an
                    inner accent dot. */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.5 L21 7.5 L21 16.5 L12 21.5 L3 16.5 L3 7.5 Z" />
                  <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
                </svg>
              </Mark>
              <IssuerName title={issuer}>{issuer}</IssuerName>
            </IssuerBlock>
            <TopLabel>{topLabel}</TopLabel>
          </Header>

          <div style={{ marginTop: '2.4cqw' }}>
            <AccentRule />
          </div>
        </div>

        <Body>
          <Designation>{designation}</Designation>

          <Intro>This certifies that</Intro>

          <Recipient>{recipient}</Recipient>

          <RecipientRule />

          <CompletionNote>{issuedNote}</CompletionNote>

          <CourseTitle>{courseTitle}</CourseTitle>
        </Body>

        <div>
          <div
            style={{
              height: 1,
              width: '100%',
              background:
                'linear-gradient(to right, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 100%)',
              marginBottom: '2.2cqw',
            }}
          />
          <Footer>
            <FooterLeft>{issuer}</FooterLeft>
            <FooterCenter>
              <FooterDot aria-hidden="true" />
              Portfolio Presentation
            </FooterCenter>
            <FooterRight>No. -</FooterRight>
          </Footer>
        </div>
      </Inner>
    </Card>
  );
};

Certificate.propTypes = {
  issuer: PropTypes.string.isRequired,
  designation: PropTypes.string,
  recipient: PropTypes.string,
  courseTitle: PropTypes.string.isRequired,
  issuedNote: PropTypes.string,
  topLabel: PropTypes.string,
};

export default Certificate;
