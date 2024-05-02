  import React, { useEffect, useState } from "react";
  import "./profile.css";
  import { History } from "../../components/history/history";
  import { Modal, Form, Input, Button, Alert } from "antd";
  import "./profile.css";
  import axios from "axios";

  const Profile = () => {
    const [userData, setUserData] = useState({
      name: "",
      phoneNumber: "",
      city: "",
      email: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [error,setError]=useState(false);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const[totalBooking,SetTotalBooking]=useState(0)
    const[totalAmount,SetTotalAmount]=useState(0)

    useEffect(() => {
      const storedUserData = localStorage.getItem("user");

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
      BookingSummary()
      UserBookings();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowModal(true);
    };

    const handleModalCancel = () => {
      setShowModal(false);
    };

    const handleModalOk = async () => {
      try {
        const { name, phoneNumber, city, email } = userData;
        const updatedUserData = { name, phoneNumber, city, email };

        
              if(updatedUserData.email.length==0 ||updatedUserData.city.length==0 || updatedUserData.name.length==0 || updatedUserData.phoneNumber.length==0 )
              {
                setError(true)
                return;
              }
        const response = await axios.put(
          `http://localhost:8080/api/v1/users/update/${userId}`,
          updatedUserData
        );

        console.log("Update response:", response.data);

        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
        setError(false)
        setShowModal(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    const UserBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/bookings/users/bookings/${userId}`
        );

        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    const BookingSummary=async()=>{
      try{
        const res=await axios.get("http://localhost:8080/api/v1/bookings/user-booking-summary")
        const bookings = res.data.filter(booking => booking._id === userId)[0];
       
         SetTotalBooking(bookings.total_booking)      
         SetTotalAmount(bookings.total_booking_amount)

        console.log(total_booking,total_amount)
      }
      catch(error)
      {
        console.log("Error fetching booking Summary: ",error)
      }
    }

    return (
      <div className="row py-5 px-4 prof-body">
        <div className="col-md-5 mx-auto pff">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="cover pb-4">
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
                  <h4 className="" style={{ marginBottom: "25px" }}>
                    {userData.name}
                  </h4>
                  <p>{userData.city}</p>
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
                            <div className="tab-content pt-3">
                              <div className="tab-pane active">
                                <form className="form" noValidate="">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="name"
                                          value={userData.name}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="phoneNumber"
                                          value={userData.phoneNumber}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="email"
                                          value={userData.email}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>City</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="city"
                                          value={userData.city}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Country</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value="India"
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Role</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value="User Access"
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-end">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                      >
                                        Edit Profile
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
        <History bookings={bookings} totalBooking={totalBooking} totalAmount={totalAmount}/>

        {/* Modal */}
        <Modal
          title="Edit Profile"
          visible={showModal}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalOk}>
              Submit
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input name="name" value={userData.name} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="City">
              <Input name="city" value={userData.city} onChange={handleChange} />
            </Form.Item>
          </Form>
          {error &&  <Alert message="Pls fill all the form fields" type="error" />}
        </Modal>
      </div>
    );
  };

  export default Profile;
