import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/Header/Header";
import Stepper from '../../components/EDepositAccountStepper/Stepper';
import StepperControl from '../../components/EDepositAccountStepper/StepperControl';
import Checking from "../../components/EDepositAccountStepper/steps/Checking";
import Initialization from "../../components/EDepositAccountStepper/steps/Initialization";
import Confirmation from "../../components/EDepositAccountStepper/steps/Confirmation";
import Reject from "../../components/EDepositAccountStepper/steps/Reject";
import { Result } from "../../components/EDepositAccountStepper/steps/Result";
import uitPattern from '../../assets/icons/uitPattern.svg'
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EDepositAccount = () => {
    const navigate = useNavigate()

    const checkingRef = useRef();
    const initializationRef = useRef();
    const confirmationRef = useRef();
    const [currentStep, setCurrentStep] = useState(0);

    const isTransactionSuccess = useSelector((state) => state.eDepositAccount.isTransactionSuccess)

    const handleInitNewTransaction = () => {
        setCurrentStep(0);
    };

    const steps = [
        { description: "Tìm kiếm" },
        { description: "Khởi tạo" },
        { description: "Xác nhận" },
        { description: "Kết quả" }
    ];

    const displayStep = (steps) => {
        switch (steps) {
            case 0:
                return <Checking ref={checkingRef} />
            case 1:
                return <Initialization ref={initializationRef} />
            case 2:
                return <Confirmation ref={confirmationRef} />
            case 3:
                return <Reject handleInitNewTransaction={handleInitNewTransaction} />
            case 4:
                return <Result handleInitNewTransaction={handleInitNewTransaction} />
        }
    }

    const createTransaction = async () => {
        try {
            await confirmationRef.current.createTransaction();

        } catch (error) {
            console.error("Error creating transaction:", error);
            // handle error
        }
    }

    const handleClick = async (direction) => {

        let newStep = currentStep;

        if (newStep === 0) {
            let error = checkingRef.current.validateInputs();
            if (error) {
                return;
            }
        } else if (newStep === 1 && direction === "next") {
            let error = initializationRef.current.validateInputs();
            if (error) {
                return;
            }
        } else if (newStep === 2 && direction === "next") {
            const error = confirmationRef.current.validateCapcha();
            if (error) {
                return;
            }
            try {
                await createTransaction();
            } catch (error) {
                console.error("Error creating transaction:", error);
                // handle error
                return;
            }
            return;
        }
        direction === "next" ? newStep++ : newStep--;

        // if (newStep === 3) newStep++;
        //check if steps are within bounds
        newStep >= 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    useEffect(() => {
        if (isTransactionSuccess === true) {
            setCurrentStep(4);
            return;
        }
        if (isTransactionSuccess === false) {
            setCurrentStep(3);
            return;
        }
    }, [isTransactionSuccess])

    return (
        <div className="grid grid-cols-11 grid-flow-col-dense ">
            <div className="col-start-1 col-span-2">
                <UserInfo />
            </div>
            <div className="col-end-12 col-span-9 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 z-20">
                    <Header />
                </div>

                {/* article */}
                <div className="w-auto overflow-auto flex flex-col">
                    <img src={uitPattern} alt="UIT-Pattern" className="fixed contrast-50 w-1/2 self-center mt-14" />

                    <div className="bg-[#40494C]/[70%] h-auto flex flex-col pt-[72px] z-10 min-h-screen">
                        <div className="w-1/2 self-center">
                            {/* Title */}
                            <div className="w-full">
                                <h1 className="mt-20 text-[40px]
                                            text-white font-bold  ">
                                    Lập phiếu nộp tiền mặt
                                </h1>
                                <div className="2xl:mt-[23px] text-[20px]
                                            text-[#B0B5B6] flex flex-row">
                                    <span onClick={() => navigate('../home')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">Trang chủ </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <span onClick={() => navigate('../home/service-group')}
                                        className="hover:cursor-pointer relative inline before:bg-[#72BF00] before:absolute before:-bottom-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"> Dịch vụ </span>
                                    <p>&nbsp;&gt;&nbsp;</p>
                                    <p className="text-[#72BF00] hover:cursor-auto"> Lập phiếu nộp tiền mặt </p>
                                </div>
                            </div>

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
                                (currentStep !== steps.length && currentStep !== steps.length - 1) &&
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

export default EDepositAccount;