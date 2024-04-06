import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, MapPin, CalendarCheck, Timer } from "lucide-react";
import Link from "next/link";
import UserFormInfo from "./UserFormInfo";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import { toast } from "sonner";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userNote, setUserNote] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo?.daysAvailable?.[day]) {
      setEnableTimeSlot(true);
      getPreviouseBooking();
    } else {
      setEnableTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(userEmail) === false) {
      toast("please enter valid email address");
      return;
    }
    const docId = Date.now().toString();
    await setDoc(doc(db, "ScheduledMeeting", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      formatedDate: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then((response) => {
      toast("Event scheduled successfully");
    });
  };

  /**
   * Used to Fetch Previous Booking for given event
   * @param {*} date_
   */

  const getPreviouseBooking = () => {
    alert("got booking");
  };

  return (
    <div
      className="p-5 py-5 shadow-lg m-5 border-t-8 mx-10 md:mx-25 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting info */}
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-3xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {eventInfo?.duration ? eventInfo?.duration : "Duration"}{" "}
              Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType
                ? eventInfo?.locationType
                : "Location Type"}{" "}
              Meeting
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}
            </h2>

            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}

            {/* <h2 className="flex gap-2">
              <Timer />
              {selectedTime}{" "}
            </h2> */}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time and date info */}

        {step === 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userName || !userEmail}
            onClick={handleScheduleEvent}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
