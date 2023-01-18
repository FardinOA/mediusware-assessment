import React, { useState, useEffect } from "react";

import axios from "axios";
const Problem2 = ({}) => {
    const [showModal, setShowModal] = useState(false);
    const [showType, setShowType] = useState("");
    const [evenChecked, setEvenChecked] = useState(false);
    const [showData, setShowData] = useState([]);
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [contactDetails, setContactDetails] = useState({});

    useEffect(() => {
        const getAllContact = async () => {
            try {
                console.log("first");
                const { data } = await axios.get(
                    "https://contact.mediusware.com/api/contacts/"
                );

                setShowData([...data.results]);
            } catch (error) {
                console.log(error);
            }
            if (evenChecked) {
                let arr = showData.filter((ele) => ele.id % 2 == 0);
                setShowData([...arr]);
            }
        };

        const getUSContact = async () => {
            try {
                const { data } = await axios.get(
                    "https://contact.mediusware.com/api/country-contacts/United States/"
                );

                setShowData([...data.results]);
            } catch (error) {
                console.log(error);
            }

            if (evenChecked) {
                let arr = showData.filter((ele) => ele.id % 2 == 0);
                setShowData([...arr]);
            }
        };

        showType == "all" && getAllContact();
        showType == "us" && getUSContact();
    }, [showType, evenChecked]);

    const showHandeler = (val) => {
        setShowModal(true);
        setShowType(val);
        setShowContactDetails(false);
        setContactDetails({});
    };

    return (
        <div className="container vh-100 position-relative h-100">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        onClick={() => showHandeler("all")}
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                    >
                        All Contacts
                    </button>
                    <button
                        onClick={() => showHandeler("us")}
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                    >
                        US Contacts
                    </button>
                </div>
            </div>

            {/*  */}

            {showModal && (
                <div className="position-absolute   w-100 bg-success top-0   p-4">
                    <div>
                        <div className="">
                            <h1 className="">{showType} Contacts</h1>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between w-100">
                            <button
                                style={{
                                    border: "none",
                                    backgroundColor: "#46139f",
                                }}
                                onClick={() => setShowType("all")}
                            >
                                ALL Contacts
                            </button>
                            <button
                                style={{
                                    border: "none",
                                    backgroundColor: "#ff7f50",
                                }}
                                onClick={() => setShowType("us")}
                            >
                                US Contacts
                            </button>
                            <button onClick={() => setShowModal(!showModal)}>
                                Close
                            </button>
                        </div>
                        <div className="p-2 position-relative h-100 w-100">
                            {showData?.map((ele, ind) => (
                                <p
                                    onClick={() => {
                                        setShowContactDetails(true);
                                        setContactDetails(ele);
                                    }}
                                    style={{
                                        hover: "pointer",
                                    }}
                                    className={`${ind % 2 ? " " : ""}`}
                                    key={ind}
                                >
                                    {ele.phone}
                                </p>
                            ))}
                            {showContactDetails && (
                                <div className="position-absolute z-10 mt-4 bg-white top-0  p-4">
                                    <h1> {contactDetails?.country?.name}</h1>
                                    <h1> {contactDetails?.phone}</h1>
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "#46139f",
                                        }}
                                        onClick={() =>
                                            setShowContactDetails(!showModal)
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="">Filter by even number</label>
                            <input
                                value={evenChecked}
                                onChange={() => setEvenChecked(!evenChecked)}
                                type="checkbox"
                            />
                        </div>
                    </div>
                </div>
            )}
            {/*  */}
        </div>
    );
};

export default Problem2;
