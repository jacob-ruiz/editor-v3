import React from 'react';
import './SuggestionsPanel.css';

const SuggestionsPanel = () => {
  return (
    <div id="suggestions-panel">
      <div className="col1">
        <h3>Suggestions</h3>
        <Card open />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="col2">
        <div id="score-section">
          <div id="score-container">
            <span id="score">75</span>
            <ScoreGraph />
          </div>
        </div>
        <div>
          <SectionTab label="Suggestions" number={8} active={true} />
          <CategoryTab label="Spelling & Grammar" color="#EE46D3" number={1} />
          <CategoryTab label="Terms" color="#FFC700" number={1} />
          <CategoryTab label="Style" color="#3BE19B" number={1} />
          <CategoryTab label="Clarity" color="#13D3DF" number={1} />
          <CategoryTab label="Delivery" color="#1D4CFF" number={1} />
          <CategoryTab label="Inclusivity" color="#9B51E0" number={1} />
          <CategoryTab label="Compliance" color="#9AA2AF" number={1} />
          <CategoryTab label="Plagiarism" color="#5A677C" number={1} />
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPanel;

const SectionTab = ({ label, number, active }) => (
  <button className={`section-tab active`}>
    <span className="section-label">{label}</span>
    <span className="section-number">{number}</span>
  </button>
);

const CategoryTab = ({ label, color, number }) => (
  <button className="category-tab">
    <div className="dot" style={{ background: color }}></div>
    <span className="label">{label}</span>
    <span className="number">{number}</span>
  </button>
);

const Card = ({
  open,
  category,
  mistake,
  correction,
  description,
  actionLabel,
}) => <div className={`card ${open && 'open'}`}></div>;

const ScoreGraph = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#EFF0F2" />
    <path
      d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20H20V0C31.0457 0 40 8.9543 40 20Z"
      fill="black"
    />
    <circle cx="20" cy="20" r="17" fill="white" />
  </svg>
);
