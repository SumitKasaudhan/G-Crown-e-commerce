import React, { useState, useEffect, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Updated
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; // Added
import "react-toastify/dist/ReactToastify.css"; // Added
// import { allProducts } from "../../assets/MockData";
import ProductCard from "../../components/products/ProductCard";
import { useSearchParams } from "react-router-dom";


import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
// Assets
import gCrown from "../../assets/g-crown Image.jpeg";
import kaashiRings1 from "../../assets/homePage/kaashRings.jpg";
import kaashiRings2 from "../../assets/homePage/kaashiRings2.png";
import Icon1 from "../../assets/homePage/Icon1.png";
import Icon2 from "../../assets/homePage/Icon2.png";
import Icon3 from "../../assets/homePage/Icon3.png";
import Icon4 from "../../assets/homePage/Icon4.png";
import Earing from "../../assets/homePage/earings.png";
import WomenImg from "../../assets/homePage/Women.png";
import MenImg from "../../assets/homePage/Men.png";
import KidImg from "../../assets/homePage/Kids.png";
import Necklace from "../../assets/homePage/necklace.png";
import { ProductContext } from "../../context/ProductContext.jsx"; 

import gridImg from '../../assets/homePage/homeGrid.png'

const slides = [
    {
      id: 1,
      image: "https://i0.wp.com/elegance-suisse.ch/wp-content/uploads/The-Rarest-and-Most-Precious-Luxury-Jewelry-of-All-Time.jpg?resize=1000%2C560&ssl=1",
      title: "The Rarest Collection",
      subtitle: "Timeless Elegance"
    },
    {
      id: 2,
      image: "https://media.istockphoto.com/id/1276740597/photo/indian-traditional-gold-necklace.jpg?s=612x612&w=0&k=20&c=OYp1k0OVJObYq9hqVK_r6NwYa_W54km4nya1R-ovIUY=", 
      title: "Exquisite Rings",
      subtitle: "Crafted for Perfection"
    }
  ];

// --- Configuration Data ---
const COLLECTIONS = [
  {
    title: "Engagement Rings",
    subtitle: "From engagement to eternity",
    image: kaashiRings1,
    isNew: true,
    path: "/collections/engagement-rings",
  },
  {
    title: "Wedding Bands",
    subtitle: "Handcrafted for your big day",
    image: kaashiRings2,
    isNew: true,
    path: "/collections/wedding-bands",
  },
  {
    title: "Classic Solitaire",
    subtitle: "Timeless brilliance",
    image: kaashiRings1,
    isNew: true,
    path: "/collections/classic-solitaire",
  },
  {
    title: "Vintage Bands",
    subtitle: "Refined heritage pieces",
    image: kaashiRings1,
    isNew: true,
    path: "/collections/vintage-bands",
  },
];

const FEATURES = [
  {
    icon: Icon1,
    title: "Lifetime Service",
    desc: "Complimentary cleaning, polishing, and maintenance for life.",
  },
  {
    icon: Icon2,
    title: "Easy Exchange",
    desc: "30-day exchange policy and buyback options for satisfaction.",
  },
  {
    icon: Icon3,
    title: "Certified Authentic",
    desc: "Every piece comes with BIS hallmark and authenticity guarantee.",
  },
  {
    icon: Icon4,
    title: "Secure Delivery",
    desc: "Fully insured shipping with real-time tracking to your door.",
  },
];

const CURATED = [
  { title: "WOMEN", image: WomenImg, path: "/collections" },
  { title: "MEN", image: MenImg, path: "/collections" },
  { title: "KIDS", image: KidImg, path: "/collections" },
];

const TESTIMONIALS = [
  {
    quote:
      "The craftsmanship is unlike anything I've ever seen. My engagement ring from G-Crown is a daily reminder of elegance.",
    author: "Sarah J.",
    link: "/collections/engagement-rings",
    buttonText: "Shop Engagement Rings",
  },
  {
    quote:
      "Our wedding bands were delivered exactly on time with perfect sizing. The craftsmanship feels premium and comfortable for daily wear.",
    author: "Arjun & Meera",
    link: "/collections/wedding-bands",
    buttonText: "Shop Wedding Bands",
  },
  {
    quote:
      "I love how the classic solitaire I bought transitions from office wear to evening events. It's minimal, elegant, and very 'me'.",
    author: "Kavya Desai",
    link: "/collections/classic-solitaire",
    buttonText: "Shop Classic Solitaire",
  },
  {
    quote:
      "The vintage band collection caught my eye immediately. Each piece tells a story, and the quality is exceptional. Highly recommended!",
    author: "Rohan Kapoor",
    link: "/collections/vintage-bands",
    buttonText: "Shop Vintage Bands",
  },
];

// --- Shared Components ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-5xl font-cormorant font-bold text-[#08221B]">
      {title}
    </h2>
    <div className="mx-auto mt-4 mb-6 w-24 h-1 bg-[#CBA135]" />
    {subtitle && (
      <p className="text-[#08221B] text-xl md:text-2xl font-light max-w-2xl mx-auto italic">
        {subtitle}
      </p>
    )}
  </div>
);

