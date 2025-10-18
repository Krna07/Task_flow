import React from "react";
import './compo.css';

const IssueCard = ({
  title,
  tag,
  tagColor,
  id,
  idBg,
  comments,
  avatarColor,
  avatarHairColor,
  isChecked,
  trendIcon,
}) => {
  return (
    <div className="issue-card">
      <div className="issue-title">{title}</div>

      <div className="issue-tags">
        <span className="issue-label" style={{ backgroundColor: tagColor }}>
          {tag}
        </span>
      </div>

      <div className="issue-footer">
        <span className="issue-id" style={{ backgroundColor: idBg }}>
          {isChecked && <span className="checkmark">✔</span>} {id}
        </span>

        <span className="issue-meta">
          <span className="circle">{comments}</span>
          <span className="icon">🗝️</span>
          <span className="icon">🗂️</span>
          <span className="trend">{trendIcon}</span>
        </span>

        <span
          className="avatar"
          style={{ backgroundColor: avatarColor }}
        >
          <span
            className="hair"
            style={{ backgroundColor: avatarHairColor }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
