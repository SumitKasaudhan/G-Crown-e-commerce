import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import ProfilePic from "../../../assets/NewArrivalAssets/logos/ProfilePic.jpg";
import { useEffect } from "react";
import { axiosPutService, axiosGetService } from "../../../services/axios";
import toast, { Toaster } from 'react-hot-toast';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImageFile(file);

    // preview
    const previewURL = URL.createObjectURL(file);
    setImage(previewURL);
  };

  // Update logic with 3-second success state
  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("contact", contact);
      formData.append("gender", gender);

      if (selectedImageFile) {
        formData.append("profileImage", selectedImageFile);
      }

      const apiResponse = await axiosPutService(
        "/customer/auth/profile",
        formData,
      );

      if (!apiResponse.ok) {
        setIsUpdating(false);
        alert(apiResponse.data.message || "Update Failed");
        return;
      } else {
        alert(apiResponse.data.message);

        // fake delay optional (for animation)
        setTimeout(() => {
          setIsUpdating(false);
          setShowSuccess(true);

          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        }, 500); // small delay for smoother UI}
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    (async () => {
      let apiResponse = await axiosGetService("/customer/auth/myProfile");

      if (!apiResponse.ok) {
        toast.error("Please login to access your profile", {
          style: {
            border: "1px solid #CBA135",
            padding: "16px",
            color: "#1C3A2C",
            background: "#EFDFB7",
          },
          iconTheme: {
            primary: "#1C3A2C",
            secondary: "#FFFAEE",
          },
        });
        setTimeout(() => navigate("/signin"), 1500);

        // navigate("/signin"); // Redirect to login
        return;
      } else {
        let profileData = apiResponse.data.data;

        setEmail(profileData.email);
        setContact(profileData.contact);
        setFirstName(profileData.firstName);
        setLastName(profileData.lastName);
        setGender(profileData.gender);
        setImage(profileData.profileImage);
      }
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto font-sans relative ">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Back to Home Button - Top Right */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-0 right-0 flex items-center gap-2 text-[#1B3022] hover:underline text-sm transition-all cursor-pointer"
      >
        <span>←</span> Back to Home
      </button>

      {/* Profile Image Section */}
      <div
        className="relative w-28 h-28 mb-4"
        onClick={() => document.getElementById("profileFile").click()}
      >
        <img
          src={image || ProfilePic}
          className="rounded-full w-full h-full object-cover border-2 border-white shadow-sm"
          alt="Profile"
        />

        <input
          id="profileFile"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageSelect}
        />
        {/* Active Status Dot */}
        <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#1B3022] border-4 border-[#F9F4EA] rounded-full"></div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            // defaultValue="Preeti"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            // defaultValue="Sharma"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-sm font-medium text-gray-700">Email*</label>
          <input
            type="email"
            // defaultValue="example@gmail.com"
            value={email || ""}
            readOnly
            className="p-3 border border-gray-200 rounded-sm outline-none bg-white focus:border-[#1B3022] transition-colors shadow-sm w-full"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <input
            type="text"
            // defaultValue="91-9977377430"
            value={contact || ""}
            onChange={(e) => setContact(e.target.value)}
            className="p-3 border border-gray-200 outline-none rounded-sm bg-white focus:border-[#1B3022] transition-colors shadow-sm w-full"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full relative">
          <label className="text-sm font-medium text-gray-700">Gender*</label>
          <select
            className="p-3 border rounded-sm border-gray-200 outline-none bg-white focus:border-[#1B3022] appearance-none cursor-pointer shadow-sm w-full"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute right-5 bottom-2 text-2xl  pointer-events-none text-gray-900">
            ▼
          </div>
        </div>
      </div>

      {/* Action Button with Success/Loading States */}
      <div className="mt-8 flex items-center gap-4 ">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`px-12 py-4 text-sm font-medium tracking-wide transition-all duration-300 rounded-sm ${
            showSuccess
              ? "bg-green-600 text-white"
              : "bg-[#1B3022] text-white hover:bg-[#2a4532]"
          } shadow-lg active:scale-95`}
        >
          {isUpdating
            ? "Updating..."
            : showSuccess
              ? "Changes Updated! ✓"
              : "Update Changes"}
        </button>

        {showSuccess && (
          <span className="text-green-600 text-sm animate-pulse">
            Profile synchronized successfully!
          </span>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
