"use client";

import "tailwindcss";
import styles from "./login.module.css";

import Link from "next/link";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";

import { useActionState, useState, useEffect } from "react";

import { loginAction } from "./actions";


const dancing_script = Dancing_Script({
  weight: "variable",
  subsets: ["latin"]
})

export default function Signup() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [identifier, setIdentifier] = useState<string>("");

  const inputStyle = " bg-[#ABA6A630] rounded-sm px-[0.5rem] py-[0.3rem] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-[0.1rem]";

  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (!state.success) {
        const newIdentifier = state?.formData?.identifier as string ?? "";
        setIdentifier(prev => (prev !== newIdentifier ? newIdentifier : prev));
      } else {
        localStorage.setItem("authentication_token", state.authentication_token);
        router.push("/blogs");
      }
    }
  }, [state, router]);

  return <div className={styles["login-page"] + " flex items-center justify-center"}>
    <form action={formAction} className={styles["login-form-container"] + " bg-white p-[3rem] flex flex-col gap-[1rem] rounded-md shadow-lg"}>
      <div className="flex items-center justify-center gap-[0.5rem]">
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="" />
        <p className={dancing_script.className + " text-5xl font-black"}>BlogIn</p>
      </div>
      <legend className="mb-[0.5rem] font-medium text-2xl self-center">Login into your account</legend>
      <div>
        <label htmlFor="identifier">Username/Email</label>
        <br />
        <input
          type="text" name="identifier" id="identifier" placeholder="Enter your username or email" className={inputStyle + " "} value={identifier} onChange={(e) => { setIdentifier(e.target.value) }} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" name="password" id="password" placeholder="Enter your password" className={inputStyle + " "} />
      </div>
      {state?.message ? <p className="text-red-500 font-medium">{state.message}</p> : null}
      <button type="submit" className="mt-[0.5rem] bg-blue-500 text-white py-[0.5rem] rounded-xl hover:bg-blue-800" disabled={pending}>Login</button>
      <div className="text-center">
        <span className="text-gray-500">Don&apos;t have an account? </span>
        <Link href="/signup" className="text-blue-500 hover:text-blue-800">Create an account</Link>
      </div>
    </form>
  </div>
}
