import { useEffect, useState } from "react";
import { getConfig } from "../interfaces/configInterface";
import axios from "axios";
import User from "../interfaces/userInterface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function Moderators() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  const token = sessionStorage.getItem("token");
  const baseURL = `${getConfig().baseURL}`;
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const getModerators = `${baseURL}/api/v1/user/getUsers?page=${page}&size=${pageSize}`;

  const [res, setRes] = useState<User[]>([]);

  async function navgiateToUser(accountUserName: string) {
    navigate("/editaccount", { state: { userNameToFetch: accountUserName } });
  }

  const nextPage = () => {
    console.log(page);
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    console.log(page);
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    axios
      .get(getModerators, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Det gick inte hämta moderatorerna");
        } else {
          console.error(error);
        }
      });
  }, [page]);

  return (
    <div className="log-container">
      <h2 className="log-heading">Alla moderatorer</h2>
      <ul
        style={{
          display: res.length === 0 ? "none" : "block",
        }}
      >
        {res.map((user: User, index: number) => (
          <li
            className="list-item-post"
            key={user.username}
            onClick={() => navgiateToUser(user.username)}
          >
            {user.username}
          </li>
        ))}
      </ul>
      <div className="load-logs-btns">
        <ArrowBackIcon
          onClick={page !== 0 ? prevPage : undefined}
          style={{ fontSize: "40px" }}
          className="btn-log"
        />
        <ArrowForwardIcon
          onClick={nextPage}
          className="btn-log"
          style={{ fontSize: "40px" }}
        />
      </div>
    </div>
  );
}
