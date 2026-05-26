import React from "react";

import gCrown from "../../assets/g-crown Image.jpeg";
import kaashiRings1 from "../../assets/homePage/kaashRings.jpg";
import kaashiRings2 from "../../assets/homePage/kaashiRings2.png";
import Icon1 from "../../assets/homePage/icons/Icon1.png";
import Icon2 from "../../assets/homePage/icons/Icon2.png";
import Icon3 from "../../assets/homePage/icons/Icon3.png";
import Icon4 from "../../assets/homePage/icons/Icon4.png";
import Earing from "../../assets/homePage/earings.png";
import WomenImg from "../../assets/homePage/Women.png";
import MenImg from "../../assets/homePage/Men.png";
import KidImg from "../../assets/homePage/Kids.png";
import Necklace from "../../assets/homePage/necklace.png"
import gridImg from '../../assets/homePage/homeGrid.png'

const collections = [
  {
    title: "Rings",
    subtitle: "From engagement to eternity",
    image: kaashiRings1,
    isNew: true,
  },
  {
    title: "Rings",
    subtitle: "From engagement to eternity",
    image: kaashiRings2,
    isNew: true,
  },
  {
    title: "Rings",
    subtitle: "From engagement to eternity",
    image: kaashiRings1,
    isNew: true,
  },
  {
    title: "Rings",
    subtitle: "From engagement to eternity",
    image: kaashiRings1,
    isNew: true,
  },
];

