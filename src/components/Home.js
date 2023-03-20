import axios from "axios";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { SliceAction } from "./store/Slice";
import { useState } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [updatedData, setUpdatedData] = useState();
  const Master = useSelector((state) => state.finalData);
  const changeHanlder = (event) => {
    setUpdatedData(event.target.value);
  };
  const submitHanlder = (id) => {
    dispatch(SliceAction.update({ type: id, update: updatedData }));
    console.log(updatedData);
  };
  const deleteHandler = (id) => {
    dispatch(SliceAction.delete(id));
    console.log(id);
  };
  const updateHandler = () => {
    setShow(true);
  };
  const clickHandler = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      dispatch(SliceAction.fetchData(response.data));
    });
  };
  return (
    <div>
      <div className="master">
        <h1>Click on Button to Get Started</h1>
        <button onClick={clickHandler} className="get">
          Get Data
        </button>
      </div>
      <div>
        {Master.map((ele) => {
          return (
            <div className="renderdata" key={ele.id}>
              <h1>Username: {ele.username}</h1>
              <h1>Email: {ele.email}</h1>
              <h1>
                Address: {ele.address.street}
                {ele.address.suite} {ele.address.city} {ele.address.zipcode}
              </h1>
              {show ? (
                <div className="update">
                  <input type={"text"} onChange={changeHanlder} />
                  <button className="btnsub"
                    onClick={() => {
                      submitHanlder(ele.id);
                    }}
                  >
                    Submit
                  </button>{" "}
                </div>
              ) : (
                ""
              )}

              <button
                className="btn1"
                onClick={() => {
                  updateHandler(ele.id);
                }}
              >
                Update
              </button>
              <button
                className="btn2"
                onClick={() => {
                  deleteHandler(ele.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
