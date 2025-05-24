import { Link } from 'react-router';
import Footer from './Footer';
import Header from './Header';

function NotFound() {
  return (
    <>
    <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-gray to-purple-300 text-gray-800">
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Oops! This page doesn't exist.
        </h2>
        <p className="text-md md:text-lg mb-8">
          Maybe the URL is wrong or the page was moved. Either way, you're not alone — let's get you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl shadow-md hover:bg-white transition"
          >
            Go to Homepage
          </Link>
          <Link
            to="/chat"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl shadow-md hover:bg-blue-100 transition"
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

export default NotFound;
