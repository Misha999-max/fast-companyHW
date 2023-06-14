import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const { currentUser } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    const [professionss, setProfession] = useState([]);
    const [qualitiess, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        const profById = professions.filter((prof) => prof._id === id);
        return profById;
    };

    useEffect(() => {
        const qualitiesList = qualities.map((optionName) => ({
            value: optionName._id,
            label: optionName.name,
            color: optionName.color
        }));
        setQualities(qualitiesList);

        const professionsList = professions.map((professionName) => ({
            label: professionName.name,
            value: professionName._id
        }));
        setProfession(professionsList);
    }, [qualities, professions]);

    const getQualities = (elements) => {
        const qualitiesArray = [];
        elements.forEach((quaId) => {
            qualities.forEach((qual) => {
                console.log(qual);
                if (qual._id === quaId) {
                    qualitiesArray.push(qual);
                }
            });
        });
        // for (const elem of elements) {
        //     console.log(elem);
        //     for (const quality in qualities) {
        //         if (elem.value === qualities[quality].value) {
        //             qualitiesArray.push({
        //                 _id: qualities[quality].value,
        //                 name: qualities[quality].label,
        //                 color: qualities[quality].color
        //             });
        //         }
        //     }
        // }
        return qualitiesArray;
    };

    useEffect(() => {
        setData({
            name: currentUser.name || "",
            email: currentUser.email || "",
            profession: getProfessionById(currentUser.profession) || [],
            sex: currentUser.sex || "male",
            qualities: getQualities(currentUser.qualities) || []
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const isValid = validate();
        // if (!isValid) return;
        // const { profession, qualities } = data;
        // httpService.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`));
        console.log({
            ...data,
            profession: getProfessionById(data.profession)
        });
    };
    // const transformData = (data) => {
    //     return data.map((qual) => ({ label: qual.name, value: qual._id }));
    // };

    // useEffect(() => {
    //     setIsLoading(true);
    //     api.users.getById(userId).then(({ profession, qualities, ...data }) =>
    //         setData((prevState) => ({
    //             ...prevState,
    //             ...data,
    //             qualities: transformData(qualities),
    //             profession: profession._id
    //         }))
    //     );
    //     api.professions.fetchAll().then((data) => {
    //         const professionsList = Object.keys(data).map((professionName) => ({
    //             label: data[professionName].name,
    //             value: data[professionName]._id
    //         }));
    //         setProfession(professionsList);
    //     });
    //     api.qualities.fetchAll().then((data) => {
    //         const qualitiesList = Object.keys(data).map((optionName) => ({
    //             value: data[optionName]._id,
    //             label: data[optionName].name,
    //             color: data[optionName].color
    //         }));
    //         setQualities(qualitiesList);
    //     });
    // }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionss}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiess}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
