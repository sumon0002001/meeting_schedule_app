import React from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { Calendar } from "@/components/ui/calendar";

const PreviewMeeting = ({ formValue }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
