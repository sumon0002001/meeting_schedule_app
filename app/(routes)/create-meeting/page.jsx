import React from "react";
import MeetingForm from "./_dashboard/MeetingForm";
import PreviewMeeting from "./_dashboard/PreviewMeeting";

const CreateMeeting = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="shadow-md border h-screen">
        <MeetingForm />
      </div>
      <div className="md:col-span-2">
        <PreviewMeeting />
      </div>
    </div>
  );
};

export default CreateMeeting;
