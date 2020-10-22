import Meta from './meta';

const Layout = (props) => (
  <div className="container">
    <Meta></Meta>
    {props.children}
    <style jsx global>{`
      body,
      html {
        height: 100%;
        padding: 5px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    `}</style>
  </div>
);

export default Layout;
