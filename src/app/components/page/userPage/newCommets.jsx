import React, { useEffect, useState } from "react";
import api from "../../../api";

const Newcommets = () => {
    const [names, setNames] = useState();
    const [user, setUser] = useState({
        name: "",
        userId: ""
    });
    const [textArea, setTextArea] = useState("");

    useEffect(() => {
        api.users.fetchAll().then((data) => setNames(data));
    }, []);

    const handleChange = ({ target }) => {
        setUser({ userId: target.value, name: target.textContent });
    };
    const handleChangeArea = (value) => {
        setTextArea(value);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        api.comments.add({
            userId: user.userId,
            name: user.name,
            pageId: user.userId,
            content: textArea
        });
        setTextArea("");
    };

    return (
        <div className="card mb-2 p-2">
            <div className="card-body ">New comment</div>
            <form>
                <select
                    className="form-select mt-6"
                    name="userId"
                    onChange={handleChange}
                >
                    <option value="ADD USER" selected>
                        ADD USER
                    </option>
                    {names &&
                        names.map((elem) => {
                            return (
                                <option
                                    defaultValue={elem.name}
                                    value={elem._id}
                                    key={elem._id}
                                >
                                    {elem.name}
                                </option>
                            );
                        })}
                </select>

                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label mt-2"
                    >
                        Напишите комментарий:
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="content"
                        onChange={(e) => handleChangeArea(e.target.value)}
                        value={textArea}
                    ></textarea>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleAddComment}
                    >
                        Отправить комментарий
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Newcommets;
