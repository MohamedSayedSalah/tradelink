import React, {useEffect, useRef, useState} from 'react'
import {DatePicker, SubmitButtons, Counter, Slots, Alert} from "@components/rhf";
import {useForm} from "react-hook-form";
import {ForumContainer} from '@containers/forum_container'
import {axios} from '@helpers/axios'
import tradelinkImg from "@images/tradelink.jpeg"
import PubSub from 'pubsub-js';

export const Home = (props) => {
    const [slots, setSlots] = useState([])
    const [date, setDate] = useState(new Date())
    const [duration, setDuration] = useState(10)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({text: '', state: false})



    const {
        handleSubmit,
        register,
        setValue,
        formState: {errors},
    } = useForm()
    const formRef = useRef(null)


    useEffect(() => {
        if (duration > 0) {
            availableSlots()
        }
    }, [date, duration])


    const handleError = (e)=>{
        setError({state: true, text: e})
        setTimeout(()=>{
            setError({state: false, text: ''})
        }, 5000)
    }


    const availableSlots = () => {
        axios({
            method: 'get',
            url: '/available_slots',
            params: {duration: duration, date: date},
        }).then((res) => {
            setSlots(res.data)
        }).catch((e) => {
            handleError('something went wrong')
        })
    }


    const onSubmit = (data) => {

        axios.post('/slot', {...data}).then((res) => {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        }).catch((e) => {
            setTimeout(() => { document.getElementById('root').scrollIntoView({ behavior: "smooth" }) }, 500)
            handleError('you have to pick a slot first')
        })
    }
    const subscribeMethod = (topic, msg) => {
        availableSlots()
    }
    PubSub.subscribeOnce('slots', subscribeMethod);

    useEffect(() => {
        PubSub.unsubscribe('slots')
    }, [duration, date])


    return <div className={"main-container"}>
        {success && <Alert type='success' text={'your slot is booked successfully'}/>}
        {error.state && <Alert type='danger' text={error.text}/>}

        <ForumContainer
            formRef={formRef}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="bg-white ">
                <img src={tradelinkImg} className={'inline'}/>
                <div className="w-full flex flex-col justify-between">
                    <main className="max-w-full  flex relative overflow-y-hidden">
                        <div
                            className="h-full   m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
                            <DatePicker setDate={setDate}/>
                            <Counter register={register}
                                     name={'slot[duration]'}
                                     counter={duration}
                                     setCounter={setDuration}
                            />
                        </div>


                        <Slots slots={slots} register={register} setValue={setValue} confirmed={success}/>


                    </main>
                </div>

                <SubmitButtons
                    handleSubmit={handleSubmit}
                    nextText={'Book'}
                    onSubmit={onSubmit}
                />
            </div>

        </ForumContainer>
    </div>
}
