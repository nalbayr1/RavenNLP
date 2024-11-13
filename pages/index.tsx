import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Login.module.css"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard"); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.formSection}>
        <div className={styles.logo}>
          <Image
            src="/photos/jhu-johns-hopkins-university-logo-0AD931982D-seeklogo.com.png"
            width={250}
            height={100}
            alt="JHU Logo"
          />
        </div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please enter your details to see scouting reports</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
          <div className={styles.options}>
            <label>
              <input type="checkbox" />
              Remember me for 30 days
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
        <div className={styles.signUp}>
          Don’t have an account? <a href="#">Sign up</a>
        </div>
      </div>

      
      <div className={styles.backgroundSection}>
        <Image
          src="/photos/ravensLogo.png"
          layout="fill"
          objectFit="cover"
          alt="Ravens Logo Background"
          className={styles.backgroundImage}
        />
      </div>
    </div>
  );
}
