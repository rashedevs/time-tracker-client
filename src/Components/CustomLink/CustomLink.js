import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{
          color: match ? "007bff" : "#ffffff",
          textDecoration: "none",
          borderBottom: match ? "2px solid yellow" : "none",
          paddingBottom: "2px",
          display: "inline-block",
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
