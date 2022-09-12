import React from 'react';
import {useGetElevatorsQuery, usePickupMutation, useStepMutation, useUpdateMutation} from "./app/api";
import {FaArrowAltCircleUp, FaArrowCircleDown} from "react-icons/fa";

function App() {

    const {data, isLoading} = useGetElevatorsQuery()

    const [update] = useUpdateMutation()
    const [pickup] = usePickupMutation()
    const [step] = useStepMutation()

    const buttons = [
        -1, 0, 1, 2, 3, 4
    ]

    if (isLoading) {
        return <p>Loading...</p>
    }

    function onUpdate(event) {
        event.preventDefault()

        if (/^-?[0-9]$/.test(event.target["current"].value) && /^-?[0-9]$/.test(event.target["target"].value)) {
            const id = Number(event.target["id"].value)
            const current = Number(event.target["current"].value)
            const target = Number(event.target["target"].value)

            if (current >= buttons[0] && current <= buttons[buttons.length - 1] && target >= buttons[0] && target <= buttons[buttons.length - 1]) {
                update({
                    id,
                    currentFloor: current,
                    targetFloor: target
                }).unwrap()
                    .then()
                    .catch()
            }
        }
    }

    return (
        <>
            <button
                onClick={() => {
                    step()
                }}
                className={"fixed top-0 w-full transition-colors hover:bg-blue-500 px-4 py-2 shadow-md bg-blue-400 text-gray-100"}>
                Simulate
            </button>

            <div className={"mt-12 flex flex-col"}>
                {
                    data.map(elevator => (
                        <div
                            key={elevator.id}
                            className={"flex my-2 bg-gray-50 rounded shadow w-[800px] mx-auto px-2 py-4"}
                        >
                            <div className={"flex flex-col w-[200px]"}>
                                <div
                                    className={"mb-2 shadow-md bg-gray-200 w-[50%] mx-auto flex justify-center items-center"}>
                                    <FaArrowAltCircleUp
                                        className={`${elevator.currentFloor < elevator.targetFloor ? 'text-red-700' : 'text-red-400'}`}/>
                                    <span className={"px-2 text-red-700"}>{elevator.targetFloor}</span>
                                    <FaArrowCircleDown
                                        className={`${elevator.currentFloor > elevator.targetFloor ? 'text-red-700' : 'text-red-400'}`}/>
                                </div>
                                <div className={"flex shadow-md"}>
                                    <div className={"w-[50%] h-[200px] border-gray-300 border bg-gray-200"}/>
                                    <div className={"w-[50%] h-[200px] border-gray-300 border bg-gray-200"}/>
                                </div>
                            </div>
                            <div
                                className={"gap-2 flex justify-center items-center flex-wrap h-[150px] my-auto w-full max-w-[200px] px-4 py-2 mx-4 rounded shadow-md bg-gray-100"}>
                                {
                                    buttons.map(button => (
                                        <div
                                            onClick={() => {
                                                pickup({
                                                    id: elevator.id,
                                                    targetFloor: button
                                                })
                                            }}
                                            key={button}
                                            className={`${button === elevator.currentFloor ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer hover:bg-red-400 transition-colors shadow-md text-gray-50 flex justify-center items-center w-[40px] h-[40px] rounded-[50%]`}
                                        >
                                            {button}
                                        </div>
                                    ))
                                }
                            </div>
                            <form onSubmit={onUpdate} className={"flex flex-col mx-4 my-auto"}>
                                <input
                                    defaultValue={elevator.id}
                                    id={"id"}
                                    hidden
                                />
                                <select
                                    defaultValue={""}
                                    id={"current"}
                                    className={"text-gray-500 px-4 py-2 rounded shadow-md my-2"}
                                    placeholder={"Current floor"}
                                >
                                    <option value={""} hidden disabled defaultValue>Current floor</option>
                                    {
                                        buttons.map(button => (
                                            <option key={`option ${button}`} value={button}>{button}</option>
                                        ))
                                    }
                                </select>
                                <select
                                    defaultValue={""}
                                    id={"target"}
                                    className={"text-gray-500 px-4 py-2 rounded shadow-md my-2"}
                                    placeholder={"Target floor"}
                                >
                                    <option value={""} hidden disabled defaultValue>Target floor</option>
                                    {
                                        buttons.map(button => (
                                            <option key={`option ${button}`} value={button}>{button}</option>
                                        ))
                                    }
                                </select>
                                <input
                                    value={"Update"}
                                    type={"submit"}
                                    className={"cursor-pointer my-2 transition-colors hover:bg-green-500 px-4 py-2 rounded shadow-md bg-green-400 text-gray-100"}
                                />
                            </form>
                        </div>
                    ))
                }
            </div>

        </>

    );
}

export default App;
