import React from 'react';

const Aboutus = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src="" // Replace with your image URL
              alt=""
              className="w-40 h-40 rounded-full border-4 border-blue-500"
            />
          </div>
          {/* Bio Section */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Shubham Srivastava
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Shubham Srivastava is a Computer Science undergraduate from
              Chandigarh University (2021–2025) with expertise in C/C++, Python,
              JavaScript, React, Node.js, and MongoDB. He has developed impactful
              projects like an Online Book Store with secure authentication and
              optimized APIs, and a Smart City Travel System leveraging Dijkstra’s
              algorithm for efficient route selection. A skilled competitive programmer,
              Shubham holds distinctions such as a 3-Star CodeChef rating, Global Rank
              302 in CodeChef Starter 139, and a 6-Star Problem Solver badge on HackerRank.
              With certifications in Web Development, SQL, Data Structures, and IoT, and
              over 500 solved problems on platforms like LeetCode, he showcases a strong
              command of algorithms and problem-solving.
            </p>
          </div>
        </div>
        {/* Links Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Connect with Me:
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shubham-srivastava-53169a231/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <img
                src="https://img.icons8.com/color/24/linkedin.png"
                alt="LinkedIn"
                className="mr-2"
              />
              LinkedIn
            </a>
            {/* CodeChef */}
            <a
              href="https://www.codechef.com/users/shubham_ss100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              <img
                src="https://img.icons8.com/ios/24/ffffff/codechef.png"
                alt="CodeChef"
                className="mr-2"
              />
              CodeChef
            </a>
            {/* LeetCode */}
            <a
              href="https://leetcode.com/u/shubham_ss1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              <img
                src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
                alt="LeetCode"
                className="mr-2"
              />
              LeetCode
            </a>
            {/* HackerRank */}
            <a
              href="https://www.hackerrank.com/sahil290120"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/hackerrank.png"
                alt="HackerRank"
                className="mr-2"
              />
              HackerRank
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/Shubham29012"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/24/ffffff/github.png"
                alt="GitHub"
                className="mr-2"
              />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
