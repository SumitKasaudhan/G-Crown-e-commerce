import React, { useState } from "react";
import { axiosPutService } from "../../../services/axios";
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";


const Password = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // FIXED: Changed null to "" to keep components controlled
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // NEW: Visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = () => {
    let errors = [];

    // FIXED: Safely check trim() on strings
    if (!oldPassword || !oldPassword.trim()) errors.push("Current password is required");
    if (!newPassword || !newPassword.trim()) errors.push("New password is required");
    if (!confirmPassword || !confirmPassword.trim()) errors.push("Confirm password is required");

    if (newPassword && newPassword.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    const specialRegex = /[^A-Za-z0-9]/;
    if (newPassword && !specialRegex.test(newPassword)) {
      errors.push("Password must contain at least one special symbol (!,@,#,$ etc.)");
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.push("New password and confirm password do not match");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleUpdate = async () => {
    if (!validatePassword()) return;
    try {
      setIsUpdating(true);

      const formData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      }

      const response = await axiosPutService("/customer/auth/changePassword", formData)

      if (!response.ok) {
        setIsUpdating(false); // FIXED: Must reset loading state on failure
        alert(response.data.message || "Password not Change");
        return
      }
      else {
        alert(response.data.message || "Password updated successfully!");
        setIsUpdating(false);
        setShowSuccess(true);
        // Clear fields after success (Senior best practice)
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
    catch (err) {
      setIsUpdating(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // Reusable Eye Icon Component for cleaner code
  const EyeIcon = ({ isVisible, toggle }) => (
    <span 
      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 cursor-pointer hover:opacity-100 transition-opacity"
      onClick={toggle}
    >
      {isVisible ? (
        <Eye size={20} />
      ) : (
        <EyeOff size={20} />
      )}
    </span>
  );

  return (
    <div className="font-serif w-full max-w-4xl animate-fadeIn relative ">
      <div className="max-w-xl space-y-8">

        {/* Current Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">Current Password *</label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"} // Dynamic Type
              placeholder="Enter Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm"
            />
            <EyeIcon isVisible={showOld} toggle={() => setShowOld(!showOld)} />
          </div>
          <div className="flex justify-end">
            <span className="text-[11px] text-[#1B3022] underline cursor-pointer hover:font-bold transition-all">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* New Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">New Password *</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"} // Dynamic Type
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm"
            />
            <EyeIcon isVisible={showNew} toggle={() => setShowNew(!showNew)} />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-800">Confirm New Password *</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"} // Dynamic Type
              placeholder="Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3.5 border border-gray-100 bg-white outline-none focus:border-[#1B3022] shadow-sm text-sm"
            />
            <EyeIcon isVisible={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
          </div>
        </div>

        {/* Update Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-[#1B3022] text-white py-3.5 px-10 text-sm font-medium hover:bg-[#253d2c] transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : showSuccess ? "Password Updated! ✓" : "Update Password"}
          </button>
          {showSuccess && <span className="text-green-600 text-xs animate-pulse font-medium italic">Your security settings have been saved.</span>}
        </div>
      </div>
    </div>
  );
};

export default Password;