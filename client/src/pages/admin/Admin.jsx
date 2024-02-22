import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
  Table,
  Space,
  Select,
  Checkbox,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import './Admin.css'

function Admin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [theaterModalVisible, setTheaterModalVisible] = useState(false);
  const [selectedTimings, setSelectedTimings] = useState([]);

  const today = new Date();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showShowModal = () => {
    setShowModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowModalVisible(false);
  };



  const handleDeleteShow = (record) => {
    // Implement your delete logic for shows here
    console.log("Delete show:", record);

    // Make a DELETE request to your server to delete the show
    axios
      .delete(`http://localhost:8080/api/v1/shows/delete-show/${record._id}`)
      .then((response) => {
        message.success("Show Deleted Successfully");

        // Update the shows state by filtering out the deleted show
        setShows(shows.filter((show) => show._id !== record._id));
      })
      .catch((error) => {
        console.error(error);
        message.error("Error deleting the show");
      });
  };

  const onShowFormFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/shows/create-show/",
        values
      );
      message.success("Show Added Successfully");
      setShowModalVisible(false);

      // Update the shows state with the newly added show
      setShows([...shows, response.data]);
    } catch (error) {
      setShowModalVisible(false);
      message.error("Couldn't Add show");
      console.error(error);
    }
  };

  const handleDelete = (record) => {
    // Implement your delete logic for movies here
    console.log("Delete movie:", record);

    // Make a DELETE request to your server to delete the movie
    axios
      .delete(`http://localhost:8080/api/v1/movies/delete-movie/${record._id}`)
      .then((response) => {
        message.success("Movie Deleted Successfully");

        // Update the movies state by filtering out the deleted movie
        setMovies(movies.filter((movie) => movie._id !== record._id));
      })
      .catch((error) => {
        console.error(error);
        message.error("Error deleting the movie");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/movies/get-movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

    axios
      .get("http://localhost:8080/api/v1/shows/get-shows")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
      });

    axios
      .get("http://localhost:8080/api/v1/theaters/get-theaters")
      .then((response) => {
        console.log(response);
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching theaters:", error);
      });
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/movies/add-movies",

        {
            poster_path: values.poster_path,
            vote_average: values.vote_average,
            genre_ids: values.genre_ids, // Send the selected genre IDs
            title: values.title,
            release_date: values.release_date,
            media_type:"Movie",
            trailer_link: values.trailer_link,
            director: values.director,
            runtime: values.runtime,
          }
      );
      message.success("Movie Added Successfully");
      setIsModalVisible(false);

      // Update the movies state with the newly added movie
      setMovies([...movies, response.data]);
    } catch (error) {
      setIsModalVisible(false);
      console.error(error);
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before today
    return current && current < moment(today).startOf("day");
  };

  const showTheaterModal = () => {
    setTheaterModalVisible(true);
  };

  const handleTheaterCancel = () => {
    setTheaterModalVisible(false);
  };

  const handleAddTheater = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/theaters/add-theater",
        values
      );

      const newTheater = response.data.theater;

      if (values.movieIds && values.movieIds.length > 0) {
        for (const movieId of values.movieIds) {
          await axios.post(
            `http://localhost:8080/api/v1/theaters/add-movie-to-theater/${newTheater._id}`,
            { movieId }
          );
        }
      }

      message.success("Theater Added Successfully");
      setTheaters(...theaters, newTheater);
      setTheaterModalVisible(false);

      setTheaters([...theaters, newTheater]);
    } catch (error) {
      console.error("Error adding theater:", error);
      message.error("Couldn't Add Theater");
    }
  };



  const handleDeleteTheater = (record) => {
    // Implement your delete logic for theaters here
    console.log("Delete theater:", record);

    // Make a DELETE request to your server to delete the theater
    axios
      .delete(
        `http://localhost:8080/api/v1/theaters/delete-theater/${record._id}`
      )
      .then((response) => {
        message.success("Theater Deleted Successfully");

        // Update the theaters state by filtering out the deleted theater
        setTheaters(theaters.filter((theater) => theater._id !== record._id));
      })
      .catch((error) => {
        console.error(error);
        message.error("Error deleting the theater");
      });
  };

  const theaterColumns = [
    {
      title: "Theater Name",
      dataIndex: "name",
      key: "theaterName",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Price",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTheater(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    
  ];
  // Define a function to handle adding a show to the theater
  const handleAddShow = (record) => {
    // Implement the logic to add a show for the theater here
    // You can use the selectedTimings state to get the selected timings
    // and send them to your server when adding the show.
    console.log("Add show for theater:", record);
    console.log("Selected Timings:", selectedTimings);
  };

  const genreOptions = [
    { value: 1, label: "Action" },
    { value: 2, label: "Comedy" },
    { value: 3, label: "Drama" },
    { value: 4, label: "Science Fiction" },
    { value: 5, label: "Thriller" },
    { value: 6, label: "Horror" },
  ];

  const openTrailerLink = (trailerLink) => {
    const newTab = window.open(trailerLink, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      // Handle cases where the browser blocks the new tab
      window.location.href = trailerLink;
    }
  };
    

  const movieColumns = [
    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster_path",
      render: (poster) => (
        <img src={poster} alt="Movie Poster" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Vote",
      dataIndex: "vote_average",
      key: "vote_average",
    },
    {
      title: "Genre ID",
      dataIndex: "genre_ids",
      key: "genre_ids",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      key: "release_date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Duration",
      dataIndex: "runtime",
      key: "runtime",
    },

        {
            title: "Trailer",
            dataIndex: "trailer_link",
            key: "trailer_link",
            render: (trailerLink) => (
              <Button
                type="primary"
                onClick={() => openTrailerLink(trailerLink)}
              >
                Open Trailer
              </Button>
            ),
          },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showColumns = [
    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster_path",
      render: (poster) => (
        <img src={poster} alt="Show Poster" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Show Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Host",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Date",
      dataIndex: "release_date",
      key: "release_date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Duration",
      dataIndex: "runtime",
      key: "runtime",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteShow(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const timings = [
    "Morning",
    "Afternoon",
    "Evening", // Add Evening to the list of timings
    "Night",
    "Late Night",
  ];

  const CustomPagination = ({ current, type, originalElement, ...rest }) => {
    if (type === 'prev' || type === 'next') {
      // If it's the "prev" or "next" button, you can customize its style
      return <div style={{ color: 'white' }}>{originalElement}</div>;
    }
    // Otherwise, return the default pagination item
    return originalElement;
  };
  

  return (
    <div className="adminpage" >
      <div>.</div>
      <div>.  </div>
      <div>.</div>
      <h5 className="listedmovie" style={{color:"white"}} >Listed Movies</h5>
      <Table dataSource={movies} style={{marginTop:")px"}} columns={movieColumns}  pagination={{ pageSize: 5 }} />

      <Button type="primary" onClick={showModal}>
        Add Movie
      </Button>

      <Modal
        title="Add Movie"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Movie Name"
            name="title"
            rules={[
              { required: true, message: "Please input the movie name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genre ID"
            name="genre_ids"
            rules={[
              {
                required: true,
                message: "Please select at least one genre!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select genres"
            >
              {genreOptions.map((genre) => (
                <Select.Option key={genre.value} value={genre.value}>
                  {genre.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Movie Poster Link"
            name="poster_path"
            rules={[
              {
                required: true,
                message: "Please input the movie poster link!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Director"
            name="director"
            rules={[
              { required: true, message: "Please input the director's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vote Average"
            name="vote_average"
            rules={[
              { required: true, message: "Please input the vote average!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="release_date"
            rules={[
              { required: true, message: "Please input the release date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item
            label="Duration (in minutes)"
            name="runtime"
            rules={[
              { required: true, message: "Please input the movie duration!" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Trailer Link"
            name="trailer_link"
            rules={[
              { required: true, message: "Please input the Trailer Link!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Movie
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <h5 style={{color:"white",marginTop:"20px"}}>Listed Shows</h5>
      <Table dataSource={shows} columns={showColumns} />

      <Button type="primary" onClick={showShowModal}>
        Add Show
      </Button>
      <Modal
  title="Add Show"
  visible={showModalVisible}
  onOk={handleCancel}
  onCancel={handleCancel}
  footer={null}
>
  <Form
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onShowFormFinish}
  >
    <Form.Item
      label="Show Title"
      name="title"
      rules={[{ required: true, message: "Please input the show title!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Poster Link"
      name="poster_path"
      rules={[{ required: true, message: "Please input the poster link!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Release Date"
      name="release_date"
      rules={[
        { required: true, message: "Please input the release date!" },
      ]}
    >
      <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
    </Form.Item>

    <Form.Item
      label="Overview"
      name="overview"
      rules={[
        { required: true, message: "Please input the overview!" },
      ]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Media Type"
      name="media_type"
      rules={[
        { required: true, message: "Please input the media type!" },
      ]}
    >
      <Input />
    </Form.Item>

    
    <Form.Item
      label="Director"
      name="director"
      rules={[
        { required: true, message: "Please input the director's name!" },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Runtime"
      name="runtime"
      rules={[
        { required: true, message: "Please input the runtime!" },
      ]}
    >
      <InputNumber />
    </Form.Item>
    
    <Form.Item
      label="Vote_Average"
      name="vote_average"
      rules={[
        { required: true, message: "Please input the vote_average!" },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item
      label="City"
      name="city"
      rules={[
        { required: true, message: "Please input the city!" },
      ]}
    >
      <Input />
    </Form.Item>

   

    <Form.Item style={{margin:"0px"}}>
      <Button type="primary" htmlType="submit">
        Add Show
      </Button>
    </Form.Item>
  </Form>
</Modal>

      <h5 style={{color:"white" , marginTop:"20px"}}>Listed Theaters</h5>
      <Table dataSource={theaters} columns={theaterColumns} />

      <Button type="primary" onClick={showTheaterModal} >
        Add Theater
      </Button>
      <Modal
        title="Add Theater"
        visible={theaterModalVisible}
        onOk={handleTheaterCancel}
        onCancel={handleTheaterCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleAddTheater}
        >
          <Form.Item
            label="Theater Name"
            name="theaterName"
            rules={[
              { required: true, message: "Please input the theater name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input the city!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please input the capacity!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Movies" name="movieIds">
            <Select
              mode="multiple"
              placeholder="Select movies for this show" // Update placeholder
              style={{ width: "100%" }}
            >
              {movies.map(
                (
                  movie // Fix the typo here
                ) => (
                  <Select.Option key={movie._id} value={movie._id}>
                    {movie.title}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item label="Timings" name="timings">
            <Checkbox.Group
              options={timings}
              value={selectedTimings}
              onChange={(values) => setSelectedTimings(values)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Theater
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Admin;