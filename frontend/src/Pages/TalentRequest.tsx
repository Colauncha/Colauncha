import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Talent from "../sections/Talent";
import { Button } from "../components/ui/button";
import ProjectRequest from "./ProjectRequest";

const TalentRequest = () => {
  // State for each form field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    skill: "",
    education: "",
    project: "",
    certification: "",
    skills: "",
    message: "",
  });
  const [file, setFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Prevent default drag behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data to be sent
    const dataToSend = { ...formData, file };

    // POST request to backend
    fetch("/api/talent-request", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully:", data);
        // Clear form or give feedback to the user
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
      <form className="bg-[#f5f5f5] w-[70%] mx-auto flex flex-col justify-center items-center">
        <div className="w-full grid grid-cols-2 p-4 sm:p-12 gap-4 ">
          {/* name and email */}
          <div className="">
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="name" className="flex justify-start items-center gap-6" >Your Name <p className="text-red-500">(Optional)</p></Label>
              <Input type="text" id="name" required className="h-12" />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required className="h-12" />
            </div>
          </div>
          {/* phone and Country */}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="number" id="phone" required className="h-12" />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" required className="h-12" />
            </div>
          </div>
          {/* skill and education*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="project">Skill</Label>
              <Input type="text" id="skill" required className="h-12" />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="budget">Education</Label>
              <Input type="text" id="education" required className="h-12" />
            </div>
          </div>
          {/* Project and certification*/}
          <div>
            <div className="grid w-full text-xl  items-center gap-1.5">
              <Label htmlFor="time-frame">Project worked on</Label>
              <Input type="text" id="project" required className="h-12" />
            </div>
          </div>
          <div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="company-name">Certification</Label>
              <Input type="text" id="certification" required className="h-12" />
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:p-12 gap-4">
          {/* Required skills */}
          <div className="grid-cols-none">
            <div>
              {/* required skills */}
              <div className="grid w-full  items-center gap-1.5  mb-6">
                <Label htmlFor="skills">
                  Required Skills (Comma separated)
                </Label>
                <Input type="text" id="skills" required className="h-12" />
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
                <Label htmlFor="message">
                  Reasons why you are volunteering
                </Label>
                <textarea
                  placeholder="Enter your message here..."
                  id="reasons"
                  rows="6"
                  cols="50"
                  className="rounded-md border-[1px] border-gray-300 bg-transparent p-6"
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
    </div>
  );
};

export default TalentRequest;
