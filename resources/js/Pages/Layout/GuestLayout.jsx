import React, { useState } from "react";
import NavBar from "../Components/NavBar";

export default function GuestLayout(props) {
  return (
    <div>
      <NavBar className="sticky top-0 z-30" />

      <div className="w-full bg-[url(../../public/hero.jpg)] bg-center bg-cover min-h-screen items-center flex place-content-center">
        <div className="bg-black fixed w-full h-full opacity-70"></div>
        {props.children}
      </div>
    </div>
  );
}
