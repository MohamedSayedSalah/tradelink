import 'react-datepicker/dist/react-datepicker.css'
import './date_picker.custom.scss'
import {CgCalendarDates} from "react-icons/cg"
import React, { useState } from 'react'
import Datepicker from 'react-datepicker'


export const DatePicker = ({
                               className,
                               clearErrors,
                               defaultValue = new Date(),
                               errorName,
                               errors = {},
                               onChange,
                               setDate,
                               width,
                               ...props
                           }) => {
    const [current, setCurrent] = useState(defaultValue)


    return (
        <div className="flex flex-col mb-4 ml-8 date-picker-container">
            <div className={"flex p-2 mb-4"}>
                <CgCalendarDates size={30}/>
                <span className={'maintext ml-2'}>Date </span>
            </div>

            <Datepicker
                className={'block mt-1 rounded-sm border w-full border-gray-300  focus:border-secondary focus:ring-transparent form-input focus:border-1'}
                onChange={(date) => {
                    const offsetDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                    )
                    if (onChange) onChange(offsetDate)
                    if (clearErrors) clearErrors(errorName)
                    setCurrent(offsetDate)
                    setDate(offsetDate)
                }}
                inline
                selected={current}
                {...props}
            />

        </div>
    )
}
