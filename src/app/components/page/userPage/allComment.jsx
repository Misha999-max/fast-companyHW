import React from "react";
import PropTypes from "prop-types";
import Comment from "../../ui/comments/comment";

const AllComment = ({ comments, handleDelteComment }) => {
    return (
        <>
            {comments &&
                comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        {...comment}
                        handleDelteComment={handleDelteComment}
                    />
                ))}
        </>
    );
};

AllComment.propTypes = {
    comments: PropTypes.array,
    handleDelteComment: PropTypes.func
};

export default AllComment;
