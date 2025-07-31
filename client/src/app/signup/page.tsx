import "tailwindcss";
import styles from "./signup.module.css";

export default function Signup() {
  const inputStyle = " border";

  return <div className={styles["signup-page"] + " flex items-center justify-center"}>
    <form action="" className="signup-form-container bg-white ">
      <legend>Signup | Create a new account</legend>
      <div className="flex ">
        <span>
          <label htmlFor="first-name">First name</label>
          <br />
          <input type="text" name="firstname" id="first-name" className={inputStyle + " "} />
        </span>
        <span>
          <label htmlFor="last-name">Last name</label>
          <br />
          <input type="text" name="lastname" id="last-name" className={inputStyle + " "} />
        </span>
      </div>
      <label htmlFor="username">New username</label>
      <input type="text" name="username" id="username" className={inputStyle + " "} />
      <br />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" className={inputStyle + " "} />
      <br />
      <label htmlFor="password">Create password</label>
      <input type="password" name="password" id="password" className={inputStyle + " "} />
      {
        // confirm-password field is not sent to the server
        // it is just for client validation
      }
      <label htmlFor="confirm-password">Confirm password</label>
      <input type="password" name="confirm-password" id="confirm-password" className={inputStyle + " "} />
      <button type="submit" className="bg-blue-500 text-white px-[1rem]">Create account</button>
    </form>
  </div>
}
