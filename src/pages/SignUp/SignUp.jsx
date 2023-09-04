import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Send } from "lucide-react";
import { FormCreateEmployee } from "../../components/FormCreateEmployee/FormCreateEmployee";

export const SignUp = () => {
  return (
    <div className="h-full min-w-full space-y-10 pb-20">
      <Navbar title={"Registrarse"} />
      <div className="max-w-[29rem] md:max-w-4xl xl:max-w-6xl h-full m-auto border border-neutral-400 w-full py-10 mb-4">
        <FormCreateEmployee />
      </div>
    </div>
  );
};
