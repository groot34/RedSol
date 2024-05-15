"use client";

import Table from "@/components/Table";
import FormSave from "@/components/form";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  interface Record {
    _id: string;
    name: string;
    phone: string;
    email: string;
    hobby: string; // Assuming 'hobby' exists in your records
  }

  const [records, setRecords] = useState<Record[]>([]);

  return (
    <div className="bg-black text-white">
      <Toaster />
      <div className="flex items-center">
      <Image src="/social_logo.png" alt="logo" width={50} height={40} />
      <p className="text-heading3-bold text-white ">Red Solutions</p>
      </div>

      <Table records={records} setRecords={setRecords} />
      <FormSave setRecords={setRecords} />
     
    </div>
  );
}
