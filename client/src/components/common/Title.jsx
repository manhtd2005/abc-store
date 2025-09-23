import React from "react";

const Title = ({ text1, text2 }) => {
    return (
        <div className="flex items-center justify-center gap-[10px]">
            <p className="text-3xl">{text1}</p>
            <p className="text-3xl text-blue-800">{text2}</p>
        </div>
    );
};

export default Title;
