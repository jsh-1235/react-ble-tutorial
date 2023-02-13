import styles from "./Header.module.css";

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

const urls = ["Basic", "Sync", "Async"];

function mapStateToProps(state) {
  return {
    url: state.url,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: function (path, title) {
      const url = { path, title };

      dispatch({ type: "URL", url });
    },
  };
}

function Header({ ...props }) {
  const location = useLocation();

  useEffect(() => {
    const result = urls.filter((url) => location.pathname.includes(url));

    if (result.length) {
      props.onClick(location.pathname, result[0]);
    } else {
      props.onClick(location.pathname, "BLE Tutorial");
    }
  }, [location.pathname]);

  return (
    <>
      <div className={styles.title}>
        <Link className="text-link" to="/">
          {props.url.title}
        </Link>
      </div>
      <ul className={styles.menu}>
        {urls.map((url, i) => {
          return (
            <li key={i}>
              <Link className="list-link" to={`${url}`}>
                {url}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
