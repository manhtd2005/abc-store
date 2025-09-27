import React from "react";
import { Mail, Phone, MapPin, User, Edit, Briefcase } from "lucide-react";
import { useParams } from "react-router-dom";

const mockUsers = {
  1: {
    name: "Jane Doe",
    title: "Senior Frontend Developer",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatarUrl: "https://via.placeholder.com/150/111827/FFFFFF?text=JD",
  },
  2: {
    name: "John Smith",
    title: "Backend Engineer",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    avatarUrl: "https://via.placeholder.com/150/111827/FFFFFF?text=JS",
  },
};

const Information = () => {
  const { infoId } = useParams();
  const user = mockUsers[infoId] || mockUsers[1]; // fallback nếu không tìm thấy

  return (
    <main className="flex-grow py-12">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 transition duration-300 transform hover:scale-[1.01]">
        {/* Avatar + Name */}
        <div className="text-center pb-6 border-b border-gray-100">
          <img
            className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-gray-900/50 shadow-lg"
            src={user.avatarUrl}
            alt={`Avatar of ${user.name}`}
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4 tracking-tight flex justify-center items-center gap-2">
            <User className="text-gray-900" size={28} />
            {user.name}
          </h2>
          <p className="text-lg text-gray-600 font-medium mt-2 flex justify-center items-center gap-1">
            <Briefcase size={16} className="text-gray-500" />
            {user.title}
          </p>
          <p className="text-xs text-gray-400 mt-1">Profile ID: {infoId}</p>
        </div>

        {/* Contact info */}
        <div className="pt-6 space-y-5">
          <div className="flex items-center text-gray-700 border-b border-gray-100 pb-3">
            <Mail size={20} className="text-gray-500 mr-4" />
            <span className="font-semibold w-24 text-sm uppercase tracking-wider">Email:</span>
            <span className="text-base font-medium truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-gray-700 border-b border-gray-100 pb-3">
            <Phone size={20} className="text-gray-500 mr-4" />
            <span className="font-semibold w-24 text-sm uppercase tracking-wider">Phone:</span>
            <span className="text-base font-medium">{user.phone}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin size={20} className="text-gray-500 mr-4" />
            <span className="font-semibold w-24 text-sm uppercase tracking-wider">Location:</span>
            <span className="text-base font-medium">{user.location}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300">
            <Edit size={18} />
            Chỉnh Sửa Thông Tin
          </button>
        </div>
      </div>
    </main>
  );
};

export default Information;
