import React from 'react';
import CountUp from 'react-countup';

const CounterWidget = ({ title, count, icon: Icon }) => {
    return (
        <div className={`flex items-center p-4 bg:ff-ff_bg_sidebar_dark dark:bg-ff_bg_sidebar_dark rounded-lg shadow-lg`}>
            <div className={`rounded-full p-3 bg:grey[200] mr-4`}>
                <Icon className="text-3xl ff-text" />
            </div>
            <div>
                <div className={`text-3xl font-bold ff-text`}>
                    <CountUp end={count} duration={1} />
                </div>
                <div className={`text-md ff-text`}>
                    {title}
                </div>
            </div>
        </div>
    );
};

export default CounterWidget;
