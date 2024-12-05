import { useState, useRef } from "react";
import axios from "axios";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Talent from "../sections/Talent";
import { Button } from "../components/ui/button";
import { useAuth } from "../Context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// FORM REF WAS ADDED TO CLEAR THE FORM AFTER SUBMISSION
//  IMPORT USEREF
// INITIALIZE IT
// SET THE FORMREF.CURRENT.RESET()
// ATTACTH THE REF = {FORMREF } TO THE FORM ELEMENT.

const ProjectRequest = () => {

  const {token} = useAuth();
  const formRef = useRef(null)

  // State for each form field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    project_name: "",
    estimated_budget: 0,
    max_project_time: 0,
    company_name: "",
    required_skills: "",
    description: "",
  });


  const [file, setFile] = useState(null);

  // Handle input changes
  const handleChange = (e):void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

  };

  // Handle file drop
  const handleDrop = (event):void => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    console.log(droppedFile.name);
  };

  // Handle file selection
  const handleFileSelect = (event):void => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(file.name);
  };

  // Prevent default drag behavior
  const handleDragOver =  (event: React.DragEvent): void => {
    event.preventDefault();
  };

  //  HANDLE FORM SUBMISSION
    const handleSubmit = async (e) => {
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
        const response = await axios.post("http://34.174.24.158/colauncha-api/requests/form-submit", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });
        if (response)
        // Handle the response
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error uploading form data:", error);
      }

      formRef.current.reset();
  };

  return (

// { error? "error submitting data": "Successfully submitted" }


    <div className="min-h-screen w-full mt-[100px]">
      <div className="w-[90%] mx-auto ">
        <Talent />
      </div>
      <div className="text-center text-2xl mb-6 font-bold">
        <p>Let Us build your Project for you </p>
      </div>
      <form ref={formRef} className="bg-[#f5f5f5] w-[70%] mx-auto flex flex-col justify-center items-center" onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
    }
  }} >
        <div className="w-full grid grid-cols-2 p-4 sm:p-12 gap-4 ">
          {/* name and email */}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="name">Your Name</Label>
              <Input type="text" id="name"  className="h-12" value={formData.name} onChange={handleChange}/>
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required className="h-12" value={formData.email}  onChange={handleChange}/>
            </div>
          </div>
          {/* phone and Country */}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="number" id="phone" required className="h-12" value={formData.phone}   onChange={handleChange}/>
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" required className="h-12" value={formData.country}  onChange={handleChange} />
            </div>
          </div>
          {/* Project and budget*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="project_name">Project Name</Label>
              <Input type="text" id="project_name" required className="h-12" value={formData.project_name}  onChange={handleChange} />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor=" estimated_budget"> Estimated Budget</Label>
              <Input type="text" id="estimated_budget" required className="h-12"value={formData.estimated_budget}  onChange={handleChange}/>
            </div>
          </div>
          {/*Time frame and company*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="max_project_time">Maximum Time for the Project</Label>
              <Input type="text" id="max_project_time" required className="h-12" value={formData.max_project_time}  onChange={handleChange} />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="company_name">Company Name</Label>
              <Input type="text" id="company_name" required className="h-12" value={formData.company_name}  onChange={handleChange}/>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:p-12 gap-4">
          {/* Required required_skills */}
          <div className="grid-cols-none">
            <div>
              {/* required skills */}
              <div className="grid w-full  items-center gap-1.5  mb-6">
                <Label htmlFor="required_skills">
                  Required Skills (Comma separated)
                </Label>
                <Input type="text" id="required_skills" required className="h-12" value={formData.required_skills}  onChange={handleChange} />
              </div>
              {/* upload files */}
              <div className="text-center">
                <h3 className="text-start font-poppins">Upload Files (max - 2mb)</h3>
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
              {/* Message*/}
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="description">Description(min-10 & max-250 characters)</Label>
                <textarea
                  placeholder="Enter your message here..."
                  id="description"
                  rows={6}
                  cols={50}
                  className="rounded-md border-[1px] border-gray-300 bg-transparent p-6"
                  value={formData.description}
                  onChange={handleChange}
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

export default ProjectRequest;
