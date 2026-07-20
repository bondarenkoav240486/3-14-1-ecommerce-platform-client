import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context)

    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1)); // Генеруємо випадковий індекс менший за поточний
    //       [array[i], array[j]] = [array[j], array[i]]; // Міняємо місцями елементи масиву
    //     }
    //     return array;
    //   }
    // console.log(device.devices[0]?.typeId)
    // debugger
    // Приклад використання:
    //   const myArray = [1, 2, 3, 4, 5];
    //   const shuffledArray = shuffleArray(myArray);
    //   console.log(shuffledArray); // Виведе масив з перемішаними елементами
    //   const shuffledArrayVitalik = shuffleArray(device.devices);


    return (
        // <Row className="d-flex">
        <div className="DeviceList">
            {device.devices.map(device =>
                // {shuffledArrayVitalik.map(device =>

                <DeviceItem key={device.id} device={device}
                    typeId={device.typeId}
                />
            )}
            {/* </Row> */}
        </div>
    );
});

export default DeviceList;
