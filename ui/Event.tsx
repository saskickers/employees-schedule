'use client';

import iconPersonWorker from '../public/iconPersonWorker.svg'
import iconVehicle from '../public/iconVehicle.svg'
import Image from 'next/image';
import style from './event.module.scss'

import React, {  useContext, useEffect, useRef, useState } from 'react';
import { frameContext, frontEndEventos } from './Frame';
import { useInView } from 'framer-motion';


export default function (props: { event: frontEndEventos }) {

    const selectionContext = useContext(frameContext)?.eventSelectionContext
    const choosenView = useContext(frameContext)?.choosenViewContext
    const addEventFormData = useContext(frameContext)?.formContext

    const [styles, setStyles] = useState({})



    let employeesArr = String(props.event?.funcionarios).split(',') 


    
    useEffect(() => {

        if (selectionContext?.state.eventData?.id != props.event.id) {

            return setStyles({}) 

        } else if (choosenView?.state == 'Calendar' ) {
            
            return setStyles({
                outline: '3px solid grey',
            })
        }


    }, [selectionContext?.state])

    return (
        <div className={style.eventDiv} style={{
            ...styles,
            backgroundColor: props.event.propColor
        }} onClick={() => {selectEvent()}} onDoubleClick={() => {handleDoubleClick()}}>
            <div className={style.eventID}>
                <span>{props.event?.proposta}</span>
            </div>
            <span className={style.eventTitle}>{props.event?.titulo}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={style.eventCoord}>
                    <Image style={{ marginRight: '6px' }} src={iconPersonWorker} alt='icone de pessoa'></Image>
                    {props.event?.responsavel}
                </span>
                <span className={style.eventCoord}>
                    <Image style={{ marginRight: '6px' }} src={iconVehicle} alt='icone de veículo'></Image>
                    {props.event?.veiculo}
                </span>
            </div>
            <span className={style.eventDesc}>{props.event?.desc}</span>
            <div className={style.eventUL}>
                {employeesArr.map((item) => {
                    return <li>
                        <span className={style.eventDesc}>{item}</span>
                    </li>
                })}
            </div>
        </div>
    )

    function selectEvent() {


        console.log('SELECTED EVENT:')
        console.log(props)
        console.log(`SENDED DATE ${new Date(props.event.dataEvento as string).toISOString().slice(0, 10)}`)

        selectionContext?.setState({
            selected: true,
            eventData: {
                ...props.event,
                funcionarios: props.event.funcionarios,
                dataEvento: new Date(props.event.dataEvento as string).toISOString().slice(0, 10)
            }
        })

    }

    function handleDoubleClick() {

        console.log(props)

        if (selectionContext?.state.eventData) {

            addEventFormData?.insertFormInputs({
              titulo: selectionContext.state.eventData.titulo,
              responsavel: selectionContext.state.eventData.responsavel,
              dataEvento: selectionContext.state.eventData.dataEvento,
              veiculo: selectionContext.state.eventData.veiculo,
              funcionarios: selectionContext.state.eventData?.funcionarios,
              desc: selectionContext.state.eventData?.desc,
              id: selectionContext.state.eventData.id,
              propColor: selectionContext.state.eventData.propColor,
              proposta: selectionContext.state.eventData.proposta
            })
        }

        choosenView?.setState('EditEvent')
        
    }
}