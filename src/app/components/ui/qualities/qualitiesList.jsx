import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            <h5 className="card-title">
                <span>Qualities</span>
            </h5>
            <p className="card-title">
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </p>
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
