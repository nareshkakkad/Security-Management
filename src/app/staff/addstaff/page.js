"use client"
import { useState } from "react";
import BasicDetails from "./basicDetails/page";
import HrDetails from "./hrDetails/page";

export default function AddStaff() {
    const [step ,setStep] = useState(0)

    const onStepChanges = (step) => {
        setStep(step)
    }
return(
    <>
    {step == 0 &&
    <BasicDetails/>
    }
    {step == 1 &&
    <HrDetails/>
    }
    </>
)

}