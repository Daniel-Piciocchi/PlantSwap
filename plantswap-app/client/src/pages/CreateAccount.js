import React from "react";
import "./createAccount.css";

export const CreateAccount = () => {
    return (
        <div className="create-account">
            <div className="section">
                <div className="container">
                    <h1 className="title">Create an Account</h1>
                    <p className="description">Join PlantSwap and start swapping plants with fellow gardening enthusiasts!</p>
                </div>
                <img className="vector" alt="Vector" src="vector-200.svg" />
            </div>
            <div className="div">
                <div className="container">
                    <div className="text-wrapper">Registration</div>
                    <p className="p">Please provide your details below to create an account.</p>
                    <div className="input">
                        <div className="title-2">Name</div>
                        <div className="textfield">
                            <div className="text">Enter your name</div>
                        </div>
                    </div>
                    <div className="input">
                        <div className="title-2">Email</div>
                        <div className="textfield">
                            <div className="text">Enter your email</div>
                        </div>
                    </div>
                    <div className="input">
                        <div className="title-2">Password</div>
                        <div className="textfield">
                            <div className="text">Enter your password</div>
                        </div>
                    </div>
                    <div className="button">
                        <div className="primary">
                            <div className="title-3">Register</div>
                        </div>
                    </div>
                </div>
                <img className="img" alt="Vector" src="image.svg" />
            </div>
            <div className="section-2">
                <div className="container-2">
                    <div className="title-4">Already have an account?</div>
                    <p className="text-wrapper-2">If you already have an account, you can login using the link below.</p>
                </div>
                <div className="list">
                    <div className="row">
                        <div className="article">
                            <div className="image-container">
                                <div className="image" />
                            </div>
                            <div className="frame">
                                <div className="title-5">Login</div>
                                <div className="text-wrapper-2">Click here to login</div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="vector-2" alt="Vector" src="vector-200-2.svg" />
            </div>
            <div className="top-bar">
                <div className="rectangle" />
                <div className="title-6">PlantSwap</div>
                <div className="navbar">
                    <div className="tab">Home</div>
                    <div className="tab">Browse Plants</div>
                    <div className="tab">My Plants</div>
                    <div className="tab">Login/Register</div>
                </div>
            </div>
        </div>
    );
};
