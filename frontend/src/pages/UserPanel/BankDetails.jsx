import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import SideBar from "../../components/Sidebar/SideBar";
import DisplayBankDetails from '../UserPanel/DisplayBankDetails'
import LinkBankDetails from './LinkBankDetails'
import { useNavigate } from "react-router-dom";
import "./userPanelStyles/bankDetails.css"

const BankDetails = () => {

    const Navigate = useNavigate()

    const [isLinked, setIsLinked] = useState(false)

    const checkIsBankAccountLinked = async (req, res) => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/cibal", {
                withCredentials: true
            }).then(response => {
                console.log(response);
                if (response.data.bankAccount) {
                    setIsLinked(true)
                }
            })
        } catch (err) {
            console.log(err);
            Navigate('/')
            return
        }
    }

    useEffect(() => {
        checkIsBankAccountLinked()
    }, [])

    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: "flex" }}>
                <SideBar />

                <Container>
                    <div style={{ display: isLinked ? "block" : "none" }}>
                        <DisplayBankDetails />
                    </div>
                    <div style={{ display: !isLinked ? "block" : "none" }}>
                        <LinkBankDetails />
                    </div>
                </Container>

            </div>
        </>
    )
}

export default BankDetails 