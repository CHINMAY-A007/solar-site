import React from "react";

export default function StepList({ steps }: { steps: string[] }) {
  return (
    <div className="step-list">
      {steps.map((step, i) => (
        <div className="step-item" key={i}>
          <div className="step-item__num">{i + 1}</div>
          <div className="step-item__text">
            <h3>{step}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
