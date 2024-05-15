import React, { useEffect, useState, useRef } from "react"
import { classNames } from "../classNames/classNames";

function Stepper({ steps, currentStep }) {

    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();
    const updateStep = (stepNumber, steps) => {
        //
        const newSteps = [...steps];
        let count = 0;
        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }
        return newSteps;
    }

    useEffect(() => {
        // create object
        const stepsState = steps.map((step, index) => ({
            description: step.description,
            completed: false,
            highlighted: index === 0,
            selected: index === 0,
        }));
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, index) => {
        return (
            <div key={index}
                className={index !== newStep.length - 1 ? "w-full flex items-center" : "flex items-center"}>
                <div className="relative flex flex-col items-center text-[#B4C8C3] font-[500] text-xl ">
                    {/* Display number */}
                    <div className={classNames(" rounded-full transition duration-500 ease-in-out border-2 h-10 w-10 flex items-center justify-center py-3 ",
                        step.selected ?
                            "border-[#72BF00] text-white bg-[#72BF00]"
                            : "border-[#92A3A2] bg-[#234545]")}>
                        {
                            step.completed ? (
                                <span className="text-white font-[500] text-xl">&#10003;</span>
                            ) : (index + 1)
                        }
                    </div>
                    {/* Display  description*/}
                    <div className={classNames(" absolute top-0 text-center mt-10 w-32 text-[15px]  font-medium",
                        step.highlighted ? "text-white" : "text-[#B4C8C3]")}>
                        {step.description}
                    </div>
                </div>
                {/* Display number */}
                <div className={classNames("flex-auto border-t-2 transition duration-500 ease-in-out",
                    step.completed ?
                        "border-[#72BF00]"
                        : "border-[#000000]")}></div>
            </div>
        )
    })

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    )
}

export default Stepper