import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AuthNav() {
  const location = useLocation();

  return (
    <div style={{ marginTop: 12, textAlign: "center" }}>
      {location.pathname === "/login" ? (
        <>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: "#09c", textDecoration: "underline" }}>
            Sign up here
          </Link>
        </>
      ) : location.pathname === "/signup" ? (
        <>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#09c", textDecoration: "underline" }}>
            Log in here
          </Link>
        </>
      ) : null}
    </div>
  );
}
