import ContactForm from "@/components/ContactForm/ContactForm";
import React from "react";

// Icons
import { TbMessages } from "react-icons/tb";

const ContactFormPage = () => {
  return (
   <div className="flex gap-[250px] mt-5 justify-center items-center" style={{height: 'calc(100vh - 140px)'}}>
      <div className="flex flex-col p-5 rounded-lg justify-center items-center">
         <TbMessages size={400}/>
      </div>
      <div className="flex justify-center items-center">
         <ContactForm/>      
      </div>
    </div>
  );
};

export default ContactFormPage;