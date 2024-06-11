"use client";

import React, { useState } from "react";
import { sendEmail } from "./MailService";

// Icons
import { RiMailSendLine } from "react-icons/ri";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    await sendEmail(email, subject, message);
  };

  return (
    <div className="bg-[#ccc] dark:bg-[#272727] p-5 rounded-lg w-[555px]">
      <form className="space-y-4">
        <div>
          <label className="block mb-3 text-sm font-medium">
            Електронна адреса:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
            }}
            className="w-full px-3 py-2 border border-transparent bg-[#414141] rounded-md focus:outline-none focus:ring-2 duration-100 focus:ring-blue-600 focus:ring-inset"
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-medium">Тема:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              const value = e.target.value;
              setSubject(value);
            }}
            className="w-full px-3 py-2 border border-transparent bg-[#414141] rounded-md focus:outline-none focus:ring-2 duration-100 focus:border-blue-600"
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-medium">
            Зміст проблеми:
          </label>
          <textarea
            value={message}
            onChange={(e) => {
              const value = e.target.value;
              setMessage(value);
            }}
            className="w-full px-3 py-2 border border-transparent bg-[#414141] rounded-md focus:outline-none focus:ring-2 duration-100 focus:border-blue-600 resize-none"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          formAction={send}
          className="flex items-center mt-5 w-full justify-center bg-[#FFF] dark:bg-[#3B3B3B] transition duration-300 hover:bg-[#E0E0E0] hover:dark:bg-[#414141] hover:cursor-pointer h-[40px] rounded-md font-bold"
        >
          Submit <RiMailSendLine className="pl-2" size={25} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
