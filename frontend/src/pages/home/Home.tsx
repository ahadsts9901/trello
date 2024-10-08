import "./Home.css"
import Header from "../../components/header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../utils/core"
import { Button, CircularProgress, TextField } from "@mui/material"
import { IoIosAddCircleOutline } from "react-icons/io"
import AlertMui from "../../components/mui/AlertMui"
import { useNavigate } from "react-router-dom"

const Loader = () => <div className="loader-cont"><CircularProgress size={40} color="primary" /></div>

const AddBoardForm = ({ getBoards }: any) => {

    const [board_name, set_board_name] = useState("")
    const [is_loading, set_is_loading] = useState(false)
    const [error_message, set_error_message] = useState<null | string>(null)
    const [success_message, set_success_message] = useState<null | string>(null)

    const addBoard = async (e: any) => {
        e.preventDefault()
        if (!board_name || board_name?.trim() === "") return

        try {
            set_is_loading(true)

            await axios.post(`${baseUrl}/api/v1/boards`, {
                boardName: board_name
            }, { withCredentials: true })

            set_board_name("")
            set_is_loading(false)
            set_success_message("Board added successfully")
            getBoards()
            setTimeout(() => {
                set_success_message(null)
            }, 3000)

        } catch (error: any) {
            console.error(error)
            set_is_loading(false)
            set_error_message(error?.response?.data?.message)
            setTimeout(() => {
                set_error_message(null)
            }, 3000)
        }
    }

    return (
        <>
            {success_message && <AlertMui status="success" text={success_message} />}
            {error_message && <AlertMui status="error" text={error_message} />}
            <form className="add-board-form" onSubmit={addBoard}>
                <TextField id="outlined-basic" label="" value={board_name} variant="outlined" placeholder="Enter Board Name" onChange={(e: any) => set_board_name(e?.target?.value)} />
                <Button type="submit" color="primary" variant="contained" sx={{ padding: "0.8em 1.6em" }} disabled={is_loading}><IoIosAddCircleOutline style={{ width: "1.4em", height: "1.4em", marginRight: "0.4em" }} />Add</Button>
            </form>
        </>
    )
}

const SingleBoard = ({ data }: any) => {

    const navigate = useNavigate()

    return (
        <>
            <div className="single-board"
                style={{ backgroundImage: `url(${data?.backgroundImage})` }}
                onClick={() => navigate(`/board/${data?._id}`)}
            >
                <p>{data?.boardName}</p>
            </div>
        </>
    )
}

const Boards = ({ boards, getBoards }: any) => {
    return (
        <>
            <div className="boards-cont">
                <AddBoardForm getBoards={getBoards} />
                {boards?.map((board: any, i: number) => <SingleBoard key={i} data={board} />)}
            </div>
        </>
    )
}

const Home = () => {

    const [boards, set_boards] = useState([])
    const [is_loading, set_is_loading] = useState(false)

    useEffect(() => {
        getBoards()
    }, [])

    const getBoards = async () => {
        try {
            set_is_loading(true)
            const resp = await axios.get(`${baseUrl}/api/v1/boards`, { withCredentials: true })
            set_boards(resp?.data?.data)
            set_is_loading(false)
        } catch (error) {
            console.error(error)
            set_is_loading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="home">
                {
                    is_loading ? <Loader /> : <Boards boards={boards} getBoards={getBoards} />
                }
            </div>
        </>
    )
}

export default Home