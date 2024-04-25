import React, { useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "", // You may choose to handle passwords securely, not storing them in the state
  });

  useEffect(() => {
    // Retrieve user data from local storage and update the state
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save the updated user data to local storage
    localStorage.setItem("user", JSON.stringify(userData));

    // Make an API call to update the data in the database
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/update/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("User data updated successfully:", data.updatedUser);
      } else {
        console.error("Error updating user data:", data.error);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="row py-5 px-4 prof-body">
      <div className="col-md-5 mx-auto pff">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="cover pb-4 ">
            <div className="profile-head">
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  alt="..."
                  width="130"
                  className="rounded mb-2 img-thumbnail"
                />
              </div>
              <div
                className="media-body text-white"
                style={{ textAlign: "center" }}
              >
                <h4 className="">{userData.name}</h4>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt"></i>
                  {userData.city}
                </p>
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className="px-4 py-3">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="col">
                <div className="row">
                  <div className="col mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="e-profile">
                          <div className="row"></div>
                          <div className="tab-content pt-3">
                            <div className="tab-pane active">
                              <form className="form" noValidate="">
                                <div className="row">
                                  <div className="col">
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>First Name</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={userData.name}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Phone Number</label>
                                          <input
                                            className="form-control"
                                            type="number"
                                            name="phoneNumber"
                                            value={userData.phoneNumber}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Email</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>City</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="city"
                                            value={userData.city}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Country</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            placeholder="India"
                                          />
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="form-group">
                                          <label>Role</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            placeholder="User Access"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col d-flex justify-content-end">
                                    <button
                                      className="btn btn-primary"
                                      type="submit"
                                      onClick={handleSubmit}
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
