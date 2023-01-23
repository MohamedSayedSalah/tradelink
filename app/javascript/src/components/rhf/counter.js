import React from 'react'
import "./counter.custom.scss"
export const Counter = ({
                     counter,
                     setCounter,
                 }) => {

    return <div className={"flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 justify-center"}>
        <button data-action="decrement"
                type="button"
                onClick={(e) => setCounter(counter - 1 >= 10 ? counter - 1 : 10)}
                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
            <span className="m-auto text-2xl font-thin">−</span>
        </button>

        <span className="outline-none focus:outline-none text-center
                                    bg-gray-300 font-semibold text-md hover:text-black focus:text-black
                                    md:text-basecursor-default flex items-center text-gray-700 outline-none">
            {counter}
        </span>


        <button data-action="increment"
                type="button"
                onClick={(e) => setCounter(counter + 1)}
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
            <span className="m-auto text-2xl font-thin">+</span>
        </button>
    </div>

}