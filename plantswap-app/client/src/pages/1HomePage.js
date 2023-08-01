import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="rectangle" />
        <div className="title">PlantSwap</div>
        <div className="navbar">
          <div className="tab">Home</div>
          <div className="tab">Browse Plants</div>
          <div className="tab">My Plants</div>
          <div className="tab">Login/Register</div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <h1 className="text-wrapper">Welcome to PlantSwap</h1>
          <p className="description">A platform for plant lovers to connect and swap plants</p>
          <div className="button">
            {/* Use Link to navigate to the CreateAccount component */}
            <Link to="/create-account">
              <div className="primary">
                <div className="div">Get Started</div>
              </div>
            </Link>
          </div>
        </div>
        <img className="vector" alt="Vector" src="vector-200.svg" />
      </div>
            <div className="section">
                <div className="container">
                    <div className="text-wrapper">How It Works</div>
                    <p className="description">
                        1. Create an account
                        <br />
                        2. Browse available plants
                        <br />
                        3. Request a swap
                        <br />
                        4. Coordinate with the other person
                    </p>
                    <div className="list">
                        <div className="row">
                            <div className="article">
                                <div className="image-container">
                                    <div className="image" />
                                </div>
                                <div className="frame">
                                    <div className="title-2">Create an Account</div>
                                    <p className="subtitle">Sign up to PlantSwap and start listing your plants for swap</p>
                                </div>
                            </div>
                            <div className="article">
                                <div className="image-container">
                                    <div className="image" />
                                </div>
                                <div className="frame">
                                    <div className="title-2">Browse Plants</div>
                                    <p className="subtitle">Explore a variety of plants available for swap</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="article">
                                <div className="image-container">
                                    <div className="image" />
                                </div>
                                <div className="frame">
                                    <div className="title-2">Request a Swap</div>
                                    <p className="subtitle">Send a request to swap a plant with another user</p>
                                </div>
                            </div>
                            <div className="article">
                                <div className="image-container">
                                    <div className="image" />
                                </div>
                                <div className="frame">
                                    <div className="title-2">Coordinate</div>
                                    <p className="subtitle">
                                        Once the swap is accepted, coordinate with the other person to arrange the swap
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="img" alt="Vector" src="image.svg" />
            </div>
            <div className="section">
                <div className="container">
                    <div className="text-wrapper">Featured Plants</div>
                    <div className="list-2">
                        <div className="card">
                            <div className="image-wrapper">
                                <div className="image">
                                    <div className="title-3">Image of plant</div>
                                    <div className="tag">
                                        <div className="text">Available</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-content">
                                <div className="title-4">Plant 1</div>
                                <div className="subtitle-2">Location: New York</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="image-wrapper">
                                <div className="image">
                                    <div className="title-3">Image of plant</div>
                                    <div className="tag">
                                        <div className="text">Available</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-content">
                                <div className="title-4">Plant 2</div>
                                <div className="subtitle-2">Location: Los Angeles</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="image-wrapper">
                                <div className="image">
                                    <div className="title-3">Image of plant</div>
                                    <div className="tag">
                                        <div className="text">Available</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-content">
                                <div className="title-4">Plant 3</div>
                                <div className="subtitle-2">Location: Chicago</div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="vector-2" alt="Vector" src="vector-200-2.svg" />
            </div>
            <div className="section">
                <div className="container">
                    <div className="text-wrapper">Sign Up Now</div>
                    <div className="input">
                        <div className="title-5">Full Name</div>
                        <div className="textfield" />
                    </div>
                    <div className="input">
                        <div className="title-5">Email</div>
                        <div className="textfield" />
                    </div>
                    <div className="input">
                        <div className="title-5">Password</div>
                        <div className="textfield" />
                    </div>
                    <div className="input">
                        <div className="title-5">Confirm Password</div>
                        <div className="textfield" />
                    </div>
                    <div className="button-2">
                        <div className="seconday">
                            <div className="title-6">Login</div>
                        </div>
                        <div className="title-wrapper">
                            <div className="div">Create Account</div>
                        </div>
                    </div>
                </div>
                <img className="vector-3" alt="Vector" src="vector-200-3.svg" />
            </div>
            <div className="container-wrapper">
                <div className="container-2">
                    <div className="title-7">Follow Us</div>
                    <div className="title-8">Privacy Policy</div>
                    <div className="title-9">Terms of Service</div>
                </div>
            </div>
        </div>
    );
};
