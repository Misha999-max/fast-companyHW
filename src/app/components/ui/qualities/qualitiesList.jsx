import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities, qualitiesArr }) => {
    const arr = [];
    qualities.forEach((elem) =>
        qualitiesArr.forEach((qual) => {
            if (elem === qual._id) arr.push(qual);
        })
    );
    console.log(arr);
    return (
        <>
            {arr.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array,
    qualitiesArr: PropTypes.array
};

export default QualitiesList;
