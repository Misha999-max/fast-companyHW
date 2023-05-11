import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities, qualitiesArr }) => {
    console.log(qualities);
    const arrQualities = qualities.map((qua) =>
        qualitiesArr.filter((item) => item._id === qua)
    );
    console.log(qualitiesArr);
    return (
        <>
            {arrQualities.map((qual) => (
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
