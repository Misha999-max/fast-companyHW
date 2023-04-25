import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import Newcommets from "../../page/userPage/newCommets";
import AllComment from "../../page/userPage/allComment";
import { orderBy } from "lodash";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    console.log(comments);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((comments) => {
            setComments(comments);
        });
    }, []);

    const handleRemove = (id) => {
        api.comments.remove(id).then(() => {
            setComments((prevState) =>
                prevState.filter((comment) => {
                    return comment._id !== id;
                })
            );
        });
    };

    const handleSubmit = (data) => {
        api.comments.add({ ...data, pageId: userId }).then((data) => {
            setComments((prevState) => {
                return [...prevState, data];
            });
        });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="col-md-8 p-2">
            <div className="card mb-3">
                <Newcommets userId={userId} onSubmit={handleSubmit} />
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <AllComment
                        userId={userId}
                        comments={sortedComments}
                        handleDelteComment={handleRemove}
                    />
                </div>
            </div>
        </div>
    );
};

export default Comments;
