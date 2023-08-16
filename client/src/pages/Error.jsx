import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Error Pages</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
};
export default Error;