// Featured products - bestsellers


export default function HomeMain() {

   const { products } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // const featuredProducts = products
  //   .filter(p => p.bestseller)
  //   .slice(0, 6);

  const featuredProducts = products ? products.slice(0, 6) : [];



  useEffect(() => {
    // Check if the URL has ?welcome=true
    if (searchParams.get("welcome") === "true") {

      // Trigger the welcome notification
      toast("Welcome to G-Crown websit", {
        duration: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

        style: {
          backgroundColor: '#08221B', // Your Brand Green
          color: '#CBA135', // Your Brand Gold
          fontFamily: 'Cormorant Garamond, serif'
        },
      });

    }
  }, [searchParams, setSearchParams]);

  const navigate = useNavigate();
  const location = useLocation(); // Added location hook
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- WELCOME TOAST LOGIC ---
  useEffect(() => {
    if (location.state?.welcomeMessage) {
      toast.success(`Welcome to G-Crown, ${location.state.userName || 'User'}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: '#08221B', // Your Brand Green
          color: '#CBA135', // Your Brand Gold
          fontFamily: 'Cormorant Garamond, serif'
        },
      });

      // Clear the state so the toast doesn't reappear on manual refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  };

  const currentTestimonialData = TESTIMONIALS[currentTestimonial];

  return (
    <main className="bg-[#FFF8E8] overflow-x-hidden">



      {/* ToastContainer to render notifications */}
      <ToastContainer />

      {/* 1. HERO SECTION */}
      <section
        className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${gCrown})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 backdrop-blur-[7.5px]" />
        <div className="noise-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-cormorant text-4xl md:text-7xl font-bold text-[#CBA135] leading-tight mb-6">
            Luxury Designed to <br className="hidden md:block" /> Celebrate Your
            Glow
          </h1>

          <p className="text-gray-200 text-lg md:text-xl font-light mb-10 tracking-wide italic">
            “Step into a world of refined detail and handcrafted brilliance”
          </p>

          <a href="/collections" >
            <button className="px-16 py-4 bg-gradient-to-r from-[#B49148] via-[#F8E48F] to-[#BB9344] text-[#08221B] font-bold text-lg rounded-sm hover:scale-105 transition-transform shadow-2xl">
              SHOP NOW
            </button>
          </a>
        </div>
      </section>

      {/* 2. EXPLORE COLLECTIONS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <SectionHeader title="Explore Our Collections" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {COLLECTIONS.map((item, i) => (
            <div
              key={i}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => {
                item.path && navigate(item.path);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08221B]/90 via-[#08221B]/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-cormorant font-bold mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">{item.subtitle}</p>
                <button
                  type="button"
                  className="flex items-center gap-2 text-[#CBA135] text-sm font-bold tracking-tighter group-hover:gap-4 transition-all uppercase"
                >
                  Shop Now <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Image Section */}
<section className="w-full bg-[#FFF7E8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="mySwiper rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden h-[300px] sm:h-[450px] lg:h-[560px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Luxury Overlay */}
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 sm:p-16">
                <h2 className="text-white font-serif text-2xl sm:text-4xl lg:text-5xl mb-2 tracking-widest uppercase">
                  {slide.title}
                </h2>
                <div className="h-[2px] w-24 bg-[#CBA135] mb-4"></div>
                <p className="text-[#EFDFB7] font-sans text-sm sm:text-lg tracking-wide italic">
                  {slide.subtitle}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

      {/* 3. TRUST & FEATURES BAR */}
      <section className="bg-[#0F2D2A] py-20 border-y-8 border-[#CBA135]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#183B32] p-10 rounded-xl text-center flex flex-col items-center border border-white/5 hover:bg-[#1d463c] transition-colors"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#CBA135] flex items-center justify-center shadow-lg">
                  <img
                    src={f.icon}
                    alt={f.title}
                    className="w-12 h-12 object-bottom-right"
                  />
                </div>
                <h3 className="text-white font-cormorant text-xl mb-3 font-semibold">
                  {f.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center pt-10 border-t border-white/10">
            {[
              ["25+", "Years in Business"],
              ["10K+", "Happy Customers"],
              ["50+", "Master Artisans"],
              ["100%", "Satisfaction"],
            ].map(([val, lab], i) => (
              <div key={i}>
                <p className="text-[#CBA135] text-3xl font-bold mb-1">{val}</p>
                <p className="text-gray-400 text-xs tracking-widest uppercase font-medium">
                  {lab}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURATED FOR YOU */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Curated For You" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURATED.map((cat, i) => (
            <div
              key={i}
              className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
              onClick={() => {
                cat.path && navigate(cat.path)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object- transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cormorant text-3xl font-bold tracking-[0.2em] text-[#F4C430] drop-shadow-lg">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. USER STORIES */}
      <section className="py-24 bg-[#F9F6EE]">
        <SectionHeader
          title="User Stories"
          subtitle="“Stories of elegance, confidence, and the shine Graphura brings to every occasion.”"
        />
        <div
          className="relative mx-auto max-w-6xl h-[600px] flex items-center justify-center overflow-hidden md:overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-[#CBA135] hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#08221B] group-hover:text-white transition-colors" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 md:right-8 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-[#CBA135] hover:text-white transition-all group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#08221B] group-hover:text-white transition-colors" />
          </button>

          <div className="hidden lg:block absolute left-0 w-64 h-[400px] bg-[#F4F0E6] rounded-xl border border-gray-200 opacity-40 -rotate-6 z-0" />
          <div className="hidden md:block absolute left-10 md:left-24 w-80 h-[500px] bg-[#F4F0E6] rounded-xl border border-gray-200 shadow-xl -rotate-3 z-10" />

          <div
            key={currentTestimonial}
            className="relative w-[350px] md:w-[450px] h-[600px] bg-white rounded-2xl shadow-2xl z-20 border border-[#CBA135]/20 p-8 flex flex-col justify-center text-center transition-all duration-500 animate-fadeIn"
          >
            <div className="text-[#CBA135] text-4xl mb-4 font-serif">"</div>
            <p className="text-[#08221B] text-lg italic mb-6">
              "{currentTestimonialData.quote}"
            </p>
            <h4 className="font-bold text-[#08221B] font-cormorant text-2xl">
              — {currentTestimonialData.author}
            </h4>
            <button
              type="button"
              onClick={() => {
                navigate(currentTestimonialData.link)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#08221B] text-white text-xs uppercase tracking-[0.25em] hover:bg-black transition-colors"
            >
              {currentTestimonialData.buttonText}
            </button>
          </div>

          <div className="hidden md:block absolute right-10 md:right-24 w-80 h-[500px] bg-[#F4F0E6] rounded-xl border border-gray-200 shadow-xl rotate-3 z-10" />
          <div className="hidden lg:block absolute right-0 w-64 h-[400px] bg-[#F4F0E6] rounded-xl border border-gray-200 opacity-40 rotate-6 z-0" />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial
                  ? "bg-[#CBA135] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-24 px-4 flex justify-center">
        <div
          className="relative max-w-7xl w-full h-[350px] rounded-2xl overflow-hidden flex items-center px-10 md:px-20"
          style={{
            background:
              "radial-gradient(146% 146% at 146% -25%, #4A9874 0%, #1C3A2C 100%)",
          }}
        >
          <div className="max-w-xl z-10">
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#E6C36A] leading-tight mb-8">
              Elevate Your Elegance <br /> with G-Crown Jewellers
            </h2>
            <button className="px-10 py-4 bg-gradient-to-r from-[#C9A14A] via-[#E6C36A] to-[#B8903D] text-[#08221B] font-bold text-xl rounded-lg hover:scale-105 transition-transform shadow-xl" onClick={() => {
              navigate("/target");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              Contact Us
            </button>
          </div>
          <img
            src={Necklace}
            alt="Luxury"
            className="absolute right-0 top-0 h-[110%] w-auto object-contain hidden lg:block opacity-90 translate-y-[-5%]"
          />
        </div>
      </section>
    </main>
  );
}