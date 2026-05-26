import React, { useState } from "react";
import heroImg from "../../assets/aboutUs/heroImage.png";
import earRing from "../../assets/aboutUs/earRing.png";
import { axiosPostService } from "../../services/axios";

const GCrownJewellerySection = () => {

  const [email, setEmail] = useState("");

  const subscribe = async(e) => {
    e.preventDefault();

    try{
      const apiResponse = await axiosPostService("/customer/subscribe&coupon/subscribe", {email});

      if(!apiResponse.ok){
        alert(apiResponse.data.message || "Failed");
        return
      }

      alert(apiResponse.data.message);
      setEmail("")
    }
    catch(err){
      console.log(err.message);
      return
    }
  }

  return (
    <div className="bg-[#fff8e8] font-cormorant selection:bg-[#0F241A] selection:text-[#EFDFB7] overflow-x-hidden">
      
      {/* --- SECTION 1: HERO & BRANDING --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Branded Image Card */}
        <div className="relative group w-full max-w-xl mx-auto lg:mx-0">
          <div className="border-[10px] border-[#0F241A] bg-white shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
            <img
              src={heroImg}
              alt="G-Crown Bracelet"
              className="w-full aspect-square object-cover block"
            />
          </div>
        </div>

        {/* Right: Intro Text & Branded Geometric Element */}
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <p className="text-xl lg:text-2xl text-[#1a1a1a] leading-relaxed max-w-md italic font-medium">
              "Born from Graphura’s passion for design and precision, G-Crown
              Jewellery draws inspiration from royalty and fine craftsmanship to
              create timeless pieces of luxury."
            </p>

            {/* Figma Pixel Perfect: Inner Alignment Ring Logic */}
            <div className="relative w-28 h-32 lg:w-[148px] lg:h-[168px] bg-[#0F241A] ring-2 ring-[#EFDFB7] ring-inset outline outline-2 outline-[#0F241A] flex-shrink-0 shadow-lg" />
          </div>

          {/* Luxury Gradient Banner */}
          <div className="w-full h-24 lg:h-32 bg-gradient-to-r from-[#B1924E] via-[#E9D392] to-[#B1924E] shadow-sm" />
        </div>
      </section>

      {/* --- SECTION 2: HERITAGE ARCH COMPOSITION --- */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Narrative content */}
        <div className="flex flex-col gap-8 text-[#1a1a1a] max-w-xl">
          <div className="space-y-6 text-lg lg:text-[22px] leading-[1.7] font-light">
            <p>
              G-Crown Jewellery by Graphura was born from a passion for design,
              precision, and timeless elegance. Rooted in Graphura’s commitment
              to excellence, G-Crown represents the perfect harmony.
            </p>
            <p>
              Each piece of jewellery is thoughtfully designed and meticulously
              crafted to celebrate life’s most meaningful moments. From refined
              everyday elegance to statement creations.
            </p>
            <p>
              At G-Crown, we believe jewellery is more than an accessory—it is
              an expression of identity, confidence, and legacy. Every detail
              reflects our dedication to quality.
            </p>
            <p className="font-medium">
              Guided by trust, transparency, and innovation, G-Crown Jewellery
              by Graphura continues to craft designs that honor tradition.
            </p>
          </div>
        </div>

        {/* Right: Responsive Double-Arch Framework */}
        <div className="relative flex justify-center lg:justify-end items-center min-h-[500px] lg:min-h-[650px]">
          <div className="relative w-full max-w-[360px] lg:max-w-[480px] aspect-[4/5.5]">
            
            {/* 1. Base Green Arch */}
            <div className="absolute inset-0 bg-[#1C3A2C] rounded-t-full shadow-2xl" />

            {/* 2. Gold Offset Shape (Replaced ml-10 with proportional positioning) */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[90%] bg-[#CBA135] rounded-t-full " />

            {/* 3. Image Arch (Clipped & Bordered) */}
            <div className="absolute bottom-0 ml-10 left-0 w-[86%] h-[87%] bg-gray-100 rounded-t-full overflow-hidden border-[2px] border-[#0F241A] shadow-inner">
              <img
                src={earRing}
                alt="Earring Detail"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER: NEWSLETTER --- */}
      <footer className="mb-10 relative overflow-hidden bg-[linear-gradient(135deg,#08221B,#4F7B62,#08221B)] py-24 px-6 mt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

        <div className="relative mx-auto max-w-5xl text-center space-y-10">
          <div className="space-y-4">
            <span className="block text-sm font-bold uppercase tracking-[0.4em] text-[#EFDFB7]">
              OUR NEWSLETTER
            </span>
            <h2 className="mx-auto max-w-4xl text-[34px] leading-tight md:text-[52px] text-[#EFDFB7] font-light">
              Subscribe To Our Newsletter To Get <br className="hidden md:block" />
              Updates To Our Latest Collection
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-[#EFE3C2] opacity-90">
              Get 20% Off On Your First Order Just By Subscribing To Our Newsletter
            </p>
          </div>

          <form className="mx-auto flex max-w-2xl flex-col sm:flex-row items-stretch gap-10 sm:gap-0  border-white/10 p-1.5   transition-all hover:border-[#EFDFB7]/30">
            <input
              type="email"
              placeholder="Enter Email Address"
              required
              className="w-full bg-white px-8 py-4 text-lg text-[#0F241A] placeholder:text-[#8A8A8A] outline-none font-sans"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#C9A24D] ml-2 border-y-2 border-x-2 border-amber-50 px-12 py-4 text-sm font-bold uppercase tracking-widest text-[#0F241A] transition-all hover:bg-[#D8B45A] hover:shadow-lg active:scale-[0.98]"
              onClick={(e) => {
                subscribe(e)
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default GCrownJewellerySection;