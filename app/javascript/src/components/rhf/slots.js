import "./slots.custome.scss"
import React, {useEffect, useState} from 'react'
import {BiTimeFive} from 'react-icons/bi'

export const Slots = ({slots, register, setValue, confirmed}) => {

    const [slotIndex, setSlotIndex] = useState(null)
    useEffect(()=>{
        setSlotIndex(null)
    },[confirmed])

    return <div className={'picker'}>

        <div className={"flex p-2 mb-4 mt-4"}>
            <BiTimeFive size={30}/>
            <span className={'maintext ml-2'}>Time </span>
        </div>


        <div className={"timePicker"}>
            <ul>
                {slots.map((slot, i) => {
                    return <li
                        key={slot.start_date + '-' + i}
                        style={{background: slotIndex === i ? '#00b1f7' : (slot.available ? 'white' : '#e6e9ed')}}
                        className={`mx-2 my-2 px-3 py-2  ${slot.available ? 'cursor-pointer hover:drop-shadow-lg' : ''} rounded
                        ${slotIndex === i ? 'border-dashed' : 'border'}  border-gray-200`}
                        onClick={() => {
                            if (slot.available) {
                                setSlotIndex(i)
                                setValue("slot[start_date]", slots[i].start_date)
                                setValue("slot[end_date]", slots[i].end_date)
                            }
                        }}
                    >

                        <label style={{color: slot.available ? slotIndex === i ? 'white' : 'black' : '#b8bcc1'}}
                               className={`font-thin `}>
                            <span
                                className={`${slot.available ? 'cursor-pointer' : ''}`}>{slot.start_date} - {slot.end_date}</span>
                        </label>
                    </li>
                })}
            </ul>
        </div>


        {slotIndex != null && <input type="hidden"
                                     name="slot[start_date]"
                                     {...register("slot[start_date]")}
                                     value={slots[slotIndex].start_date}
        />}

        {slotIndex != null && <input type="hidden"
                                     name="slot[end_date]"
                                     {...register("slot[end_date]")}
                                     value={slots[slotIndex].end_date}
        />}
    </div>

}