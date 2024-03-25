import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="text-center mt-12">
      <p className="font-medium text-2xl">404 Page Not Found !!</p>

      <div className="mt-5 font-medium">
        Back to
        <Link to="/">
          <button className="bg-gray-300 px-2 rounded ml-1">Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
