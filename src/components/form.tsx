"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Record {
  _id: string;
  name: string;
  phone: string;
  email: string;
  hobby: string; // Assuming 'hobby' exists in your records
}

type FormProps = {
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
};

export default function FormSave({ setRecords }: FormProps) {
  const fetchRecords = async () => {
    const res = await axios.get<Record[]>("/api/users/getData");
    console.log(res.data);
    setRecords(res.data);
  };

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    hobby: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/profile", user,{
        timeout: 15000 // Set timeout to 5 seconds (5000 milliseconds)
      });
      console.log("Save success", response.data);
      await fetchRecords();
      toast.success("Data Saved");
    } catch (error: any) {
      console.log("Saving failed", error.message);

      toast.error("Fill all the fields!!");
    } finally {
      setLoading(false);
      setUser({
        name: "",
        phone: "",
        email: "",
        hobby: "",
      });
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.phone.length > 0 &&
      user.email.length > 0 &&
      user.hobby.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 ">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label
        htmlFor="name"
        className="after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        Name
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="username"
      />

      <label
        htmlFor="phone"
        className="after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        Phone
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="phone"
        type="text"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        placeholder="phone"
      />

      <label
        htmlFor="email"
        className="after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label
        htmlFor="hobby"
        className="after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        Hobby
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="hobby"
        type="text"
        value={user.hobby}
        onChange={(e) => setUser({ ...user, hobby: e.target.value })}
        placeholder="hobby"
      />

      <button
        onClick={onSave}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Fill all Details" : "Save"}
      </button>
    </div>
  );
}
