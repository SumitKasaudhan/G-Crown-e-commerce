import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this
import model from "../../assets/authPages/comingModel.png";
import logo from "../../assets/authPages/logo.png";

const LAUNCH_DATE = new Date("2025-12-31T00:00:00").getTime();

export default function ComingSoon() {
  const navigate = useNavigate(); // Initialize navigate
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(LAUNCH_DATE - now, 0);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerData = useMemo(() => [
    { label: "Day", value: time.days },
    { label: "Hour", value: time.hours },
    { label: "Minute", value: time.minutes },
    { label: "Second", value: time.seconds },
  ], [time]);

  // Handler for skip button
  const handleSkip = () => {
    navigate("/?welcome=true"); // Pass the flag to Home
  };

  return (
    <main className="flex min-h-screen w-full bg-[#FDF9F0] font-serif overflow-hidden flex-col md:flex-row">
      
      {/* LEFT — VISUAL SECTION (No changes needed here) */}
      <section className="relative w-full md:w-[52%] h-[65vh] md:h-screen overflow-hidden">
        <motion.img
          src={model}
          alt="Luxury Jewelry Background"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-[8%] border border-white/20 pointer-events-none z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute z-20 w-[260px] h-[340px] md:w-[320px] md:h-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#c9a23f] shadow-[0_40px_120px_rgba(0,0,0,0.75)] overflow-hidden"
        >
          <img src={model} alt="Focused Jewelry" className="absolute w-[200%] h-[160%] max-w-none object-cover top-[-35%] left-[-55%]" />
          <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#c9a23f]" />
          <span className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#c9a23f]" />
          <span className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#c9a23f]" />
          <span className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#c9a23f]" />
        </motion.div>
        <div className="absolute bottom-10 left-6 right-6 md:left-20 md:right-20 z-30">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-8 md:px-10 md:py-12 text-center">
            <p className="text-white text-[16px] md:text-[12px] italic leading-relaxed opacity-95">
              Inspired by royalty, perfected through craftsmanship and detail...
            </p>
          </div>
          <div className="mt-6 flex gap-4 max-w-md mx-auto">
            <span className="h-[2px] flex-1 bg-[#c9a23f]" />
            <span className="h-[2px] flex-1 bg-white/30" />
            <span className="h-[2px] flex-1 bg-white/30" />
            <span className="h-[2px] flex-1 bg-white/30" />
          </div>
        </div>
      </section>

      {/* RIGHT — CONTENT SECTION */}
      <section className="relative w-full md:w-[48%] flex flex-col items-center justify-center bg-[#FDF9F0] px-10 md:px-20">
        {/* CHANGED: Link to Button for logic handling */}
        <button 
          onClick={handleSkip}
          className="absolute top-10 right-10 text-[13px] text-[#1c3a2c] underline underline-offset-4 tracking-widest font-medium hover:text-[#c9a23f] transition-colors"
        >
          Skip
        </button>

        <div className="w-full max-w-[400px] flex flex-col items-center md:items-start">
          <div className="mb-8">
            <img src={logo} alt="G-Crown Logo" className="w-16 h-auto brightness-0 opacity-90" />
          </div>
          <p className="tracking-[0.4em] text-[11px] font-bold text-[#1c3a2c] uppercase mb-6">Coming Soon</p>
          <h1 className="text-[2.6rem] md:text-[3.2rem] leading-[1.2] text-[#c9a23f] mb-12 text-center md:text-left font-normal">
            Get notified when <br className="hidden md:block" /> we launch!
          </h1>

          <div className="w-full flex justify-between items-center mb-10 py-6 border-y border-gray-200/60">
            {timerData.map((item, i) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-4xl md:text-5xl font-light text-[#1c3a2c] tabular-nums leading-none">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#1c3a2c] mt-4 font-bold opacity-80">{item.label}</span>
                </div>
                {i !== 3 && <div className="h-10 w-[1px] bg-gray-300/50" />}
              </React.Fragment>
            ))}
          </div>

          <p className="text-[14px] text-[#1c3a2c] mb-6 font-medium opacity-80">Get notified when it goes live</p>
          <form className="flex w-full gap-4 items-stretch" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <input type="email" placeholder="Enter Email Address" className="w-full h-12 px-4 bg-white border border-gray-200 text-[13px] outline-none shadow-sm placeholder:text-gray-400 focus:border-[#c9a23f] transition-colors" />
            </div>
            <button type="submit" className="h-12 px-8 bg-[#c9a23f] text-white text-[13px] font-semibold rounded-[2px] hover:bg-[#b08a2e] transition-all shadow-md active:scale-95">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}