'use client'

import styles from './navbartop.module.scss'
import ShowMonth from './ShowMonth'
import Image from "next/image"
import Toggle from 'react-toggle'
import "./toggle.scss"
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { frameContext as fc } from './Frame'
import iconZoom from '../public/iconFullscreen.svg'
import dayjs from 'dayjs'
import React from 'react'
import UserCircle from './components/UserCircle'


export default function NavbarTop(props: {
    datesRange : {
        state: string[],
        setState: React.Dispatch<SetStateAction<string[]>>
    }
}) {

    const frameContext = useContext(fc)
    const isZoomed = frameContext?.zoomContext.state
    const datesRefs = [React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>()]
    const {datesRange} = props
    
    useEffect(()=> {

        datesRefs.forEach((dateRef, i) => {
            if (dateRef.current) {
                dateRef.current.value = datesRange.state[i]
            }
        })

    }, [datesRange])

    useEffect(()=> {
        if (frameContext?.eventSelectionContext.state.selected) {
            frameContext.eventSelectionContext.state.eventData?.thisRef.current?.scrollIntoView({
                block: 'center'
            })
        }
    }, [isZoomed])

    return (

        <>  
            <div className={styles.middleContainer}>

                <div style={{width: '340px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>

                    <form onSubmit={(e)=>{e.preventDefault()}} style={{
                        height: '32px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '6px'
                    }}>
                        
                        <input type="date" name="" id="" ref={datesRefs[0]} min={dayjs().subtract(3, 'month').format('YYYY-MM-DD')} defaultValue={datesRange.state[0]} max={dayjs().add(3, 'month').subtract(1, 'week').format('YYYY-MM-DD')} onBlur={(e) => handleDate(e, 0)} onKeyDown={(e) => handleDateEnter(e, 0)} className={styles.dateInput}/>

                        <span style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontWeight: '800'
                        }}>{' à '}</span>

                        <input type="date" name="" id="" ref={datesRefs[1]} min={dayjs(datesRange.state[0]).add(1, 'week').format('YYYY-MM-DD')} max={dayjs().add(3, 'month').format('YYYY-MM-DD')} defaultValue={datesRange.state[1]} onBlur={(e) => handleDate(e, 1)} onKeyDown={(e) => handleDateEnter(e, 1)} className={styles.dateInput}/>


                        <button className={styles.undoButton} onClick={(e) => handleUndoDateChanges(e)}>
                            <Image  alt='' src={'/iconRefresh.svg'} width={16} height={16}></Image>
                        </button>
                        
                    </form>

                </div>

                <div style={{width: '200px', display: 'flex', justifyContent: 'center'}}>
                    <ShowMonth/>
                </div>
                
                <span style={{width: '340px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <Toggle 

                        icons={false}

                        onChange={(e) => {frameContext?.zoomContext.setState(e.currentTarget.checked)}}

                    ></Toggle>
                    <Image alt='' style={{filter: 'invert(30%)'}} className={styles.icons} src={iconZoom} width={24} height={24}></Image>
                </span>

            </div>

            <div className={styles.navbarTop}>
                <UserCircle/>
                <span className={styles.logoPWD}>power<span>diamond</span></span>
            </div>

        </>

    )




    function handleDate(event : React.FormEvent<HTMLInputElement>, index: number) {

        const value = event.currentTarget.value;

        if (new Date(value + ' 00:00:00').toLocaleDateString() == 'Invalid Date') {
            return
        }

        index == 0?
            datesRange.setState(prev => [value, prev[1]])
        :
            datesRange.setState(prev => [prev[0], value])
    }

    function handleDateEnter(event : React.KeyboardEvent<HTMLInputElement>, index: number) {

        if (event.key == 'Enter') {

            
            const value = event.currentTarget.value;
            
            if (new Date(value + ' 00:00:00').toLocaleDateString() == 'Invalid Date') {
                return
            }

            index == 0?
                datesRange.setState(prev => [value, prev[1]])
            :
                datesRange.setState(prev => [prev[0], value])             

        }

    }

    function handleUndoDateChanges(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        e.preventDefault()

        datesRange.setState([dayjs().format('YYYY-MM-DD'), dayjs().add(84, 'day').format('YYYY-MM-DD')])


    }
}



  
