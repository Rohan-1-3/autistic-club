import { Link, useRouteError } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function ErrorPage() {
const error = useRouteError();

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-gray to-purple-300 text-gray-800">
        <div className="text-center px-6 max-w-2xl">
          <h1 className="text-6xl font-bold mb-4">Oops!</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Something went wrong.
          </h2>
          <p className="text-md md:text-lg mb-8">
            {error?.message || "An unexpected error occurred. Please try again later."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              aria-label="Go to homepage"
              className="px-6 py-3 rounded-xl shadow-md bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Go to Homepage
            </Link>
            <Link
              to="/chat"
              aria-label="Enter chatroom"
              className="px-6 py-3 rounded-xl shadow-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition-colors duration-300"
            >
              Enter Chatroom
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
