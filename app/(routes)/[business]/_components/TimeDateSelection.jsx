import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const TimeDateSelection = ({
  date,
  timeSlots,
  handleDateChange,

  enableTimeSlot,
  setSelectedTime,
}) => {
  return (
    <div className="md:col-span-2 flex px-4">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
        />
      </div>
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots?.map((timeSlot, index) => (
          <Button
            className="border-primary text-primary"
            variant="outline"
            disabled={!enableTimeSlot}
            onClick={() => setSelectedTime(timeSlot)}
          >
            {timeSlot}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeDateSelection;
