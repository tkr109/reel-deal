import React from 'react'
import "./history.css"

export const History = () => {
  //javascript

  return (
    <div className=''>History
      <div className="wrapper rounded">
        <nav className="navbar navbar-expand-lg navbar-dark dark d-lg-flex align-items-lg-start"> <a class="navbar-brand"
          href="#">History</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
        </nav>
        {/* <div className="d-flex justify-content-between align-items-center mt-3">
          <ul className="nav nav-tabs w-75">
            <li className="nav-item"> <a className="nav-link active" href="#history">History</a> </li>
            <li className="nav-item"> <a className="nav-link" href="#">Reports</a> </li>
          </ul> 
        </div> */}
        <div className="table-responsive mt-3">
          <table className="table table-dark table-borderless">
            <thead>
              <tr>
                <th scope="col">Movie Name</th>
                <th scope="col">Date</th>
                <th scope="col" className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className='row-color'>
                <td scope="row"> Vaibhav - The porn Story </td>
                <td>Everyday 12:00 AM</td>
                <td className="">
                  <span className="text-right"></span> Rs.50</td>
              </tr>
              <tr>
                <td scope="row"> Vaibhav - The porn Story </td>
                <td>Everyday 12:00 AM</td>
                <td className="">
                  <span className="text-right"></span> Rs.40(limited time offer)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
