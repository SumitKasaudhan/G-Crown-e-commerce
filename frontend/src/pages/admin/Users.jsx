import React, { useState, useEffect } from "react";
import {
  User,
  Trash2,
  Edit3,
  Plus,
  X,
  Check,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import Toast from "../../components/admin/Toast.jsx";
import { axiosGetService, axiosDeleteService } from "../../services/axios.js"

// Removed 'Customer' option as requested
const roles = ["Administrator", "Manager", "Staff"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleSave = (user) => {
    if (selectedUser) {
      setUsers(
        users.map((u) => (u._id === selectedUser._id ? { ...u, ...user } : u))
      );
      showToast("User updated successfully!");
    } else {
      setUsers([...users, { ...user, _id: Date.now() }]);
      showToast("New team member added!");
    }
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {

      const apiResponse = await axiosDeleteService(`/admin/auth/deleteemployee?userId=${id}`)

      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "Employee Not Delete.");
      }
      else {
        setUsers(users.filter((u) => u.id !== id));
        showToast("User removed successfully!", "success");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  }

  const fetchUsers = async () => {
    const apiResponse = await axiosGetService("/admin/auth/getemployee");

    // Correct logic
    if (!apiResponse.ok) {
      showToast(apiResponse.data.message || "Failed to load users", "error");
      setUsers([]);
      return;
    }

    const data = apiResponse.data.data;

    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="p-2 md:p-2 bg-[#FFF8E8] min-h-screen space-y-8 animate-in fade-in duration-500">
      {toast.show && (
        <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-[#08221B] flex items-center gap-3">
            <span className="p-2 bg-[#08221B] text-[#DFC370] rounded-2xl ">
              <User size={24} />
            </span>
            Team Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage administrative access and team permissions.
          </p>
        </div>
        {/* <button
          onClick={() => { setSelectedUser(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <UserPlus size={18} /> Add Team Member
        </button> */}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-black tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Profile</th>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Access Level</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-6 text-center text-slate-500 font-medium">
                    No team members found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-800">
                          {user?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Mail size={14} /> {user?.email}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {/* KEEP UI exactly as original */}
                      {/* <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight bg-slate-100 text-slate-600">
                        Staff
                      </span> */}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        {/* <button
                          onClick={() => handleEdit(user)}
                          className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 rounded-xl shadow-sm transition-all"
                        >
                          <Edit3 size={16} />
                        </button> */}
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 rounded-xl shadow-sm transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// --- Modal Component ---
const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {user ? "Edit Profile" : "New Member"}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Assign roles and set up access.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
              placeholder="e.g. Vishal Kushwaha"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
              placeholder="name@gcrown.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              System Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} /> {user ? "Update" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Users;
