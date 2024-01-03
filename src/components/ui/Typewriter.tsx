"use client";
import { Bot, Rocket } from "lucide-react";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter 
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(`Skills`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Strengths`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Area Of Improvement`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Interview Etiquette`)
          .start();
      }}
    />
  );
};

export default TypewriterTitle;