export default function HomeMain() {
  return (
    <main className="bg-[#0f2d2a]">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${gCrown})` }}
      >
        {/* Dark + blur overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Edge masking vignette (IMPORTANT) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60" />

        {/* Glass content box */}
        <div className="relative z-10 text-center max-w-2xl px-4 sm:px-6 md:px-8">
          <h1
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 sm:mb-5 font-bold"
            style={{ color: "#CBA135" }}
          >
            Luxury Designed to <br className="hidden sm:block" /> Celebrate Your
            Glow
          </h1>
          <p className="text-gray-200 mb-4 sm:mb-6 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg px-2">
            "Step into a world of refined detail and handcrafted brilliance{" "}
            <br className="hidden sm:block" />
            from G-Crown Jewellers"
          </p>
          <button
            className="
            w-full sm:w-auto
            min-w-50 sm:min-w-70
            h-12 sm:h-14 md:h-16
            rounded-sm
            px-6 sm:px-7 py-2.5 font-bold text-sm sm:text-base text-[#08221B]
            bg-linear-to-r
            from-[#B49148]
            via-[#F8E48F]
            to-[#BB9344]
            hover:scale-[1.03]
            transition-all duration-300
            mt-3
          "
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Explore Collections */}
      {/* Explore Our Collections */}
      <section className="py-14 bg-[#FFF7E8]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-center text-[#08221B]">
            Explore Our Collections
          </h2>

          {/* Underline */}
          <div className="mx-auto mt-4 mb-10 w-68.5 h-1 bg-[#CBA135]" />

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-6 ">
            {collections.map((item, index) => (
              <div
                key={index}
                className="relative w-71.25 h-85 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03]
            transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div
                  className="absolute inset-0 bg-linear-to-t
                  from-[rgba(28,58,44,0.9)]
                  via-[rgba(28,58,44,0.4)]
                  to-[rgba(28,58,44,0)]"
                />

                {/* NEW badge */}
                {item.isNew && (
                  <span className="absolute top-4 right-4 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                    NEW
                  </span>
                )}

                {/* Content */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-xl font-cormorant font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3">{item.subtitle}</p>
                  <button className="text-[#CBA135] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    SHOP NOW <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FFF7E8] py-94">
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid image section – to be added later */}
          <img src={gridImg} alt="" />
        </div>
      </section>

      <section className="w-full bg-[#0F2D2A] border-y-6 border-[#CBA135] py-14">
        <div className="max-w-7xl mx-auto px-6">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-[#183B32] w-[304px] h-[304px] rounded-[8px] p-6 text-center flex flex-col justify-center">
              <div className="w-[64px] h-[64px] mx-auto mb-4 rounded-full bg-[#CBA135] flex items-center justify-center">
                {/* Icon */}
                <img
                  src={Icon1}
                  alt="Lifetime Service"
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
              <h3 className="text-white font-cormorant text-lg mb-2">
                Lifetime Service
              </h3>
              <p className="text-md text-[#E6E6E6]/80 leading-relaxed">
                Complimentary cleaning, <br /> polishing, and maintenance <br />{" "}
                services for life on all our jewelry <br /> pieces.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#183B32] w-[304px] h-[304px] rounded-[8px] p-6 text-center flex flex-col justify-center">
              <div className="w-[64px] h-[64px] mx-auto mb-4 rounded-full bg-[#CBA135] flex items-center justify-center">
                <img
                  src={Icon2}
                  alt="Lifetime Service"
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
              <h3 className="text-white font-cormorant text-lg mb-2">
                Easy Exchange
              </h3>
              <p className="text-md text-[#E6E6E6]/80 leading-relaxed">
                30-day exchange policy and <br /> buyback options ensure <br />{" "}
                complete satisfaction with your <br /> purchase.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#183B32] w-[304px] h-[304px] rounded-[8px] p-6 text-center flex flex-col justify-center">
              <div className="w-[64px] h-[64px] mx-auto mb-4 rounded-full bg-[#CBA135] flex items-center justify-center">
                <img
                  src={Icon3}
                  alt="Lifetime Service"
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
              <h3 className="text-white font-cormorant text-lg mb-2">
                Certified Authentic
              </h3>
              <p className="text-md text-[#E6E6E6]/80 leading-relaxed">
                Every piece comes with BIS <br /> hallmark certification and{" "}
                <br /> authenticity guarantee, ensuring <br /> you receive
                genuine quality.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#183B32] w-[304px] h-[304px] rounded-[8px] p-6 text-center flex flex-col justify-center">
              <div className="w-[64px] h-[64px] mx-auto mb-4 rounded-full bg-[#CBA135] flex items-center justify-center">
                <img
                  src={Icon4}
                  alt="Lifetime Service"
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
              <h3 className="text-white font-cormorant text-lg mb-2">
                Secure Delivery
              </h3>
              <p className="text-md text-[#E6E6E6]/80 leading-relaxed">
                Fully insured shipping with real- <br /> time tracking to ensure
                safe <br /> delivery to your <br /> doorstep.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-[#CBA135] text-2xl font-semibold">25+</p>
              <p className="text-sm text-[#E6E6E6]/80">Years in Business</p>
            </div>

            <div>
              <p className="text-[#CBA135] text-2xl font-semibold">10K+</p>
              <p className="text-sm text-[#E6E6E6]/80">Happy Customers</p>
            </div>

            <div>
              <p className="text-[#CBA135] text-2xl font-semibold">50+</p>
              <p className="text-sm text-[#E6E6E6]/80">Master Artisans</p>
            </div>

            <div>
              <p className="text-[#CBA135] text-2xl font-semibold">100%</p>
              <p className="text-sm text-[#E6E6E6]/80">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="w-full bg-[#FFF8E8] py-14">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-center text-[#08221B]">
              Featured Masterpieces
            </h2>
            <div className="mx-auto mt-4 mb-10 w-68.5 h-1 bg-[#CBA135]" />
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* CARD 6 */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={Earing}
                  alt="Eternal Sparkle Diamond Ring"
                  className="w-full h-[260px] object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#CBA135] text-white text-xs px-3 py-1 rounded">
                  BESTSELLER
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                  ♡
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-[#CBA135] mr-2">★★★★★</span>
                  <span className="text-[#666] w-[100px] h-[20px] pl-[8px] flex items-center gap-1">
                    (248 reviews)
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[24px] leading-[32px] tracking-normal text-[#08221B] mb-1">
                  Eternal Sparkle Diamond Ring
                </h3>

                <p className="text-sm text-[#666] mb-3">
                  18K White Gold | 2.5ct Diamond
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold text-[#08221B]">
                    ₹2,45,000
                  </span>
                  <span className="text-sm line-through text-[#999]">
                    ₹2,75,000
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    SAVE 11%
                  </span>
                </div>

                <button className="w-full bg-[#08221B] text-white py-2 rounded hover:bg-[#0F3A30] transition">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-[#0F3A30] text-white rounded hover:bg-[#08221B] transition">
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>

      {/* Curated For You Section */}
      <section className="bg-[#FFF8E8] py-14">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-[36px] font-bold text-[#08221B]">
            Curated For You
          </h2>
          <div className="mx-auto mt-4 mb-10 w-68.5 h-1 bg-[#CBA135]" />
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {/* WOMEN */}
          <div className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer">
            <img
              src={WomenImg}
              alt="Women Collection"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-[28px] font-bold tracking-widest text-[#F4C430]">
              WOMEN
            </span>
          </div>

          {/* MEN */}
          <div className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer">
            <img
              src={MenImg}
              alt="Men Collection"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-[28px] font-bold tracking-widest text-[#F4C430]">
              MEN
            </span>
          </div>

          {/* KIDS */}
          <div className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer">
            <img
              src={KidImg}
              alt="Kids Collection"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-[28px] font-bold tracking-widest text-[#F4C430]">
              KIDS
            </span>
          </div>
        </div>
      </section>

      {/* User Stories Section */}
      <section className="bg-[#FFF8E8] py-14">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-cormorant text-[48px] font-bold text-[#08221B]">
            User Stories
          </h2>
          <div className="mx-auto mt-4 mb-10 w-68.5 h-1 bg-[#CBA135]" />
          <p className="mt-6 max-w-xl mx-auto text-[#08221B] text-[26px] leading-relaxed">
            “Stories of elegance, confidence, and the shine Graphura brings to
            every occasion.”
          </p>
        </div>

        {/* Cards Wrapper */}
        <div className="relative mx-auto max-w-[1200px] h-[720px]">
          {/* FAR LEFT CARD */}
          <div
            className="absolute top-1/2
  left-[calc(50%-420px)]
  -translate-x-full
  -translate-y-1/2
  w-[336px] h-[493px]
  bg-[#F4F0E6]
  rounded-[10px]
  border border-[#D8D2C4]
  opacity-70
  z-[1]"
          />

          {/* NEAR LEFT CARD */}
          <div
            className="absolute top-1/2
  left-[calc(50%-220px)]
  -translate-x-full
  -translate-y-1/2
  w-[402px] h-[591px]
  bg-[#F4F0E6]
  rounded-[10px]
  border border-[#D8D2C4]
  shadow-[0_16px_32px_rgba(0,0,0,0.06)]
  z-[5]"
          />

          {/* CENTER CARD */}
          <div
            className="absolute left-1/2 top-1/2 
  -translate-x-1/2 -translate-y-1/2
  w-[466px] h-[685px]
  bg-[#F4F0E6]
  rounded-[10px]
  border border-[#D8D2C4]
  shadow-[0_20px_40px_rgba(0,0,0,0.08)]
  z-[10]"
          />

          {/* NEAR RIGHT CARD */}
          <div
            className="absolute top-1/2
  left-[calc(50%+220px)]
  -translate-y-1/2
  w-[402px] h-[591px]
  bg-[#F4F0E6]
  rounded-[10px]
  border border-[#D8D2C4]
  shadow-[0_16px_32px_rgba(0,0,0,0.06)]
  z-[5]"
          />

          {/* FAR RIGHT CARD */}
          <div
            className="absolute top-1/2
  left-[calc(50%+420px)]
  -translate-y-1/2
  w-[336px] h-[493px]
  bg-[#F4F0E6]
  rounded-[10px]
  border border-[#D8D2C4]
  opacity-70
  z-[1]"
          />
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      {/* CTA BANNER */}
<section className="flex justify-center bg-[#FFF8E8] py-24">
  <div
    className="
      relative
      w-[1339px]
      h-[298px]
      rounded-[3px]
      overflow-hidden
      flex items-center
      px-16
    "
    style={{
      background:
        "radial-gradient(146.32% 146.32% at 146.32% -25.33%, #4A9874 0%, #1C3A2C 100%)",
    }}
  >
    {/* LEFT CONTENT */}
    <div className="max-w-[420px]">
      <h2
        className="
          font-['Cormorant_Garamond']
          text-[40px]
          leading-[42px]
          font-semibold
          text-[#E6C36A]
        "
      >
        Elevate Your Elegance <br />
        with G-Crown Jewellers
      </h2>

      <button
        className="
          mt-6
          w-[180px]
          h-[52px]
          rounded-[4px]
          bg-gradient-to-r
          from-[#C9A14A]
          via-[#E6C36A]
          to-[#B8903D]
          text-[#08221B]
          font-medium
          text-[20px]
          transition-all
          duration-300
          hover:scale-[1.04]
          hover:shadow-lg
        "
      >
        Contact Us
      </button>
    </div>

    {/* NECKLACE IMAGE */}
    <img
      src={Necklace}
      alt="Luxury Necklace"
      className="
        absolute
        left-[727px]
        top-[-100px]
        -translate-y-1/60
        h-[356.24px]
        w-[559.39px]
        object-contain
        hidden md:block
      "
    />
  </div>
</section>
    </main>
  );
}
