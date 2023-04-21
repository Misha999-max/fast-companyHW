import React from "react";
import PropTypes from "prop-types";

const AllComment = ({ comments, handleDelteComment }) => {
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
                                                        {comment.name + "-"}
                                                    </span>
                                                    <span className="small">
                                                        {comment.created_at}
                                                    </span>
                                                </p>
                                                <button
                                                    className="btn btn-sm text-primary d-flex align-items-center"
                                                    onClick={() =>
                                                        handleDelteComment(
                                                            comment._id
                                                        )
                                                    }
                                                >
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

AllComment.propTypes = {
    comments: PropTypes.object,
    handleDelteComment: PropTypes.func
};

export default AllComment;
