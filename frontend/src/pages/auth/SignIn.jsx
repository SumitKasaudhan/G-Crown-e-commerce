import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";
import modelImage from "../../assets/authPages/signInModel.png";
import logo from "../../assets/authPages/logo.png";
import { axiosPostService, axiosPutService } from "../../services/axios";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();

  // View State: 'login' | 'forgot' | 'verify'
  const [view, setView] = useState("login");

  // Global Logic States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form Data States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation
  const [otp, setOtp] = useState();
  const [sendOtp, setSendOtp] = useState()

  const handleGoogleLogin = async (cred) => {
    try {
      const token = cred.credential;

      const apiResponse = await axiosPostService("/customer/auth/googleLogin", { token });

      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "SignIn Failed");
      }
      else {
        navigate("/", {
          state: { welcomeMessage: true, userName: apiResponse.data.userName, isReturningUser: true }
        });
      }

    } catch (error) {
      console.error(
        "❌ Google login failed:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const nameFromEmail = email.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      const apiResponse = await axiosPostService("/customer/auth/login", { email, password });

      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "SignIn Failed");
      } else {
        navigate("/", {
          state: { welcomeMessage: true, userName: displayName, isReturningUser: true }
        });
      }
    } catch (error) {
      console.error("Auth failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();

    // Client-side validation for password match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);
    try {

      const apiResponse = await axiosPostService(
        "/customer/auth/forgetPasswordOtp",
        { email }
      )

      if (!apiResponse.ok) {
        setIsLoading(false);
        alert(apiResponse.data.message || "Otp Sending Failed");
        return
      }
      else {
        setIsLoading(false);
        setSendOtp(apiResponse.data.data)
        await new Promise(resolve => setTimeout(resolve, 1500));
        setView("verify");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      if (otp !== sendOtp) {
        alert("Incorrect Otp");
        return
      }
      else {

        const apiResponse = await axiosPutService(
          "/customer/auth/forgetPassword",
          { email, password }
        )

        if (!apiResponse.ok) {
          alert(apiResponse.data.message || "Password Not Update");
          return
        }
        else {
          await new Promise(resolve => setTimeout(resolve, 1500));
          alert("Success! Your password has been updated.");
          setView("login");
          // Reset fields for security
          setPassword("");
          setConfirmPassword("");
          setEmail("");
          setOtp("");
          setSendOtp("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    const apiResponse = await axiosPostService(
      "/customer/auth/forgetPasswordOtp",
      { email }
    )
    if (!apiResponse.ok) {
      alert(apiResponse.data.message || "Otp Sending Failed");
      return
    }
    else {
      setSendOtp(apiResponse.data.data);
    }
  }

  return (
    <section className="flex h-svh w-full overflow-hidden bg-[#FBF6EA] font-serif selection:bg-[#1E3A2F]/20">

      {/* LEFT IMAGE SECTION */}
      <div className="relative hidden w-[45%] lg:block overflow-hidden bg-[#1E3A2F]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={modelImage}
          alt="G-Crown Jewellery Model"
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-9 border border-white/50 pointer-events-none z-10" />
        <div className="absolute inset-x-14 bottom-10 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg border border-white/30 bg-white/10 p-8 backdrop-blur-sm"
          >
            <p className="text-[19px] leading-[1.6] tracking-wide text-white font-light drop-shadow-sm">
              Every jewel at G-Crown is a symbol of elegance, precision, and heritage.
              Crafted by Graphura, our designs are made to be worn like a crown—forever.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="relative flex w-full flex-col overflow-y-auto lg:w-[55%] bg-[#FDF9F0]">

        {view !== "login" && (
          <button
            onClick={() => setView("login")}
            className="absolute left-8 top-10 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#1E3A2F] hover:opacity-60 transition-all"
          >
            <ArrowLeft size={16} /> Back to Sign In
          </button>
        )}

        <div className="m-auto w-full max-w-[500px] px-8 py-12 lg:px-12">

          <header className="mb-10 text-left">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 h-[80px] w-auto">
              <img src={logo} alt="G-Crown" className="h-full object-contain" />
            </motion.div>

            <h1 className="text-[44px] font-normal leading-tight text-[#1E3A2F] tracking-tight transition-all">
              {view === "login" && "Sign In"}
              {view === "forgot" && "New Password"}
              {view === "verify" && "Verification"}
            </h1>
            <p className="mt-2 text-[16px] font-medium text-[#CBA135] tracking-wide uppercase">
              {view === "login" && "Access your account"}
              {view === "forgot" && "Reset your credentials"}
              {view === "verify" && "Check your email for a code"}
            </p>
          </header>

          <AnimatePresence mode="wait">
            {/* --- 1. LOGIN VIEW --- */}
            {view === "login" && (
              <motion.div
                key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label className="block text-[14px] font-bold text-[#1E3A2C]">Email Address*</label>
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-gray-100 px-4 py-3.5 text-[15px] outline-none transition-all focus:border-[#CBA135] focus:ring-1 focus:ring-[#CBA135]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[14px] font-bold text-[#1E3A2C]">Password*</label>
                      <button type="button" onClick={() => setView("forgot")} className="text-[13px] font-bold text-[#1E3A2F] underline underline-offset-4 hover:opacity-70">Forgot Password?</button>
                    </div>
                    <div className="relative">
                      <input
                        required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white border border-gray-100 px-4 py-3.5 pr-12 text-[15px] outline-none focus:border-[#CBA135] focus:ring-1 focus:ring-[#CBA135]/20"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1E3A2F]">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                        className="peer h-5 w-5 appearance-none rounded border border-gray-300 bg-white checked:bg-[#1E3A2F] transition-all"
                      />
                      <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[14px] font-semibold text-[#1E3A2F]">Remember me</span>
                  </div>

                  <SubmitButton isLoading={isLoading} label="Sign In" />
                </form>

                <div className="relative my-10 flex items-center justify-center">
                  <div className="absolute w-full border-t border-gray-200/60"></div>
                  <span className="relative bg-[#FDF9F0] px-4 text-[12px] font-medium text-gray-400">or Sign in with</span>
                </div>

                {/* <motion.button whileTap={{ scale: 0.98 }} type="button" className="flex w-full items-center justify-center gap-4 border border-gray-200 bg-white py-3.5 text-[14px] font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"> */}
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("❌ Google Login Failed")}
                   className="flex w-full items-center justify-center gap-4 border border-gray-200 bg-white py-3.5 text-[14px] font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all" 
                  />
                {/* </motion.button> */}

                <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate("/admin/login")} type="button" className="w-full border border-[#1E3A2F] py-3.5 text-[14px] font-bold text-[#1E3A2F] hover:bg-[#1E3A2F] hover:text-white transition-all mt-2">
                  ADMIN SIGN IN
                </motion.button>

                <footer className="mt-10 text-center text-[15px] text-gray-600">
                  Don't have an account?{" "}
                  <button className="font-bold text-[#1E3A2F] underline underline-offset-8 hover:text-black transition-colors" onClick={() => navigate("/signup")}>Sign Up</button>
                </footer>
              </motion.div>
            )}

            {/* --- 2. FORGOT PASSWORD VIEW (Updated with Confirmation) --- */}
            {view === "forgot" && (
              <motion.div
                key="forgot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <form className="space-y-5" onSubmit={handleForgotPasswordRequest}>
                  <div className="space-y-2">
                    <label className="block text-[14px] font-bold text-[#1E3A2C]">Registered Email*</label>
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white border border-gray-100 px-4 py-3.5 text-[15px] outline-none focus:border-[#CBA135]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[14px] font-bold text-[#1E3A2C]">New Password*</label>
                    <input
                      required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full bg-white border border-gray-100 px-4 py-3.5 text-[15px] outline-none focus:border-[#CBA135]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[14px] font-bold text-[#1E3A2C]">Confirm New Password*</label>
                    <input
                      required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className={`w-full bg-white border px-4 py-3.5 text-[15px] outline-none transition-colors ${confirmPassword && password !== confirmPassword
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-100 focus:border-[#CBA135]'
                        }`}
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-[12px] font-medium">Passwords do not match.</p>
                    )}
                  </div>
                  <div className="pt-2">
                    <SubmitButton isLoading={isLoading} label="Request Reset Code" />
                  </div>
                </form>
              </motion.div>
            )}

            {/* --- 3. OTP VERIFICATION VIEW --- */}
            {view === "verify" && (
              <motion.div
                key="verify" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <form className="space-y-8" onSubmit={handleVerifyAndReset}>
                  <div className="text-center space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-[#CBA135]/10 text-[#CBA135] mb-2">
                      <ShieldCheck size={40} />
                    </div>
                    <p className="text-[15px] text-gray-600 px-4">
                      We have sent a 6-digit verification code to <br /><span className="font-bold text-[#1E3A2F]">{email}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      required type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)}
                      placeholder="0 0 0 0 0 0"
                      className="w-full bg-white border-2 border-dashed border-gray-200 px-4 py-5 text-center text-[28px] font-bold tracking-[0.5em] text-[#1E3A2F] outline-none focus:border-solid focus:border-[#CBA135]"
                    />
                  </div>

                  <SubmitButton isLoading={isLoading} label="Verify & Update Password" />

                  <p className="text-center text-[13px] text-gray-400">
                    Didn't receive the code? <button type="button" className="text-[#1E3A2F] font-bold underline" onClick={resendOtp}>Resend Code</button>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

// Reusable Helper Components
const SubmitButton = ({ isLoading, label }) => (
  <motion.button
    type="submit"
    disabled={isLoading}
    whileTap={{ scale: 0.98 }}
    className="relative h-[60px] w-full bg-[#1C332A] text-[15px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#142620] disabled:opacity-80 flex justify-center items-center shadow-lg shadow-[#1E3A2F]/10 overflow-hidden"
  >
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Loader2 className="animate-spin" size={20} />
        </motion.div>
      ) : (
        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
  </svg>
);

export default SignIn;