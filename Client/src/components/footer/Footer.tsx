import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiGooglepay,
  SiApplepay,
} from "react-icons/si";

const DarkThemeFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help-center" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="hover:text-white">
                  Transaction Services
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-white">
                  Take our feedback survey
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Shopping with us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/payments" className="hover:text-white">
                  Making payments
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-white">
                  Delivery options
                </Link>
              </li>
              <li>
                <Link to="/buyer-protection" className="hover:text-white">
                  Buyer Protection
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Collaborate with us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/partnerships" className="hover:text-white">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="hover:text-white">
                  Affiliate program
                </Link>
              </li>
              <li>
                <Link to="/seller-login" className="hover:text-white">
                  Seller Log In
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay connected</h3>
            <div className="flex space-x-4 mb-4">
              <FaFacebookF className="text-2xl hover:text-white cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-white cursor-pointer" />
              <FaInstagram className="text-2xl hover:text-white cursor-pointer" />
              <FaWhatsapp className="text-2xl hover:text-white cursor-pointer" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Pay with</h3>
            <div className="flex space-x-4">
              <SiVisa className="text-3xl" />
              <SiMastercard className="text-3xl" />
              <SiPaypal className="text-3xl" />
              <SiGooglepay className="text-3xl" />
              <SiApplepay className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0"></div>
            <div className="w-full md:w-1/2"></div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; 2024 xExpress By Beni Visotski-Or Peretz-Elior Stolerman All
            rights reserved.
          </p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="hover:text-white">
              {" "}
              Terms of Use
            </Link>{" "}
            |
            <Link to="/sitemap" className="hover:text-white">
              {" "}
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DarkThemeFooter;
