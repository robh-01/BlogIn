import "tailwindcss";
import styles from "./login.module.css";
import Link from "next/link";

export default function Signup() {
  const inputStyle = " bg-[#ABA6A630] rounded-sm px-[0.5rem] py-[0.3rem] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-[0.1rem]";

  return <div className={styles["login-page"] + " flex items-center justify-center"}>
    <form action="" className="login-form-container bg-white p-[3rem] flex flex-col gap-[1rem] rounded-md shadow-lg">
      <legend className="mb-[0.5rem] font-medium text-2xl">Login into your account</legend>
      <div>
        <label htmlFor="username">Username/Email</label>
        <br />
        <input type="text" name="username" id="username" placeholder="Enter your username or email" className={inputStyle + " "} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" name="password" id="password" placeholder="Enter your password" className={inputStyle + " "} />
      </div>
      <button type="submit" className="mt-[0.5rem] bg-blue-500 text-white py-[0.5rem] rounded-xl hover:bg-blue-800">Login</button>
    <div className="text-center">
      <span className="text-gray-500">Don&apos;t have an account? </span>
      <Link href="/signup" className="text-blue-500 hover:text-blue-800">Create an account</Link>
    </div>
    </form>
  </div>
}
