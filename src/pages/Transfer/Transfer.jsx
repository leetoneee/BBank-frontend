import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Stepper from '../../components/TransferStepper/Stepper';
import StepperControl from '../../components/TransferStepper/StepperControl';
import Initialization from "../../components/TransferStepper/steps/Initialization";
import Confirmation from "../../components/TransferStepper/steps/Confirmation";
import Authenticity from "../../components/TransferStepper/steps/Authenticity";
import Result from "../../components/TransferStepper/steps/Result";
import { useState } from "react";

const Transfer = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { description: "Khởi tạo" },
        { description: "Xác nhận" },
        { description: "Xác thực" },
        { description: "Kết quả" }
    ];

    const displayStep = (steps) => {
        switch (steps) {
            case 0:
                return <Initialization />
            case 1:
                return <Confirmation />
            case 2:
                return <Authenticity />
            case 4:
                return <Result />
        }
    }

    const handleClick = (direction) => {


        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;

        if (newStep === 3) newStep++;
        //check if steps are within bounds
        newStep >= 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
            <div className="col-start-1 col-span-2 z-50">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-40">
                    <Header />
                </div>

                {/* article */}
                <div className="w-auto bg-uit-pattern bg-center bg-no-repeat bg-scroll overflow-auto">
                    <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px]">
                        <div className="w-1/2 self-center">
                            {/* Stepper */}
                            <div className="container horizontal mt-5">
                                <Stepper
                                    steps={steps}
                                    currentStep={currentStep} />
                            </div>

                            {/* Display Component */}
                            <div className="my-10">
                                {displayStep(currentStep)}
                            </div>

                            {/* Navigation controls */}
                            {
                                currentStep !== steps.length &&
                                <StepperControl
                                    handleClick={handleClick}
                                    currentStep={currentStep}
                                    steps={steps} />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Transfer;