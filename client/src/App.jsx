import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeslice";


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Theatre from "./pages/theatre/Theatre";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SeatSelection from "./pages/seatSelection/SeatSelection";
import Billing from "./pages/billing/Billing";
import Admin from "./pages/admin/Admin"
import Profile from "./pages/Profile/Profile";
import Failure from "./pages/failure/failure";
import ShowDetails from "./pages/details/ShowDetails";
import Success from "./pages/successPage/Success";
function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/success" element={<Success/>} />

                <Route path="/admin" element={<ProtectedRoutes><Admin/></ProtectedRoutes>} />
                <Route path="/profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />
                {/* <Route path="/shows/book/:id" element={<ProtectedRoutes><ShowDetails /></ProtectedRoutes>} /> */}
                <Route path="/:mediaType/:id" element={<ProtectedRoutes><Details /></ProtectedRoutes>} />
                <Route path="/:mediaType/:id/theatre" element={<ProtectedRoutes>< Theatre/></ProtectedRoutes>} />
                <Route path="/:mediaType/:id/theatre/:theatreName/:timing/:date/:price" element={<ProtectedRoutes>< SeatSelection/></ProtectedRoutes>} />
                {/* <Route path="/:mediaType/:id/theatre/:theaterName/:timing/:date" element={<ProtectedRoutes>< SeatSelection/></ProtectedRoutes>} /> */}
                {/* <Route path="/:mediaType/:id/theatre/:theatreName/:timing/:date/:seats" element={<ProtectedRoutes>< Billing/></ProtectedRoutes>} /> */}
                <Route path="/billing/:id/:theatreName/:timing/:date/:price/:seats" element={<ProtectedRoutes>< Billing/></ProtectedRoutes>} />
                {/* <Route path="/:mediaType/:id/theatre/:theaterName/:timing/:date/:seats" element={<ProtectedRoutes>< Billing/></ProtectedRoutes>} /> */}
                <Route path="/cancel" element={<ProtectedRoutes><Failure /></ProtectedRoutes>} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export function ProtectedRoutes(props){
    if(localStorage.getItem('user'))
    {
      return props.children;
    }
    else
    {
      return <Navigate to="/login"/>
    }
  }
  
  

export default App;