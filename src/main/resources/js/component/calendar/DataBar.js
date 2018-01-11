import React from 'react';

const DataBar = ({events, month}) => {
    const calcGoalProgress = (total, goal) => (total/goal) * 100;

    // Will only leave string with month and year ex: Jan 2018
    const changeDate = string => {
        let newString = string.split(" ");
        newString.splice(1,1);
        return newString.join(" ");
    };

    const totalPerMonth = events.filter(each => changeDate(each.date) === changeDate(month._d.toString().slice(4,15)));

    const completed = totalPerMonth.filter(each => each.complete === true).length;

    return(
        <div className="d-inline-block month-data">
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: (totalPerMonth.length === 0 ? `0%`
                        : `${Math.floor(calcGoalProgress(completed, totalPerMonth.length))}%`)}}>
                    {completed}/{totalPerMonth.length}
                </div>
            </div>
        </div>
    )
};

export default DataBar;