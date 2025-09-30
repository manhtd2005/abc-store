import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Mail, Phone, MapPin, Edit3, UserCircle, Check } from "lucide-react";

const Information = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [addressValue, setAddressValue] = useState({
    street: "",
    city: "",
    number: "",
    zipcode: "",
  });

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    if (field === "address") {
      setAddressValue({
        street: currentValue?.street || "",
        city: currentValue?.city || "",
        number: currentValue?.number || "",
        zipcode: currentValue?.zipcode || "",
      });
    } else {
      setFieldValue(currentValue || "");
    }
  };

  const handleSave = async (field) => {
    const newData = { ...user };
    switch (field) {
      case "firstname":
        newData.name.firstname = fieldValue;
        break;
      case "lastname":
        newData.name.lastname = fieldValue;
        break;
      case "email":
        newData.email = fieldValue;
        break;
      case "phone":
        newData.phone = fieldValue;
        break;
      case "address":
        newData.address = { ...addressValue };
        break;
      default:
        break;
    }
    await updateUser(user._id, newData);
    setEditingField(null);
  };

  // ---------- Component normal field-----------------
  const renderField = (label, icon, fieldKey, value) => {
    const displayValue =
      value === null || value === undefined || value === "" ? (
        <span className="text-red-400 italic">No value</span>
      ) : (
        <span className="text-gray-800">{value}</span>
      );

    return (
      <div className="border rounded-xl p-6 shadow-sm bg-gray-50 hover:bg-gray-100 transition">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="font-semibold text-gray-700">{label}</h2>
          </div>
          {editingField !== fieldKey ? (
            <button
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              onClick={() => handleEdit(fieldKey, value)}
            >
              <Edit3 size={16} className="p-1" /> Change
            </button>
          ) : (
            <button
              className="flex items-center gap-1 text-sm text-green-600 hover:underline"
              onClick={() => handleSave(fieldKey)}
            >
              <Check size={16} className="p-1" /> Save
            </button>
          )}
        </div>
        {editingField === fieldKey ? (
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="border px-2 py-1 rounded w-full focus:ring-2 focus:ring-blue-300"
          />
        ) : (
          displayValue
        )}
      </div>
    );
  };

  // ----------- Component Address Field -----------------
  const renderAddress = () => {
    const address = user?.address;

    const addressParts = [
      address?.number ? `No. ${address.number}` : null,
      address?.street || null,
      address?.city || null,
      address?.zipcode ? `Zip: ${address.zipcode}` : null,
    ].filter(Boolean);

    return (
      <div className="border rounded-xl p-6 shadow-sm bg-gray-50 hover:bg-gray-100 transition md:col-span-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-500" />
            <h2 className="font-semibold text-gray-700">Address</h2>
          </div>
          {editingField !== "address" ? (
            <button
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              onClick={() => handleEdit("address", address)}
            >
              <Edit3 size={16} className="p-1" /> Change
            </button>
          ) : (
            <button
              className="flex items-center gap-1 text-sm text-green-600 hover:underline"
              onClick={() => handleSave("address")}
            >
              <Check size={16} className="p-1" /> Save
            </button>
          )}
        </div>

        {editingField === "address" ? (
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Number"
              value={addressValue.number}
              onChange={(e) =>
                setAddressValue({ ...addressValue, number: e.target.value })
              }
              className="border px-2 py-1 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Street"
              value={addressValue.street}
              onChange={(e) =>
                setAddressValue({ ...addressValue, street: e.target.value })
              }
              className="border px-2 py-1 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="City"
              value={addressValue.city}
              onChange={(e) =>
                setAddressValue({ ...addressValue, city: e.target.value })
              }
              className="border px-2 py-1 rounded w-full focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="text"
              placeholder="Zipcode"
              value={addressValue.zipcode}
              onChange={(e) =>
                setAddressValue({ ...addressValue, zipcode: e.target.value })
              }
              className="border px-2 py-1 rounded w-full focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ) : addressParts.length > 0 ? (
          <p className="text-gray-800">{addressParts.join(", ")}</p>
        ) : (
          <span className="text-red-400 italic">No value</span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50 rounded-3xl px-8">
      <div className="w-full max-w-5xl mx-auto bg-white px-10 pb-8 rounded-3xl shadow">
        {/* Avatar + tên */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">
            {user?.name?.firstname?.[0]?.toUpperCase() || ""}
            {user?.name?.lastname?.[0]?.toUpperCase() || ""}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            {user?.name?.firstname} {user?.name?.lastname}
          </h1>
          <p className="text-lg text-gray-500">@{user?.username}</p>
          <p className="text-lg text-gray-500">ID: {user?._id}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {renderField(
            "First name",
            <UserCircle className="text-blue-500" />,
            "firstname",
            user?.name?.firstname
          )}
          {renderField(
            "Last name",
            <UserCircle className="text-blue-500" />,
            "lastname",
            user?.name?.lastname
          )}
          {renderField(
            "Email",
            <Mail className="text-blue-500" />,
            "email",
            user?.email
          )}
          {renderField(
            "Phone",
            <Phone className="text-blue-500" />,
            "phone",
            user?.phone
          )}
          {renderAddress()}
        </div>
      </div>
    </div>
  );
};

export default Information;
