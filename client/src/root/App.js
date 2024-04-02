import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import runner from "../assets/runner1.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Background from "../components/Background";
import Header from "../components/Header";

function App() {
  //states for initialisation
  const [data, setData] = useState([]);
  const [sortName, setsortName] = useState("sort");
  const [sortByAgeName, setSortByAgeName] = useState("Age");
  const [sortOption, setSortOption] = useState("");
  const [ageOption, setAgeOption] = useState("");

  useEffect(() => {
    const url = `http://localhost:3001/api/get/avg_pace`
    //get data from express backend
    Axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
    //default sort by avg_pace
    setSortOption("avg_pace");
  }, []);

  //to get sorted data from express server by SQL statements
  const getSortedData = (sortBy) => {
    Axios.get(`http://localhost:3001/api/get/${sortBy}`)
      .then((response, err) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  //helper function to onClick
  const onClickHandlerSort = (selectBy) =>{
    setSortOption(selectBy);
    getSortedData(`${selectBy},${ageOption}`);
    setsortName(selectBy);
  }
  //helper function to onClick
  const onClickHandlerAge = (selectBy) =>{
    setAgeOption(selectBy);
    getSortedData(`${sortOption},${selectBy}`);
    setSortByAgeName(selectBy);
  }

  //divided into small function to get rid of mess code
  const commonTable = (sort,templateOnClick,first,second,third,isAge) => {
    return(
      <ul data-testid="commonTable"  className="links">
        <li className="dropdown">
          <a href="/#" className="trigger-drop">
            {sort}
            <i className="arrow"></i>
          </a>

          <ul className="drop">
          <li
          onClick={() => {
            setAgeOption("");
            getSortedData(`avg_pace,`);
            setSortByAgeName("Age");
          }}
        >
          <a style={{display:`${isAge}`}} href="/#">Remove</a>
        </li>

            <li>
              <a
                href="/#"
                onClick={() => {
                  templateOnClick(first);
                }}
              >
                {first}
              </a>
            </li>
            <li>
              <a
                href="/#"
                onClick={() => {
                  templateOnClick(second);
                }}
              >
                {second}
              </a>
            </li>
            <li>
              <a
                href="/#"
                onClick={() => {
                  templateOnClick(third);
                }}
              >
                {third}
              </a>
            </li>
          </ul>
        </li>
    </ul>
    )
  }

  //divided into small function to get rid of mess code
  const tableMenu = () => {
    return (
      <div data-testid="tableMenu">
        <nav id="navigation">
          <ul className="links" style={{ float: "left" }}>
            <li className="dropdown">
              <a href="/#" className="trigger-drop">
                RunnersLeaderboard<i className="arrow"></i>
              </a>
            </li>
          </ul>
          
          {commonTable(sortName,onClickHandlerSort,'avg_pace','distance','total_time','none')}
               
          {commonTable(sortByAgeName,onClickHandlerAge,'20-30','30-40','40-60','block')}
         
        </nav>
      </div>
    );
  };

  // to render before get data
  const skeletonComponent = () => {
    return (
      <SkeletonTheme
        data-testid="SkeletonComponent"
        color="#1D9AE4"
        highlightColor="#9D4D94"
      >
        <p>
          <Skeleton count={15} />
        </p>
      </SkeletonTheme>
    );
  };

  //render this until receive data
  const noData = () => {
    return (
      <div data-testid="loading">
        <section className="sec">
          {/* render header  function*/}
          <Header/>

          <div className="content">
            {/* render header  function*/}
            {tableMenu(commonTable)}
            <table className="rwd-table">
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>age</th>
                  <th>distance</th>
                  <th>avg-pace</th>
                  <th>total time</th>
                </tr>

                {/* return skeletonComponent until data is received  */}

                <tr>
                  <td data-th="Username">{skeletonComponent()} </td>
                  <td data-th="age">{skeletonComponent()}</td>
                  <td data-th="distance">{skeletonComponent()}</td>
                  <td data-th="avg-pace">{skeletonComponent()}</td>
                  <td data-th="total-time">{skeletonComponent()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* background render function */}
         <Background/>
          <img alt="runner_girl" className="girl" src={runner}></img>
        </section>
      </div>
    );
  };

  //render data when get data
  const hereData = () => {
    return (
      <div data-testid="loading">
        <div>
          <section className="sec">
            {/* render header  function*/}
           <Header/>

            <div className="content">
              {/* render header  function*/}
              {tableMenu()}

              <table className="rwd-table">
                <tbody>
                  <tr>
                    <th>Username</th>
                    <th>age</th>
                    <th>distance</th>
                    <th>avg-pace</th>
                    <th>total time</th>
                  </tr>

                  {/* return data to table */}
                  {Object.values(data).map((item, index) => (
                    <tr key={index}>
                      <td data-th="Username">{item.username} </td>
                      <td data-th="age">{item.age}</td>
                      <td data-th="distance">{item.distance}</td>
                      <td data-th="avg-pace">{item.avg_pace.toFixed(2)}</td>
                      <td data-th="total-time">{item.total_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* background render function */}
           <Background/>
            <img alt="runner_girl" className="girl" src={runner}></img>
          </section>
        </div>
      </div>
    );
  };

  //check if there is no data
  if (data.length === 0) {
    return <div>{noData()}</div>;
  }
  return <div>{hereData()}</div>;
}

export default App;
