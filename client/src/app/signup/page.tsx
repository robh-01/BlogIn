"use client";

import "tailwindcss";
import styles from "./signup.module.css";

import Link from "next/link";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";

import { useActionState, useState, useEffect } from "react";

import { signupAction } from "./actions"

const dancing_script = Dancing_Script({
  weight: "variable",
  subsets: ["latin"]
})

export default function Signup() {
  const [state, formAction, pending] = useActionState(signupAction, null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const inputStyle = " bg-[#ABA6A630] rounded-sm px-[0.5rem] py-[0.3rem] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-[0.1rem]";

  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (!state.success) {
        const newFirstName = state?.formData?.firstname as string ?? "";
        const newLastName = state?.formData?.lastname as string ?? "";
        const newUsername = state?.formData?.username as string ?? "";
        const newEmail = state?.formData?.email as string ?? "";
        setFirstName(prev => (prev !== newFirstName ? newFirstName : prev));
        setLastName(prev => (prev !== newLastName ? newLastName : prev));
        setUsername(prev => (prev !== newUsername ? newUsername : prev));
        setEmail(prev => (prev !== newEmail ? newEmail : prev));
        setPassword(""); // Reset password field on error
        setConfirmationPassword(""); // Reset password field on error
      } else {
        localStorage.setItem("authentication_token", state.authentication_token);
        router.push("/blogs");
      }
    }
  }, [state, router]);

  return <div className={styles["signup-page"] + " flex items-center justify-center"}>
    <form action={formAction} className={styles["signup-form-container"] + " bg-white py-[2rem] px-[3rem] flex flex-col gap-[0.8rem] rounded-md shadow-lg"}>
      <div className="flex items-center justify-center gap-[0.5rem]">
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="" />
        <p className={dancing_script.className + " text-5xl font-black"}>BlogIn</p>
      </div>
      <legend className="mb-[0.1rem] font-medium text-xl self-center">Signup | Create a new account</legend>
      <div className="flex gap-[0.5rem]">
        <span>
          <label htmlFor="first-name">First name</label>
          <br />
          <input type="text" name="firstname" id="first-name" placeholder="First name" className={inputStyle + " "} value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
        </span>
        <span>
          <label htmlFor="last-name">Last name</label>
          <br />
          <input type="text" name="lastname" id="last-name" placeholder="Last name" className={inputStyle + " "} value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
        </span>
      </div>
      <div>
        <label htmlFor="username">New username</label>
        <br />
        <input type="text" name="username" id="username" placeholder="Username" className={inputStyle + " "} value={username} onChange={(e) => { setUsername(e.target.value) }} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" name="email" id="email" placeholder="eg: johndoe@gmail.com" className={inputStyle + " "} value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </div>
      <div>
        <label htmlFor="password">Create password</label>
        <br />
        <input type="password" name="password" id="password" placeholder="Create a new password" className={inputStyle + " "} value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      {
        // confirm-password field is not sent to the server
        // it is just for client validation
      }
      <div>
        <label htmlFor="confirm-password">Confirm password</label>
        <br />
        <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm password" className={inputStyle + " "} value={confirmationPassword} onChange={(e) => { setConfirmationPassword(e.target.value) }} />
      </div>
      {state?.message ? <p className="text-red-500 font-medium">{state.message}</p> : null}
      <button type="submit" className="mt-[0.5rem] bg-blue-500 text-white py-[0.5rem] rounded-xl hover:bg-blue-800">Create account</button>
      <div className="text-center">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/login" className="text-blue-500 hover:text-blue-800">Login</Link>
      </div>
    </form>
  </div>
}
