import React, { useState, useEffect } from "react";

export default function SongRecModal(props) {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return(
        <>
            <button
            onClick={toggleModal}
            className="button">
                Open
            </button>

            {modal ?
                <div className="w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 fixed z-10">
                <div className="w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 fixed bg-gray-400 z-10 opacity-10"></div>
                <div className=" bg-white z-50">
                    <button className="close-modal" onClick={() => toggleModal}>Close</button>
                    <h2>Modal Open</h2>
                    <p className="text-2xl color-black">
                        dahwahdwiahwudhuawdhuwaduhawduawduadwhadwhuadwuhdwauhwuadhhuiawdhuiadwhuiwadihuwaduihawhufeuihfsuifhsuif asigh fuiweag fweyug fyuasdg fhjdsg fhjsdf gashjdg iasd gashdg ashdg ashjdg ashjdg ashjdg ashjg wshjG HFawd
                    </p>
                </div>
            </div> : ''}
        </>
    )
}