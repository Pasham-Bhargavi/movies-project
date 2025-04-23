import Slider from "../Carousel/Carousel"
import Loder from "../Spinner/Spinner"
import "../movieposters/movieposters"
import Movieposters from "../movieposters/movieposters"
import Navigationbar from "../nav/navigationbar"
import { useState, useEffect } from "react"

const Homepage = () => {
    const [load, setload] = useState(false)

    useEffect(() => {
        // Check if loader has been displayed before
        const loaderDisplayed = sessionStorage.getItem('loaderDisplayed')

        if (!loaderDisplayed) {
            setload(true)
            sessionStorage.setItem('loaderDisplayed', 'true')
            setTimeout(() => {
                setload(false)
            }, 5000)
        } else {
            setload(false)
        }
    }, [])

    return (
        <div className="homepage">
            {
                load ? 
                    <center><Loder /></center>
                : 
                    <div>
                        <Navigationbar />
                        <Slider />
                        <Movieposters />
                    </div>
            }
        </div>
    )
}

export default Homepage
