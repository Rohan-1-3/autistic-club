import React from 'react';
import { Link } from 'react-router';

function Homepage() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-gray to-purple-300 text-gray-800">
      <div className="text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          A Safe Chatroom for Autistic Voices 💬
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A full-stack chatroom where autistic people can openly share their thoughts, without filters or judgment. Just say what's on your mind.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/chat"
            className=" px-6 py-3 rounded-xl shadow-md hover:bg-white transition"
          >
            Enter Chatroom
          </Link>
          <Link
            to="/user/signup"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl shadow-md hover:bg-blue-100 transition"
          >
            Login / Sign Up
          </Link>
        </div>

        <div className="mt-10 text-sm text-gray-600">
          Built with the <span className="font-semibold">PERN Stack</span>:
          <ul className="mt-2 flex justify-center gap-4 flex-wrap">
            <li className="bg-gray-100 px-3 py-1 rounded">PostgreSQL</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Express.js</li>
            <li className="bg-gray-100 px-3 py-1 rounded">React</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Node.js</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;