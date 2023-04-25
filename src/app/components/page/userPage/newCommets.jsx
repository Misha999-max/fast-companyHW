import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textAreaFild";

const initialData = { userId: "", content: "" };

const Newcommets = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    const [data, setData] = useState(initialData);

    const transformNames = (data) => {
        return data.map((item) => ({
            ...item,
            value: item._id,
            label: item.name
        }));
    };

    const clearFormText = () => {
        setData(initialData);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            console.log(data);
            setUsers(transformNames(data));
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        onSubmit(data);
        clearFormText();
    };

    return (
        <>
            {users && (
                <div className="card mb-2 p-2">
                    <div className="card-body ">New comment</div>
                    <form onSubmit={handleAddComment}>
                        <SelectField
                            defaultOption="Choose..."
                            options={users}
                            name="userId"
                            onChange={handleChange}
                            value={data.userId}
                        />

                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label mt-2"
                            >
                                Напишите комментарий:
                            </label>
                            <TextAreaField
                                onChange={handleChange}
                                value={data.content}
                                name="content"
                                label="Введите сообщение"
                            />

                            <button className="btn btn-primary mt-3">
                                Отправить комментарий
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

Newcommets.propTypes = {
    userId: PropTypes.string,
    onSubmit: PropTypes.func
};

export default Newcommets;
