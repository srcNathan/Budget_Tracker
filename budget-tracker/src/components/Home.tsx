import "../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Budget Tracker</h1>
        <h3>Take Control of Your Finances and Save More</h3>
        <button onClick={() => navigate("/dashboard")}>Start</button>
      </div>
    </div>
  );
}
