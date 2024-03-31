import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const PreviewMeeting = ({ formValue }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

  useEffect(() => {
    formValue?.duration&&createTimeSlot(formValue?.duration);
  }, [formValue])


  const createTimeSlot=(interval)=>{
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
  const totalMinutes = startTime + i * interval;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
});

console.log(slots)
setTimeSlots(slots); 
}

  return (
    <div className="p-5 py-5 shadow-lg m-5 border-t-8">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting info */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-3xl">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {formValue?.duration ? formValue?.duration : "Duration"}{" "}
              Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {formValue?.locationType
                ? formValue?.locationType
                : "Location Type"}{" "}
              Meeting
            </h2>
            <Link
              href={formValue?.locationUrl ? formValue?.locationUrl : "#"}
              className="text-primary"
            >
              {formValue?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time and date info */}

        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(date) => date <= new Date()}
            />
          </div>
          <div className="flex flex-col w-full overflow-auto gap-4 p-5">
            <Button>Slot</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
