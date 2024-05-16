"use client";

import { sendMailToRecipient } from "@/serverAction/sendMail";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Record {
  _id: string;
  name: string;
  phone: string;
  email: string;
  hobby: string; // Assuming 'hobby' exists in your records
}

type TableProps = {
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
};



export default function Table({ records, setRecords }: TableProps) {
  const [_id, setId] = useState<string>("");
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    hobby: "",
  });

  useEffect(() => {
    fetchRecords().then((_) => {});
  }, []);

  //useEffect(() => {}, [_id]);

  const deleteUser = async (id: string) => {
    try {
      // Assuming `id` is the ID of the user you want to delete
      await axios.delete("/api/users/delete", { data: { _id: id } });
      console.log("User deleted successfully");
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const fetchRecords = async () => {
    const res = await axios.get<Record[]>("/api/users/getData", {
      timeout: 5000, // 5 seconds timeout
    });
    console.log(res.data);
    setRecords(res.data);
  };

  // Call the async function immediately

  const massage = async () => {
    toast.success("Data Copied Successfully!!");
  };

  const sendu = async () => {
    toast.success("Data Sent to Email!!");
  };

  const send = async () => {
    if (
      user.name.length === 0 ||
      user.phone.length === 0 ||
      user.email.length === 0
    ) {
      toast.error("Select the User!!");
      return;
    }

    await sendMailToRecipient({
      name: "Atharva",
      subject: "Assignment for Internship by Atharva",
      body: `<h3>The data is as follows:</h3>
      <br/>                                           
         NAME: ${user.name},
        <br/>
        PHONE: ${user.phone},
        <br/>
        EMAIL: ${user.email},
        <br/>
        HOBBY: ${user.hobby}`,
    });

    sendu();
    setUser({
      name: "",
      phone: "",
      email: "",
      hobby: "",
    });
  };

  const deleteRecord = async (id: string) => {
    await deleteUser(id);
    fetchRecords();
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1>Table</h1>
      </div>
      <div className="flex items-center justify-center m-2 px-2">
        <table className="border-2 p-2">
          <thead>
            <tr className="gap-8">
              <th className="px-2">Select</th>
              <th className="px-2">ID</th>
              <th className="px-2">Name</th>
              <th className="px-2">Phone</th>
              <th className="px-2">Email</th>
              <th className="px-2">Hobby</th>
              <th className="px-2 ">Delete</th>
            </tr>
          </thead>

          <tbody className="p-2">
            {records.map((record) => (
              <tr key={record._id}>
                <td>
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() => {
                      setUser({
                        name: record.name,
                        phone: record.phone,
                        email: record.email,
                        hobby: record.hobby,
                      });
                      massage();
                    }}
                  >
                    Select
                  </button>
                </td>
                <td className="p-2">{record._id}</td>
                <td className="p-2">{record.name}</td>
                <td className="p-2">{record.phone}</td>
                <td className="p-2">{record.email}</td>
                <td className="p-2">{record.hobby}</td>
                <td>
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={async (e) => await deleteRecord(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center mb-7">
        <button className="border hover:bg-gray-100" onClick={send}>
          <h1 className="p-2">Send</h1>
        </button>
      </div>

    </div>
  );
}
function isEqual(records: Record[], data: Record[]) {
  throw new Error("Function not implemented.");
}

function useRef(arg0: boolean) {
  throw new Error("Function not implemented.");
}
