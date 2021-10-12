import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { logOut, selectAuth } from "../../store/auth";
import s from './style.module.css'
import BgImage from './../../Assets/bg3.jpg';

const User = () => {
    const userInfo = useSelector(selectAuth);
    const dispatch = useDispatch();
    const onLogoutClick = () => {
        dispatch(logOut());
    }
    return(
        <Layout title='User information: ' urlBg={BgImage}>
            <table className={s.wrap}>
                <thead>
                <tr><th align='left'>KEY</th><th align='left'>VALUE</th></tr>
                </thead>
                <tbody>
                {
                    Object.entries(userInfo.currentUser).map( (item, key) => (
                        <tr key={key}>
                            <td className={s.key}>{item[0]}</td><td>{JSON.stringify(item[1])}</td>
                        </tr>))
                }
                </tbody>
            </table>
            <button className={s.rightButton} onClick={onLogoutClick}>
                LOG OUT
            </button>
        </Layout>
    );
}

export default User;