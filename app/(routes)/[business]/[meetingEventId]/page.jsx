"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const SharedMeetingEvent = ({ params }) => {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, SetEventInfo] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMeetingEventDetails();
  }, []);

  const getMeetingEventDetails = async () => {
    setLoading(true);
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", params.business)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data());
    });
    const docRef = doc(db, "MeetingEvent", params?.meetingEventId);
    const result = await getDoc(docRef);
    SetEventInfo(result.data());

    setLoading(false);
  };

  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default SharedMeetingEvent;
