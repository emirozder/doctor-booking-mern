import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* LEFT SECTION */}
        <div>
          <img
            src={assets.logo}
            alt="heal-point-logo"
            className="w-[150px] mb-5"
          />
          <p className="w-full md:w-11/12 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            repellat ex dolorum minima corrupti. Officiis, aliquam pariatur.
            Odit, quo consectetur facere placeat eius quos ratione deleniti
            ducimus voluptatibus soluta. Cupiditate officia voluptatem optio eum
            similique cumque eveniet ratione blanditiis delectus, itaque est
            dignissimos dolores dolorem vel? Commodi provident eaque laborum.
          </p>
        </div>

        {/* CENTER SECTION */}
        <div>
          <p className="text-lg font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <p className="text-lg font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-234-567-8900</li>
            <li>emir.ozder@hotmail.com</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div>
        <hr />
        <p className="text-center text-sm py-4 text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://emirozder.dev" target="_blank">
            Emir Özder
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
