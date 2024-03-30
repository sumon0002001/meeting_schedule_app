"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LocationOption from "@/app/_utils/LocationOption";
import ThemeOptions from "@/app/_utils/ThemeOptions";

const MeetingForm = () => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  return (
    <div className="p-8">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          onChange={(event) => setEventName(event.target.value)}
        />
        <h2 className="font-bold">Duration *</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              Duration Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Duration</DropdownMenuLabel>
            <DropdownMenuItem>15 min</DropdownMenuItem>
            <DropdownMenuItem>30 min</DropdownMenuItem>
            <DropdownMenuItem>45 min</DropdownMenuItem>
            <DropdownMenuItem>1 hour</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2>Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col
            justify-center items-center 
            p-3 rounded-lg cursor-pointer
            hover:bg-blue-100 hover:border-primary
            ${location == option.name && "bg-blue-100 border-primary"}`}
              onClick={() => setLocation(option.name)}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {location && (
          <>
            <h2 className="font-bold">Add {location} Url</h2>
            <Input placeholder="Add Url" />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
      <Button className="w-full mt-9">Create</Button>
    </div>
  );
};

export default MeetingForm;
