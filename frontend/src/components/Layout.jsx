import PropTypes from 'prop-types';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout">
      <main className="layout__content">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
