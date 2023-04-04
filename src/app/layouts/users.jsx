import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
const Users = () => {
    const { userId, edit } = useParams();
    console.log(userId);
    console.log(edit);
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
