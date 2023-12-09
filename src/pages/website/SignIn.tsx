import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import logo_google from "@assets/google_logo.svg";
import logo_line from "@assets/line_logo.svg";
import Eye from "@assets/eye_input.svg";
function Signin() {
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4">
        <form
          action=""
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8"
        >
          <div className="w-1/2 flex flex-col items-center space-y-4">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-4xl text-[#424241]">Woundscape</h1>
          </div>
          <div  className="relative w-1/2 p-2.5 border border-[#B4B4B4] border-1 rounded-[50px] outline-none cursor-pointer">
            <img
              className="w-6 absolute left-3 bottom-2"
              src={logo_google}
              alt=""
            />
            <div className="jura text-sm text-center text-[#626060]">
              SIGN IN WITH GOOGLE
            </div>
          </div>
          <div className="relative w-1/2 p-2.5 text-sm text-center border border-[#B4B4B4] border-1 rounded-[50px] outline-none cursor-pointer">
            <img
              className="w-6 absolute left-3 bottom-2"
              src={logo_line}
              alt=""
            />
            <div className="jura text-sm text-center text-[#626060]">
              SIGN IN WITH LINE
            </div>
          </div>

          <div className="w-1/2 flex flex-row justify-center space-x-3">
            <div className="border-b-2 h-3 w-1/3 border-[#B4B4B4]"></div>
            <div className="text-[#B4B4B4] w-64 text-center text-sm">OR SIGN IN WITH EMAIL</div>
            <div className="border-b-2 h-3 w-1/3 border-[#B4B4B4] "></div>
          </div>

          <input
            className="w-1/2 py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
            placeholder="Email"
            type="text"
          />
          <div className="w-1/2 relative ">
            <div className="relative py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] ">
              <img className="w-5 absolute right-3 top-2.5" src={Eye} alt="" />
              <input className="outline-none" placeholder="Password" type="password" />
            </div>
            <div className="mt-2 mb-4">
              <div className="absolute right-3 forgot_pass text-[#626060] cursor-pointer">
                Forgot password
              </div>
            </div>
          </div>

          <div className="w-1/2 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
            <button type="submit" className="text-xl jura font-bold">
              SIGN IN
            </button>
            <img className="w-14" src={arrow_start} alt="" />
          </div>
          <div className="flex space-x-2">
            <a href="#" className="text-[#A7A6A5] cursor-pointer">
              Don’t have an account yet?
            </a>
            <span className="text-[#A3802D] underline cursor-pointer">SIGN UP</span>
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signin;