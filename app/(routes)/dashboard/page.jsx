"use client";
import React, { useEffect, useState } from "react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";

const Dashboard = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setlLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setlLoading(false);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setlLoading(false);
      router.replace("/create-business");
    }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return <div><MeetingType/></div>;
};

export default Dashboard;
