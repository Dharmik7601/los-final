import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import './MultiStepProgressBar.css';

export const MultiStepProgressBar = (props) => {
    return (
        <ProgressBar
            percent={((props.step - 1) * 100)}
            filledBackground="linear-gradient(to right, #ffd89b, #19547b)"
        >
            <Step transition="scale">
                {({ accomplished, progressStep }) => (
                    <div className={`step ${accomplished ? "completed" : ""}`}>
                        1
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, progressStep }) => (
                    <div className={`step ${accomplished ? "completed" : ""}`}>
                        2
                    </div>
                )}
            </Step>
        </ProgressBar>
    );
}

// filledBackground = "linear-gradient(to right, #8ae6ec, #10b4ac)