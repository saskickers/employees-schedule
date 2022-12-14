import { motion } from "framer-motion"
import Image from "next/image"
import React, { StyleHTMLAttributes, useContext } from "react"
import { useEffect, useState } from "react"
import styles from './searchbutton.module.scss'
import { frameContext, frontEndEventos } from "../Frame"
import iconX from '../../public/iconXRED.svg'
import iconSearch from '../../public/iconSearch.svg'
import iconLoading from '../../public/iconLoading.svg'


export default function Searchbutton() {

    const [isHovering, setHovering] = useState(false)
    const [isClicked, setClicked] = useState(false)

    const [searchedEvents, setSearchedEvents] = useState<frontEndEventos[]>([])
    const [searchInput, setSearchInput] = useState<string>()
    const [searchIcon, setSearchIcon] = useState(iconSearch)
    const [selectedItem, setSelectedItem] = useState(0)

    const eventsCtx = useContext(frameContext)?.eventsContext
    const selectionCtx = useContext(frameContext)?.eventSelectionContext

    const thisRef = React.createRef<HTMLDivElement>()

    let iconStyle: React.CSSProperties = {}



    useEffect(() => {

        document.addEventListener('click', checkClickedOut)

        return () => {
            document.removeEventListener('click', checkClickedOut)
        }

    }, [])

    useEffect(() => {

        const searchDelayTO = delayInput(searchInput)

        return () => {

            clearTimeout(searchDelayTO)

        }

    }, [searchInput])

    useEffect(() => {

        if (searchedEvents.length > 0) {

            selectionCtx?.setState({
                selected: true,
                eventData: searchedEvents[selectedItem]
            })

            console.log(searchedEvents)

            setTimeout(() => {

                searchedEvents[selectedItem].thisRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })

            }, 200)

        }

    }, [selectedItem])

    useEffect(() => {

        if (searchedEvents.length > 0 && selectedItem == 0) {

            selectionCtx?.setState({
                selected: true,
                eventData: searchedEvents[0]
            })

            console.log(searchedEvents)

            setTimeout(() => {

                searchedEvents[0].thisRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })

            }, 200)

        } 

        return () => {
            setSelectedItem(0)
        }

    }, [searchedEvents])

    return (

        <motion.div className={styles.divSearch} ref={thisRef}

            onHoverStart={() => { setHovering(true) }}

            onHoverEnd={() => { isClicked ? '' : setHovering(false) }}

            onClick={() => { setClicked(true) }}

            animate={{ scale: [0, 1.05, 1] }}

            style={{

                width: isHovering ? 400 : 60

            }}


        >
            <motion.div style={{ width: '60px', height: '60px', minWidth: '60px', minHeight: '60px', transformOrigin: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }} animate={{
                rotate: searchIcon == iconLoading ? 360 : 0
            }}

                transition={{
                    repeat: searchIcon == iconLoading ? 1 : -1,
                    duration: searchIcon == iconLoading ? 1 : 0,

                }}

            >
                <Image className={styles.icons} width={40} height={40} src={searchIcon} alt='Recarregar' style={{
                    ...iconStyle,
                    filter: searchIcon == iconX ? '' : 'invert(50%)',
                    left: isHovering ? 4 : 10,
                    transform: isHovering ? 'scale(0.7)' : 'scale(1)'
                }} />
            </motion.div>


            {
                isHovering && <input className={styles.input} 
                
                    onKeyDown={e => handleEnter(e)}

                    onChange={(e) => { setSearchInput(e.currentTarget.value) }}

                    placeholder='Pesquisar TITULO ou PROPOSTA...'

                >

                </input>
            }

        </motion.div>
    )


    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {

            if (e.key == 'Enter') {

                e.preventDefault()

                console.log('asdasd')
    
                if (selectedItem + 1 >= searchedEvents.length) {
                    return setSelectedItem(0)
                }
    
                return setSelectedItem((prev) => prev+1)

            }
    }

    function checkClickedOut(e: any) {

        if (!thisRef.current) {
            return
        }

        if (!thisRef.current.contains(e.target)) {
            console.log('CLICOU FORA')
            setClicked(false)
            setHovering(false)
            setSearchedEvents([])
            setSearchIcon(iconSearch)
        } 
    }

    function delayInput(e?: string) {
        
        setSearchedEvents([])
        let searchedEventsBuffer : frontEndEventos[] = []

        if (!e) {
            setSearchIcon(iconSearch)
            return 
        }

        if (searchIcon != iconLoading) {
            setSearchIcon(iconLoading)
        }

        eventsCtx?.state!.map(item => {

            return item.eventos.filter( (evento) => {

                if (evento.proposta.toLowerCase().includes(e.toLowerCase()) || evento.titulo.toLowerCase().includes(e.toLowerCase())) {

                    searchedEventsBuffer.push(evento)
                    return true
                    
                }

                return false

            }).length > 0   

        })

        return setTimeout(() => {

                if (searchedEventsBuffer.length == 0) {
                    setSearchIcon(iconX)
                } else {
                    setSearchIcon(iconSearch)
                }
                
                setSearchedEvents(searchedEventsBuffer)
            }, 300)
        
    }

}