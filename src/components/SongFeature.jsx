import React, {useState, useEffect, useContext} from "react";

export default function SongFeature(props){
    const [isSelected, setIsSelected] = useState(false)

    const toggleFeatureClick = () => {
        setIsSelected(!isSelected)
        props.sendFeatureToParent(props.feature)
    }

    return (
        <div>
            <button onClick={() => toggleFeatureClick()}className={`p-4 m-2 flex text-white text-2xl ${isSelected ? "bg-green-500" : "bg-green-700"}`}>{props.feature.categoryDisplayName}</button>
        </div>
    )
}