import React, { PropTypes } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './style.css';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    stateNavigator: PropTypes.object,
  }

  getChildContext() {
    return { stateNavigator: this.props.stateNavigator };
  }

  render() {
    return (
      <div className={styles.application}>
        <Header />
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
