import React from "react";
import PropTypes from "prop-types";

const Button = ({
  onClick,
  backgroundColor = "#FFF",
  textColor = "#A91D3A",
  width = "19.125rem",
  height = "3rem",
  text = "Button",
}) => {
  const buttonStyle = {
    borderRadius: "1.01825rem",
    background: backgroundColor,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    width: width,
    height: height,
    flexShrink: 0,
    color: textColor,
    textAlign: "center",
    fontFamily: "Pretendard, sans-serif",
    fontSize: "1.25rem",
    fontStyle: "normal",
    fontWeight: 800,
    lineHeight: "1.67488rem",
    letterSpacing: "-0.03125rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    outline: "none",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

StandardButton.propTypes = {
  onClick: PropTypes.func.isRequired, // 버튼 클릭했을 때 실행할 함수
  backgroundColor: PropTypes.string, // 배경색
  textColor: PropTypes.string, // 텍스트 색
  width: PropTypes.string, // 가로길이
  height: PropTypes.string, // 세로길이
  text: PropTypes.string, // 텍스트
};

export default StandardButton;
