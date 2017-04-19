// @flow
import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './style.css';

const cx = classnames.bind(styles);

export type TopicProps = {
  slug: answer,
  question: string,
  answer: string,
}

class Topic extends Component {
  constructor(props: TopicProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  state: {
    open: boolean,
  };
  props: TopicProps;

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  answerToggle = () => {
    const open = this.state.open;
    return (
      <span
        className={open ? styles.topic__minus : styles.topic__plus}
      />
    );
  }

  /* eslint-disable react/no-danger */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const { slug, question, answer } = this.props;
    const { open } = this.state;
    const strongText = `<strong class="${styles.topic__answer__strong}"`;
    const externalLink = '<a rel="noopener noreferrer" target="_blank"';
    const formattedAnswer = answer.replace(/<strong/g, strongText).replace(/<a/g, externalLink);
    return (
      <div>
        <div
          className={styles.topic__question}
          onClick={this.handleClick}
        >
          <h4 className={styles.topic__heading}>
            {question}
          </h4>
          <button
            aria-controls={slug}
            aria-expanded={open}
            className={styles.topic__more}
          >
            {this.answerToggle()}
          </button>
        </div>
        <div
          id={slug}
          className={cx('topic__answer', `topic__answer${open ? '--visible' : '--hidden'}`)}
          dangerouslySetInnerHTML={{ __html: formattedAnswer }}
        />
      </div>
    );
  }
}

export default Topic;
