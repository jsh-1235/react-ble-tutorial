import React from "react";

import { Link, useResolvedPath, useMatch } from "react-router-dom";

export default function Linker({ to, children, ...props }) {
  let resolved = useResolvedPath(to);
  const match = useMatch(resolved.pathname);

  // console.log(to, children, resolved.pathname, match);

  return (
    <li>
      <Link className="list-link" style={{ backgroundColor: match ? "#85bb5c" : null }} to={to} {...props}>
        {children}
        {/* {children} {match && " (active)"} */}
      </Link>
    </li>
  );
}
