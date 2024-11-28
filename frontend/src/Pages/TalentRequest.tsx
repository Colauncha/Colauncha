import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Talent from "../sections/Talent";
import { Button } from "../components/ui/button";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @ts-ignore
// const formDataToSend = formData.append("key", value);


interface FormData {
  [key: string]: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  skills: string;
  education: string;
  projects: string;
  certifications: string;
  role: string;
  why_volunteer: string;
  reason: string;
}



const rowCount: number = 6;
const colCount: number = 50;
const TalentRequest = () => {

  const {token} = useAuth()
  // State for each form field
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    skills: "",
    education: "",
    projects: "",
    certifications: "",
    role: "",
    why_volunteer: "",
    reason:"",
  });
  
  const [file, setFile] = useState(null);
  // const [formSubmitted, setFormSubmitted] = useState<boolean | null>(null);


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    console.log(droppedFile.name);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(file.name);
  };

  // Prevent default drag behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your form has been submitted successfully!');

    const formDataToSend = new FormData();

  // Append each field to formDataToSend
  for (const key in formData) {
    formDataToSend.append(key, formData[key]);
  }

  // Append the file attachment
  formDataToSend.append("attachment", file);

  

  try {
    // Send the POST request
    const response = await axios.post("https://lc96ppln-8000.uks1.devtunnels.ms/api/requests/volunteer-form-submit", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });

    // Handle the response
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error uploading form data:", error);
  }
  

  };
  return (

    <div className="min-h-screen w-full mt-[100px]">
      <div className="w-[90%] mx-auto ">
        <Talent />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center mb-4">
        <p className="text-center text-2xl mb-6 font-bold">
          Kindly fill out the Form to Join Colauncha as a Talent
        </p>
        <>
          <Button className="bg-green-600 hover:bg-green-400">
            <Link to="/project-request">Request for Talents as Founder</Link>
          </Button>
        </>
      </div>
      {/* Feedback Message */}
      {/* {formSubmitted && (
        <div
          className={`w-[70%] mx-auto p-4 text-center rounded-md ${
            formSubmitted.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {formSubmitted.message}
        </div>
      )} */}
      <form className="bg-[#f5f5f5] w-[70%] mx-auto flex flex-col justify-center items-center" onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
    }
  }}>
        <div className="w-full grid grid-cols-2 p-4 sm:p-12 gap-4 ">
          {/* name and email */}
          <div className="">
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="name" className="flex justify-start items-center gap-6" >Your Name </Label>
              <Input type="text" id="name" required className="h-12" value={formData.name} onChange={handleChange} />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email" className="flex gap-4">Email <p className="text-red-500">*</p></Label>
              <Input type="email" id="email" required className="h-12" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          {/* phone and Country */}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="phone"  className="flex gap-4">Phone Number <p className="text-red-500">*</p></Label>
              <Input type="number" id="phone" required className="h-12"value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="country"  className="flex gap-4">Country <p className="text-red-500">*</p></Label>
              <Input type="text" id="country" required className="h-12" value={formData.country} onChange={handleChange} />
            </div>
          </div>
          {/* Role and education*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="project"  className="flex gap-4">Role <p className="text-red-500">*</p></Label>
              <Input type="text" id="role" required className="h-12" value={formData.role} onChange={handleChange}/>
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="budget"  className="flex gap-4">Education <p className="text-red-500">*</p></Label>
              <Input type="text" id="education" required className="h-12"value={formData.education} onChange={handleChange} />
            </div>
          </div>
          {/* Project and certification*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="time-frame"  className="flex gap-4">Project(coma separated) worked on <p className="text-red-500">*</p></Label>
              <Input type="text" id="projects" required className="h-12" value={formData.projects} onChange={handleChange}/>
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="company-name"  className="flex gap-4">Certification(s) <p className="text-red-500">*</p></Label>
              <Input type="text" id="certifications" required className="h-12" value={formData.certifications} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:p-12 gap-4">
          {/* Required skills */}
          <div className="grid-cols-none">
            <div>
              {/* required skills */}
              <div className="grid w-full  items-center gap-1.5  mb-6">
                <Label htmlFor="skills" className="flex gap-4">
                  Required Skills (Comma separated) <p className="text-red-500">*</p>
                </Label>
                <Input type="text" id="skills" required className="h-12" value={formData.skills} onChange={handleChange} />
              </div>
              {/* upload files */}
              <div className="text-center">
                <h3 className="text-start font-poppins">Upload Files</h3>
                <div
                  className="border-2 border-dashed border-gray-300 p-10 rounded-md bg-gray-100 text-blue-500 cursor-pointer mb-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p>Drag File Here Or Click The Button Below</p>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 lg:text-start"
                  >
                    Upload File (JPEP, PNG, DOC, PDF)
                  </label>
                </div>
                {file && (
                  <p className="text-gray-700 mt-2">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
              {/* reasons why you are volunteering */}
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="message"  className="flex gap-4">
                  Reasons why you are volunteering <p className="text-red-500">*</p>
                </Label>
                <textarea
                  placeholder="Enter your message here..."
                  id="why_volunteer"
                  rows={rowCount}
                  cols={colCount}
                  className="rounded-md border-[1px] border-gray-300 bg-transparent p-6"
                  value={formData.why_volunteer} onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-[30%] mt-6 mb-14 bg-[#3783ff] text-white hover:bg-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TalentRequest;
