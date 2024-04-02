"use client";
import DaysList from "@/app/_utils/DaysList";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState(
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Thursday: false,
    },
    {
      Friday: false,
    },
    {
      Saturday: false,
    }
  );

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const handleSaveData = async () => {
    console.log(daysAvailable, startTime, endTime);
    const 
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  checked={
                    daysAvailable && daysAvailable[item?.day]
                      ? daysAvailable[item?.day]
                      : false
                  }
                  onCheckedChange={(e) => console.log(e)}
                />{" "}
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input type="time" />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input type="time" />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSaveData}>
        Save
      </Button>
    </div>
  );
};

export default Availability;
