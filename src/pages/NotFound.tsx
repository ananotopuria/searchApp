import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;