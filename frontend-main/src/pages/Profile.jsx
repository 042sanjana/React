import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
import  "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";

    return new Date(isoString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (error)
    return (
      <div className="profile-page">
        <p className="error-text">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="profile-page">
        <p className="loading-text">Loading...</p>
      </div>
    );

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* LEFT SECTION */}
        <div className="profile-left">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
            className="profile-image"
          />

          <h2 className="profile-name">{user.fullName}</h2>

          <p className="profile-role">E-Wallet User</p>

          <div className="profile-status">
            Active Account
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="profile-right">

          <h1 className="profile-title">
            My Profile
          </h1>

          <div className="profile-info">

            <div className="info-box">
              <p className="info-label">Full Name</p>
              <h3 className="info-value">{user.fullName}</h3>
            </div>

            <div className="info-box">
              <p className="info-label">Email</p>
              <h3 className="info-value">{user.email}</h3>
            </div>

            <div className="info-box">
              <p className="info-label">Phone Number</p>
              <h3 className="info-value">
                {Math.trunc(user.phoneNumber)}
              </h3>
            </div>

            <div className="info-box">
              <p className="info-label">Date Of Birth</p>
              <h3 className="info-value">
                {formatDate(user.dateOfBirth)}
              </h3>
            </div>

            <div className="info-box">
              <p className="info-label">Member Since</p>
              <h3 className="info-value">
                {formatDate(user.createdAt)}
              </h3>
            </div>

          </div>

          <button className="edit-btn">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}