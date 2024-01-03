import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from 'react'
import prisma from "@/lib/db";
import Events from '@/components/Events'
import Calendar from "@/components/Calender";
import IssueChart from "@/components/IssueChart";

export const metadata: Metadata = {
  title: 'AssessMe.Ai - Dashboard'
}

type Props = {}

const Dashboard = async (props: Props) => {
  const {userId} = auth();
  if(!userId) throw Error("userId undefined");
  const EveryAssessment = await prisma.profileInfo.findMany({where:{userId}});

  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-10 gap-8 p-4">
      <div className="flex flex-col gap-4">
        <Calendar EveryAssessment={EveryAssessment}/>
        <Charts Everyevent={Everyevent}/>
      </div>
      <div className="grid gap-4 place-content-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {EveryAssessment.map((note) => (
        <Events note={note} key={note.id} />
      ))}
      </div>
      
      {EveryAssessment.length === 0 && (
        <p className="col-span-full text-center text-white text-xl font-semibold">
          Let's start with your Interview Assessment.
        </p>
      )}
    </div>
  )
}

export default Dashboard