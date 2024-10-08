import { useState } from "react"
import "./Home.css"
import MUIDrawer from "../../components/Sidebar"

const Home = () => {
    const [is_drawer_open, set_is_drawer_open] = useState(false)
    return (
        <>
            <MUIDrawer open={is_drawer_open} setOpen={set_is_drawer_open}>hi</MUIDrawer>
            <div className="home"></div>
        </>
    )
}

export default Home