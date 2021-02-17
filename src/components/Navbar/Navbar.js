import React from 'react';
import './Navbar.css';
import avatar from './avatar.png';

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar-content">
        <span id="logo">
          <Logo />
        </span>
        <span id="navbar-tabs">
          <button className="navbar-tab active">
            <NewDoc />
            Editor
          </button>
          <button className="navbar-tab">
            <Styleguide />
            Styleguide
          </button>
          <button className="navbar-tab">
            <Team />
            Team
          </button>
        </span>
        <span id="navbar-content-right">
          <Bolt />
          <button className="avatar-with-triangle">
            <Avatar />
            <TriangleDown />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Navbar;

const Logo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="18" fill="black" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.4178 21.8264L27.8229 11.9033H26.3365H24.4782H23.0127L25.4178 21.8264Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.1153 11.9033H15.6289L18.9737 25.7032H20.46H22.3184H23.8048L20.46 11.9033H18.9737H17.1153Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0762 11.9033H9.73149L9.7316 11.9038H8.24512L11.5899 25.7036H14.9346L14.9345 25.7032H16.421L13.0762 11.9033Z"
      fill="white"
    />
  </svg>
);

const Avatar = () => <div className="avatar"></div>;

const TriangleDown = () => (
  <svg
    width="9"
    height="4"
    viewBox="0 0 9 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.263672 0L4.26367 4L8.26367 0H0.263672Z"
      fill="black"
    />
  </svg>
);

const Bolt = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5012 10.9575V10.4575H8.0012H3.92581L9.68563 1.67424V7.0425V7.5425H10.1856H14.0873L8.5012 16.2883V10.9575Z"
      stroke="black"
    />
  </svg>
);

const NewDoc = () => (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.02577 3.00049H4C2.89543 3.00049 2 3.89592 2 5.00049V14.1153C2 15.2198 2.89543 16.1153 4 16.1153H13.1148C14.2193 16.1153 15.1148 15.2198 15.1148 14.1153V9.55787"
      stroke="black"
    />
    <path
      d="M13.9361 1.70696L8.56884 7.07423C8.45927 7.1838 8.37666 7.31734 8.32753 7.46431L7.07186 11.2208L10.8283 9.96512C10.9753 9.91599 11.1088 9.83338 11.2184 9.72381L16.5857 4.35654C16.9762 3.96601 16.9762 3.33285 16.5857 2.94233L15.3503 1.70696C14.9598 1.31643 14.3266 1.31643 13.9361 1.70696Z"
      stroke="black"
    />
    <path d="M9.02588 6.91553L11.3678 9.25745" stroke="black" />
  </svg>
);

const Styleguide = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2368 2C10.1637 2 8.47368 3.64667 8.47368 5.66667C8.47368 7.68667 10.1637 9.33333 12.2368 9.33333C14.31 9.33333 16 7.68667 16 5.66667C16 3.64667 14.31 2 12.2368 2Z"
      stroke="black"
    />
    <path
      d="M2 10.3333C2 8.86 3.22474 7.66667 4.73684 7.66667C6.24895 7.66667 7.47368 8.86 7.47368 10.3333C7.47368 11.8067 6.24895 13 4.73684 13C3.22474 13 2 11.8067 2 10.3333Z"
      stroke="black"
    />
    <path
      d="M11.2174 12C10.0884 12 9.16474 12.9 9.16474 14C9.16474 15.1 10.0884 16 11.2174 16C12.3463 16 13.27 15.1 13.27 14C13.27 12.9 12.3463 12 11.2174 12Z"
      stroke="black"
    />
  </svg>
);

const Team = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="6.8002"
      cy="5.6"
      r="3.08437"
      stroke="black"
      strokeWidth="1.03125"
    />
    <path
      d="M2 15.8V13.0625C2 11.9234 2.92341 11 4.0625 11H9.5375C10.6766 11 11.6 11.9234 11.6 13.0625V15.8"
      stroke="black"
      strokeWidth="1.03125"
    />
    <mask
      id="mask0"
      maskType="alpha"
      maskUnits="userSpaceOnUse"
      x="11"
      y="-1"
      width="8"
      height="11"
    >
      <rect
        x="11.2578"
        y="-0.742188"
        width="7.28438"
        height="10.2844"
        fill="#C4C4C4"
        stroke="#9AA2AF"
        strokeWidth="0.515625"
      />
    </mask>
    <g mask="url(#mask0)">
      <circle
        cx="10.9999"
        cy="5.6"
        r="3.08437"
        stroke="black"
        strokeWidth="1.03125"
      />
    </g>
    <mask
      id="mask1"
      maskType="alpha"
      maskUnits="userSpaceOnUse"
      x="12"
      y="9"
      width="9"
      height="10"
    >
      <rect
        x="12.458"
        y="9.45776"
        width="7.28438"
        height="8.48438"
        fill="#C4C4C4"
        stroke="#9AA2AF"
        strokeWidth="0.515625"
      />
    </mask>
    <g mask="url(#mask1)">
      <path
        d="M7.3999 15.8V13.0625C7.3999 11.9234 8.32332 11 9.4624 11H14.3374C15.4765 11 16.3999 11.9234 16.3999 13.0625V15.8"
        stroke="black"
        strokeWidth="1.03125"
      />
    </g>
  </svg>
);
