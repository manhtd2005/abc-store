import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/UserContext";

export default function AddAuth() {
  const { users, addUser } = useContext(UserContext);
  const nextId = users.length + 1;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Must enter this form "example@gmail.com"');
      return false;
    }

    const cityRegex = /^[A-Za-z\s]+$/;
    if (city && !cityRegex.test(city)) {
      toast.error("City must contain letters only!");
      return false;
    }

    if (number && isNaN(number)) {
      toast.error("Must enter number only!");
      return false;
    }

    const zipRegex = /^[0-9]+$/;
    if (zipcode && !zipRegex.test(zipcode)) {
      toast.error("Numbers only!");
      return false;
    }

    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    const newAccount = {
      id: nextId,
      email,
      username,
      password,
      name: { firstname: firstName, lastname: lastName },
      phone,
      address: { city, street, number, zipcode },
    };

    addUser(newAccount);

    toast.success("Successfully created new account!");

    setEmail("");
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setCity("");
    setStreet("");
    setNumber("");
    setZipcode("");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">➕</span>
        <h1 className="text-2xl font-bold">Add Account</h1>
      </div>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block font-medium mb-1">ID</label>
          <input
            type="text"
            value={nextId}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1-570-236-7033"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Street"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">House number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter house number"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Zipcode</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter zipcode"
          />
        </div>

        <div>
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Create account
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
