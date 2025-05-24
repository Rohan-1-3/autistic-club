import React from 'react';

function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-inner">
            <div className="mx-auto px-4 py-6">
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} All rights reserved by this{" "}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                        <a
                            href="https://github.com/Rohan-1-3"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            autistic-guy
                        </a>
                    </span>
                    .
                </p>
                <p className="text-center text-xs mt-2 text-gray-600 dark:text-gray-400">
                    Licensed under the MIT License. You are free to use, modify, and distribute this project with attribution.
                </p>
            </div>
        </footer>
    );
}

export default Footer;