import React from "react";

interface Props {
  className?: string;
}

const ArrowUpIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg viewBox="0 0 1000 1000" className={className}>
      <path d="M 0,500 88.125,588.125 437.5,239.375 V 1000 h 125 V 239.375 L 911.25,588.75 1000,500 500,0 Z" />
    </svg>
  );
};

export default ArrowUpIcon;
