import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main-alternative.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components/index";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>hunt</span> application
          </h1>
          <p>
            Welcome to Job <span>Hunt</span> Application - ultimate platform for
            streamlined job searching and seamless connections with prospective
            employers. Explore a vast array of job opportunities, tailor your
            search with precision, and launch your career journey with
            confidence. Join us today to embark on a new chapter of professional
            growth and success.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Try First
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
