// @flow
import InlineSVG from 'svg-inline-react';
import ReactGA from 'react-ga';
import classnames from 'classnames/bind';
import React from 'react';
import styles from './style.css';
import Link from '../link';

/* SVGs */
import githubSVG from './SVG/github.svg';
import facebookSVG from './SVG/facebook.svg';
import gplusSVG from './SVG/g-plus.svg';
import instagramSVG from './SVG/instagram.svg';
import linkedinSVG from './SVG/linked-in.svg';
import slackSVG from './SVG/slack.svg';
import twitterSVG from './SVG/twitter.svg';
import youtubeSVG from './SVG/youtube.svg';
import mapPinSVG from './SVG/map-pin.svg';
import badgerSVG from './SVG/badger-on-black.svg';
import mapPNG from './PNG/map.png';

const cx = classnames.bind(styles);

const trackAnalytics = title => () =>
  ReactGA.event({
    category: 'FooterNavigation',
    action: title,
    label: `From: ${window.location.pathname}`,
  });

const Footer = () => (
  <footer role="contentinfo" className={styles.footer}>
    <div className={styles.footerContainer}>
      <img
        role="presentation"
        alt="Map of Red Badger office"
        src={mapPNG}
        className={styles.footerMap}
      />
      <div className={styles.footerSections}>
        <nav role="navigation" className={cx('section', 'footerLinks', 'underline')}>
          <ul className={styles.nav}>
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <li>
              <Link to="homePage">
                <span onClick={trackAnalytics('Home')}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="aboutUsPage">
                <span onClick={trackAnalytics('About us')}>About us</span>
              </Link>
            </li>
            <li>
              <Link to="whatWeDoPage">
                <span onClick={trackAnalytics('What we do')}>What we do</span>
              </Link>
            </li>
            <li>
              <a href="/blog">
                <span onClick={trackAnalytics('Blog')}>Blog</span>
              </a>
            </li>
            <li>
              <Link to="events">
                <span onClick={trackAnalytics('Events')}>Events</span>
              </Link>
            </li>
            <li>
              <Link to="joinUs">
                <span onClick={trackAnalytics('Jobs')}>Jobs</span>
              </Link>
            </li>
            {/* eslint-enable jsx-a11y/no-static-element-interactions */}
          </ul>
        </nav>

        <div>
          <div className={cx('section', 'social', 'underline')}>
            <span className={styles.screenReaderText}>Email us at</span>
            <a href="mailto:hello@red-badger.com" className={styles.mailtoLink}>
              <span className={styles.mailtoLinkText}>hello@red-badger.com</span>
            </a>
            <span className={styles.screenReaderText}>Call us on</span>
            <a href="tel:+442035670555" className={styles.telLink}>
              <span className={styles.telLinkText}>
                <span>+</span>
                <span>4</span>
                <span>4 </span>
                <span>(</span>
                <span>0</span>
                <span>) </span>
                <span>2</span>
                <span>0 </span>
                <span>3</span>
                <span>5</span>
                <span>6</span>
                <span>7 </span>
                <span>0</span>
                <span>5</span>
                <span>5</span>
                <span>5</span>
              </span>
            </a>
            <span className={styles.screenReaderText}>Find us on social media</span>
            <ul className={styles.socialLinks}>
              <li>
                <a
                  href="https://github.com/redbadger"
                  title="Red Badger Github"
                  aria-label="Red Badger Github"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={githubSVG} title="Github" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/redbadgerteam"
                  title="Red Badger Twitter"
                  aria-label="Red Badger Twitter"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={twitterSVG} title="Twitter" />
                </a>
              </li>
              <li>
                <a
                  href="https://redbadger.typeform.com/to/cBuJUl"
                  title="Red Badger Slack"
                  aria-label="Red Badger Slack"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={slackSVG} title="Slack" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/red-badger"
                  title="Red Badger Linkedin"
                  aria-label="Red Badger Linkedin"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={linkedinSVG} title="Linkedin" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/redbadgerteam/"
                  title="Red Badger Instagram"
                  aria-label="Red Badger Instagram"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={instagramSVG} title="Instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/RedBadger"
                  title="Red Badger Facebook"
                  aria-label="Red Badger Facebook"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={facebookSVG} title="Facebook" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/redbadgerteam"
                  title="Red Badger Youtube"
                  aria-label="Red Badger Youtube"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={youtubeSVG} title="Youtube" />
                </a>
              </li>
              <li>
                <a
                  href="https://plus.google.com/+Redbadgerteam"
                  title="Red Badger Google Plus"
                  aria-label="Red Badger Google Plus"
                  className={styles.socialIcon}
                >
                  <InlineSVG src={gplusSVG} title="Google Plus" />
                </a>
              </li>
            </ul>
          </div>
          <div className={cx('section', 'address', 'underline')}>
            <InlineSVG role="presentation" src={mapPinSVG} className={styles.mapPin} />
            <div className={styles.mapContainer}>
              <address>
                <p>4th Floor</p>
                <p>2 Old Street Yard</p>
                <p>London</p>
                <p>
                  <a
                    title="Red Badger address on Google Maps"
                    aria-label="Red Badger address on Google Maps"
                    href="https://www.google.co.uk/maps/place/Red+Badger/@51.524652,-0.0903147,17z/data=!3m1!4b1!4m5!3m4!1s0x48761ca9aaaaaaab:0xf14bdb5cbedebef9!8m2!3d51.524652!4d-0.088126"
                  >
                    EC1Y 8AF
                  </a>
                </p>
                <p className={styles.addressHint}>(Featherstone Street entrance)</p>
              </address>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerEndContainer}>
        <div className={cx('section', 'disclaimer', 'noBorder')}>
          <p className={cx('afterDivider', 'disclaimerParagraph')}>
            © Red Badger Consulting Limited {new Date().getFullYear()}
          </p>
          <p className={cx('afterDivider', 'disclaimerParagraph')}>
            Registered in England No. 7242017
          </p>
          <p className={styles.disclaimerParagraph}>VAT Registration No. 990 8085 82</p>
          <p className={styles.cookieWarning}>
            We use cookies on our website. For more information, view our privacy policy.
          </p>
        </div>
        <InlineSVG
          src={badgerSVG}
          className={styles.badgerIcon}
          title="Sally the Red Badger Badger"
        />
      </div>
    </div>
  </footer>
);

export default Footer;
