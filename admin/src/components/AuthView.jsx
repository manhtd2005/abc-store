import { useState } from "react";

export default function AuthView({ account, onClose, onSave }) {
  const [email, setEmail] = useState(account.email);
  const [username, setUsername] = useState(account.username);
  const [firstName, setFirstName] = useState(account.name.firstname);
  const [lastName, setLastName] = useState(account.name.lastname);
  const [phone, setPhone] = useState(account.phone);
  const [city, setCity] = useState(account.address.city);
  const [street, setStreet] = useState(account.address.street);
  const [number, setNumber] = useState(account.address.number);
  const [zipcode, setZipcode] = useState(account.address.zipcode);

  const handleSave = () => {
    const updatedAccount = {
      ...account,
      email,
      username,
      name: { firstname: firstName, lastname: lastName },
      phone,
      address: { city, street, number, zipcode }
    };
    onSave(updatedAccount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-3">
        <h2 className="text-xl font-bold">Edit Account</h2>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} className="w-full border rounded px-2 py-1"/>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onClose} className="px-4 py-1 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
