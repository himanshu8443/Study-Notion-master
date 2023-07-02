import loginImg from "../assets/Images/login.webp"
import Template from "../Components/core/Auth/Template"

function Login() {
  return (
    <>
    {/* test login ID */}
    <div className=" justify-center items-center absolute bg-richblack-400 top-32 right-[40%] p-6 -rotate-[20deg] z-0 hidden">
      <div className="flex flex-col gap-2 relative">
        <div className="absolute top-[-30px] right-[-20px] text-5xl text-richblack-900 rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
  <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" stroke-width="2" />
  <circle cx="50" cy="50" r="20" fill="#ffffff" />
</svg>

        </div>
        <p className="text-2xl text-richblack-5">Test Login ID</p>
        <p className="text-xl text-richblack-5">Email: 
          <span className="text-yellow-25">
            student@gmail.com
          </span>
        </p>
        <p className="text-xl text-richblack-5">Password: 
          <span className="text-yellow-25">
            student
          </span>
        </p>
      </div>
    </div>
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
    </>
  )
}

export default Login