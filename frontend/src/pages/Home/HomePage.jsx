import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    const Navigate = useNavigate()

    useEffect(() => {
        checkAuth()
    },[])

    const checkAuth = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/check-auth", {
                withCredentials: true
            }).then(response => {
                console.log(response);
                if (response.data.user && response.data.islogedIn) {
                    Navigate('/user-panel/user-dashboard')
                    return
                }
                if (response.data.admin && response.data.islogedIn) {
                    Navigate('/admin-panel/admin-dashboard')
                    return
                }
            })
        } catch(err) {
            console.log(err);
            Navigate('/home')
        }
    }

    return (
        <></>
    )
}

export default HomePage