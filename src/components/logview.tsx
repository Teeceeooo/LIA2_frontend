import axios from "axios";
import Activity from "../interfaces/activityInterface";
import { useEffect, useState } from "react";
import { getConfig } from "../interfaces/configInterface";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');

export default function Logview() {
  const [logData, setLogData] = useState<Activity[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  let { id: idParam } = useParams();
  const config = getConfig();
  const baseURL = config.baseURL;
  const findLogs = `${baseURL}/api/v1/activity/getParticipantLogs?participantId=${idParam}&page=${page}&size=${pageSize}`;

  useEffect(() => {
    axios
      .get(findLogs, {
        headers: { 
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          "Content-Type": "application/json",
        }},)
      .then((response) => {
        setLogData(response.data);
        console.log(logData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [page]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="log-container">
      <h2 className="log-heading">Senaste händelser för id: {idParam}</h2>
      <ul
        style={{
          display: logData.length === 0 ? "none" : "block",
        }}
      >
        {logData.map((activity: Activity, index: number) => (
          <li className="list-item-post" key={activity.id}>
            {activity.typeOfActivity} | {activity.timeOfActivity}
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
