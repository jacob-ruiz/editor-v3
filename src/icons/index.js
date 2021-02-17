import React from 'react';

const Doc = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" stroke="black" />
    <path
      d="M0.5 8.5C0.785288 8.5 1.13162 8.5 1.49981 8.5C3.15666 8.5 4.48347 10.3115 6.04933 10.853C6.31723 10.9457 6.63145 11 7 11C7.36855 11 7.68277 10.9457 7.95067 10.853C9.51653 10.3115 10.8431 8.5 12.5 8.5H13"
      stroke="black"
    />
  </svg>
);

const NewDoc = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.02577 2.7002H3C1.89543 2.7002 1 3.59563 1 4.7002V13.815C1 14.9195 1.89543 15.815 3 15.815H12.1148C13.2193 15.815 14.1148 14.9195 14.1148 13.815V9.25758"
      stroke="#3C64FA"
    />
    <path
      d="M12.9361 1.70696L7.56884 7.07423C7.45927 7.1838 7.37666 7.31734 7.32753 7.46431L6.07186 11.2208L9.82834 9.96512C9.97531 9.91599 10.1088 9.83338 10.2184 9.72381L15.5857 4.35654C15.9762 3.96601 15.9762 3.33285 15.5857 2.94233L14.3503 1.70696C13.9598 1.31643 13.3266 1.31643 12.9361 1.70696Z"
      stroke="#3C64FA"
    />
    <path d="M8.02588 6.91553L10.3678 9.25745" stroke="#3C64FA" />
  </svg>
);

const TriangleRight = () => (
  <svg
    width="3"
    height="6"
    viewBox="0 0 3 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0L3 3L2.62268e-07 6L0 0Z"
      fill="black"
    />
  </svg>
);

const TriangleLeft = () => (
  <svg
    width="3"
    height="6"
    viewBox="0 0 3 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 0L1.07284e-07 3L3 6L3 0Z"
      fill="black"
    />
  </svg>
);

const Icons = {
  Doc,
  NewDoc,
  TriangleRight,
  TriangleLeft,
};

export default Icons;
