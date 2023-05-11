import React, { useContext, useEffect, useRef, useState } from "react";
import qualityService from "../services/qualities.services";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitesContex = React.createContext();

export const useQualites = () => {
    return useContext(QualitesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const prevState = useRef();
    useEffect(() => {
        const getQualitiesId = async () => {
            try {
                const qualies = await qualityService.get();
                setQualities(qualies.content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualitiesId();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setQualities(prevState.current);
    }
    console.log(qualities);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <QualitesContex.Provider
            value={{
                qualities
            }}
        >
            {!loading ? children : <span>Loading...</span>}
        </QualitesContex.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
