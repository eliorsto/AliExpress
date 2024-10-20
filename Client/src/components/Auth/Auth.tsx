import { Input } from "@nextui-org/react";
import {
  CircleAlert,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Undo2,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { setFullName, setShowAuth, setToken } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import starImage from "../../assets/star.webp";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [handleAuth, setHandleAuth] = useState<boolean | undefined>(undefined);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { showAuth } = useSelector((state: any) => state.user);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!showAuth || !formData.email) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/auth/${
          !checkEmail ? "valid-email" : handleAuth ? "register" : "login"
        }`,
        { ...formData }
      );
      console.log(res);

      if (!checkEmail) {
        setHandleAuth(!res.data.exist);
        setCheckEmail(true);
      } else {
        localStorage.setItem("clone_token", res.data.refreshToken);
        dispatch(setToken(res.data.token));
        dispatch(
          setFullName(formData.fullName ? formData.fullName : res.data.fullName)
        );
        dispatch(setShowAuth(false));
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="absolute h-screen w-full flex justify-center items-center flex-col overflow-hidden bg-black/30 z-50">
        <div className="border w-[40%] h-[90%] flex justify-between rounded-3xl dark:bg-gray-600 bg-white items-center flex-col shadow-2xl">
          <div className="w-full">
            <div className="text-3xl font-bold mb-3 w-[95%] flex justify-end pt-3">
              <h1
                className={`${checkEmail ? "w-[54%]" : "w-[66%]"} text-start`}
              >
                {!checkEmail
                  ? "Register/Sign In"
                  : handleAuth
                  ? "Register"
                  : "Sign In"}
              </h1>
              <X
                className="hover:cursor-pointer"
                onClick={() => dispatch(setShowAuth(false))}
              />
            </div>
            <div className="bg-green-200 w-[100%] flex justify-center dark:text-black items-center">
              <ShieldCheck
                width="20px"
                height="20px"
                color="#16a34a"
                fill="white"
              />
              &nbsp;
              <p>Your information is protected</p>
            </div>
          </div>
          {!checkEmail && (
            <div className="bg-red-600 w-[80%] h-[20%] mt-2 mb-2 rounded-lg">
              <div className="h-[70%] p-2 flex justify-around">
                <div>
                  <h2 className="text-white text-2xl">Welcome Deal</h2>
                  <h3 className="text-white text-xs">
                    Up to 99% off on your orders
                  </h3>
                </div>
                <img
                  src={starImage}
                  alt="star sale"
                  width="100px"
                  height="100px"
                />
              </div>
              <div className="flex justify-center h-[30%] dark:text-black bg-red-200">
                <div className="text-center w-[50%] items-center flex justify-center">
                  <p className="border-l border-r-black w-full flex justify-center items-center">
                    <Truck color="#111827" width="20px" height="20px" />
                    &nbsp;
                    <span>Free shipping</span>
                  </p>
                </div>
                <div className="text-center w-[50%] items-center flex justify-center">
                  <p className="border-l border-l-black w-full flex justify-center items-center">
                    <Undo2 color="#111827" width="20px" height="20px" />
                    &nbsp;
                    <span>Free returns</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-between w-[60%]"
          >
            <Input
              type="email"
              label="Email"
              variant="bordered"
              size="sm"
              value={formData.email}
              name="email"
              className="mb-2"
              onChange={handleChange}
              required
              isClearable
              onClear={() => {
                setFormData({ ...formData, email: "" });
                setCheckEmail(false);
              }}
            />
            {checkEmail && (
              <>
                {handleAuth && (
                  <Input
                    type="text"
                    className="mb-2"
                    label="Full Name"
                    variant="bordered"
                    size="sm"
                    value={formData.fullName}
                    name="fullName"
                    onChange={handleChange}
                    required
                  />
                )}
                <Input
                  label="Password"
                  size="sm"
                  value={formData.password}
                  name="password"
                  className="mb-2"
                  onChange={handleChange}
                  required
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </>
            )}
            {checkEmail && handleAuth && (
              <>
                <Input
                  label="Password"
                  size="sm"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  variant="bordered"
                  placeholder="Confirm Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                {formData.confirmPassword !== formData.password && (
                  <div className="text-red-800 flex text-start w-full text-sm mt-2">
                    <CircleAlert width="15px" height="15xp" />
                    &nbsp; Password does'nt match!
                  </div>
                )}
              </>
            )}
            <button
              className={`border border-red-600 p-2 w-[100%] mt-5  rounded-3xl text-white transition-all ${
                formData.email
                  ? "cursor-pointer bg-red-600 hover:-translate-y-[2px] hover:bg-red-500"
                  : "cursor-not-allowed bg-red-300"
              }`}
              disabled={!formData.email}
            >
              {!checkEmail ? "Continue" : handleAuth ? "Register" : "Sign In"}
            </button>
          </form>
          <div className="flex flex-col justify-center items-center pb-2">
            <div className="underline cursor-pointer text-medium text-gray-600">
              Trouble signing in?
            </div>

            <p className=" rounded-md text-sm dark:text-gray-200 text-gray-600 w-[85%]">
              By continuing, you confirm that you‘re an adult and you’ve read
              and accepted our{" "}
              <span className="underline cursor-pointer">
                xExpress Free Membership Agreement
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
              <span className="underline cursor-pointer">
                <br /> Why choose a location?
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
