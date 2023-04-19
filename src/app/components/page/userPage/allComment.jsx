import React, { useEffect, useState } from "react";
import api from "../../../api";
const AllComment = () => {
    const [comments, setComments] = useState();
    useEffect(() => {
        if (localStorage.getItem("comments")) {
            const comments = localStorage.getItem("comments");
            const result = JSON.parse(comments);
            setComments(result);
        }
    }, []);
    const getNameUser = (id) => {
        let name = "";
        api.users.getById(id).then((user) => {
            console.log(user.name);
            name = user.name;
        });
        console.log(name);
        return name;
    };

    console.log(getNameUser("67rdca3eeb7f6fgeed471815"));
    return (
        <>
            {comments &&
                comments.map((comment) => (
                    <div className="bg-light card-body  mb-3" key={comment._id}>
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-start ">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1 ">
                                                    <span>
                                                        {undefined &&
                                                            getNameUser(
                                                                comment.userId
                                                            )}
                                                    </span>
                                                    <span className="small">
                                                        Published Time
                                                    </span>
                                                </p>
                                                <button className="btn btn-sm text-primary d-flex align-items-center">
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <p className="small mb-0">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default AllComment;
