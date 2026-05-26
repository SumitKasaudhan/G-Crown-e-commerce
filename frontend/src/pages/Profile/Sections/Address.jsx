
import axios from "axios";
import { useEffect, useState } from "react";
import { Plus,Loader2,X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Address = () => {
  // --- States ---


  // Modal & Loading States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [addresses, setAddresses] = useState([]);
const [formData, setFormData] = useState({
  firstName: "", lastName: "", country: "", address: "",
  city: "", state: "", zip: "", phone: "", email: ""
});
useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/addresses", {withCredentials: true});
      setAddresses(res.data);
    } catch (err) {
      console.log("Error fetching addresses", err);
    }
  };

  fetchAddresses();
}, []);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [country, setCountry] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [zip, setZip] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [editingId, setEditingId] = useState(null);

const handleAddAddress = async () => {
  try {
    setIsUpdating(true);

    const payload = {
      firstName,
      lastName,
      country,
      address,
      city,
      state,
      zip,
      phone,
      email
      
    };

    if (editingId) {
      // UPDATE
      await axios.put(`http://localhost:3000/api/addresses/${editingId}`, payload, {withCredentials: true});
    } else {
      // ADD
      await axios.post("http://localhost:3000/api/addresses", payload, {withCredentials: true});
    }

    const res = await axios.get("http://localhost:3000/api/addresses", {withCredentials: true});
    setAddresses(res.data);

    setEditingId(null);
    setIsUpdating(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
       setIsModalOpen(false); 
  } catch (err) {
    setIsUpdating(false);
    alert("Error saving address");
  }
};


const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this address?")) return;

  try {
    await axios.delete(`http://localhost:3000/api/addresses/${id}`, {withCredentials: true});
    const res = await axios.get("http://localhost:3000/api/addresses", {withCredentials: true});
    setAddresses(res.data); // refresh list
  } catch (err) {
    alert("Error deleting address");
  }
};


  return (
    <div className="font-serif max-w-4xl animate-fadeIn">
      {/* Saved Addresses Section */}
      <div className="  p-6 space-y-0 mb-0 ">
        {addresses.map((item) => (
  <div
    key={item._id}
    className="flex justify-between items-start py-5 border-b border-gray-100"
  >
    <div className="space-y-1">
      <p className="font-bold text-[#1B3022] text-lg">
        {item.firstName} {item.lastName}
      </p>
      <p className="text-sm text-gray-500 tracking-tight">
        {item.address}, {item.city}, {item.state}, {item.zip}
      </p>
      <p className="text-sm text-gray-500">{item.phone}</p>
      <p className="text-sm text-gray-500">{item.email}</p>
    </div>

    <div className="flex gap-6 text-[13px] font-medium mt-1">
   <button
  onClick={() => {
    setEditingId(item._id);
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setCountry(item.country);
    setAddress(item.address);
    setCity(item.city);
    setState(item.state);
    setZip(item.zip);
    setPhone(item.phone);
    setEmail(item.email);
          setIsModalOpen(true);   // 👈 हाच missing होता
   

  }}
  className="text-black hover:underline cursor-pointer"
>
  Edit
</button>

      <button
  onClick={() => handleDelete(item._id)}
  className="text-[#FF5C5C] hover:underline"
>
  Delete
</button>

    </div>
  </div>
))}


      </div>

      {/* --- ADD NEW ADDRESS FORM (Static Theme) --- */}
      <h3 className="text-xl font-medium text-[#1B3022] mb-8 uppercase tracking-widest">Add New Address</h3>
      
<form onSubmit={(e) => { e.preventDefault(); handleAddAddress(); }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white/50 p-6 border border-gray-100 rounded-lg">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">First Name*</label>

<input
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
  placeholder="Bessie"
  className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Last Name*</label>
<input
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
  placeholder="Cooper"
  className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>
        </div>

        {/* Dropdowns Section */}
        <div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-semibold text-gray-700">Country*</label>
  <input
  type="text"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  placeholder="Enter Country"
  className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

</div>

<div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-semibold text-gray-700">Address*</label>
 <textarea
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Enter Full Address"
  className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

</div>

<div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-semibold text-gray-700">City*</label>
  <input
  type="text"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  placeholder="Enter City"
  className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

</div>

<div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-semibold text-gray-700">State*</label>
 <input
  type="text"
  value={state}
  onChange={(e) => setState(e.target.value)}
  placeholder="Enter State"
  className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

</div>

<div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-semibold text-gray-700">Zip Code*</label>
  <input
  type="text"
  value={zip}
  onChange={(e) => setZip(e.target.value)}
  placeholder="Enter Zip Code"
  className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

</div>


      

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Phone Number*</label>
<input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="02-33224455"
  className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>
        </div>
        <div className="col-span-full flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-700">Email*</label>
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="example@gmail.com"
  className="p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] text-sm shadow-sm"
/>

        </div>

        <div className="col-span-full mt-4 flex items-center gap-4">
          <button 
            type="submit"
            disabled={isUpdating}
            className="bg-[#1B3022] text-white py-3.5 px-10 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#253d2c] flex items-center gap-2"
          >
            {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
            {isUpdating ? "Saving..." : "Add Address"}
          </button>
          {showSuccess && <span className="text-green-600 text-sm italic animate-pulse">✓ Address added successfully!</span>}
        </div>
      </form>

      {/* --- EDIT POPUP MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#1B3022]/40 backdrop-blur-sm" />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#FDF9F0] p-8 shadow-2xl border border-white/20"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-normal text-[#1B3022]">Edit Address</h2>
                <p className="text-[#CBA135] text-xs font-bold uppercase tracking-widest mt-1">Update your delivery preferences</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">

               <div className="flex flex-col gap-2">
  <label className="text-xs font-bold text-gray-700">First Name*</label>
  <input
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]"
  />
</div>

<div className="flex flex-col gap-2">
  <label className="text-xs font-bold text-gray-700">Last Name*</label>
  <input
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]"
  />
</div>

<div className="col-span-full flex flex-col gap-2">
  <label className="text-xs font-bold text-gray-700">Address*</label>
  <input
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="p-3 border border-gray-200 outline-none focus:border-[#CBA135]"
  />
</div>

<div className="col-span-full mt-4">
  <button
    type="submit"
    onClick={handleAddAddress}
    disabled={isUpdating}
    className="w-full bg-[#1B3022] text-white py-4 uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-2"
  >
    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "Update Address"}
  </button>
</div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Address;