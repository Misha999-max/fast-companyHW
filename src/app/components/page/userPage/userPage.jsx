import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import UserCard from "./userCard";
import MeetingsCard from "./meetingsCard";
import Newcommets from "./newCommets";
import AllComment from "./allComment";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data);
        });
    }, [localStorage.getItem("comments")]);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    const handleUpdate = (comment) => {
        setComments(comment);
    };

    const handleDelteComment = (id) => {
        api.comments.remove(id);
        api.comments.fetchCommentsForUser(id).then((data) => {
            setComments(data);
        });
    };
    const handleChangeUser = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            prof={user.profession.name}
                            name={user.name}
                            handleClick={handleChangeUser}
                            rate={user.rate}
                        />
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <Qualities qualities={user.qualities} />
                            </div>
                        </div>
                        <MeetingsCard meets={user.completedMeetings} />

                        <button
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Все Пользователи
                        </button>
                    </div>
                    <div className="col-md-8 p-2">
                        <div className="card mb-3">
                            <Newcommets handleUpdate={handleUpdate} />
                            <div className="card-body ">
                                <h2>Comments</h2>
                                <hr />
                                <AllComment
                                    userId={userId}
                                    comments={comments}
                                    handleDelteComment={handleDelteComment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p className="loading">Loading...</p>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
