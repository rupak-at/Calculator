"use client";
import { RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

const Calculator = () => {
  const [getBody, setGetBody] = useState([]);
  const maxLength = 12;
  const calBody = [9, 8, 7, 6, 5, 4, 3, 2, 1, ".", 0];

  const symbols = ["+", "-", "/", ".", "%"];

  const handleClick = (bodyItem) => {
    if (
      getBody.length > 0 && //checking if +, - ..are repating right after
      symbols.some((symbol) => symbol === getBody[getBody.length - 1]) &&
      bodyItem === getBody[getBody.length - 1]
    )
      return;

    if (
      getBody.length > 0 && //checking for / or % coming together and vice versa
      (bodyItem === "%" || bodyItem === "/") &&
      (getBody[getBody.length - 1] === "/" ||
        getBody[getBody.length - 1] === "%")
    )
      return;

    if (
      getBody.length > 0 && //checking for / or * coming together and vice versa
      (bodyItem === "/" || bodyItem === "*") &&
      (getBody[getBody.length - 1] === "*" ||
        getBody[getBody.length - 1] === "/")
    )
      return;

    if (
      getBody.length === 0 && //checking for intial char should not be * / %
      (bodyItem === "*" || bodyItem === "/" || bodyItem === "%")
    )
      return;

    if (getBody[getBody.length - 1] === "*" && bodyItem === "%") return; //checks for * and / should not be one after

    if (
      (getBody[getBody.length - 1] === "-" ||
        getBody[getBody.length - 1] === "+") && //checks for + or - and / one after
      bodyItem === "/"
    )
      return;

    setGetBody([...getBody, bodyItem]);
  };

  const handleEqualsTo = () => {
    try {
      if (getBody.length === 0) return;
      if (getBody) {
        // let numToBeConverted = getBody.join(""); //changing array into string
        //changing % into /100
        const correctedPercentage = getBody;
        correctedPercentage.forEach((item, id) => {
          if (item === "%") {
            correctedPercentage[id] = "/100";
          }
        });

        // numToBeConverted = numToBeConverted.replace(/%/g, '/100') // replacing

        const calculation = eval(correctedPercentage.join("")); //making array into string and calculation
        const checkLength = calculation.toString().split("");

        let correctedLength = 0;
        if (checkLength.length > 12) {
          //fixing the decimal that are greater than length og 12
          correctedLength = calculation.toFixed(10);

          setGetBody([correctedLength.toString()]);
        } else {
          setGetBody([calculation.toString()]);
        }
      }
    } catch (error) {
      setGetBody(["ERROR"]);
      console.log(error.message);
    }
  };

  const deleteAll = () => {
    setGetBody([]);
  };

  const handleUndo = () => {
    const body = [...getBody];
    const undo = body.slice(0, -1); //removes last element and return
    setGetBody(undo);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 to-slate-950 flex flex-col justify-center items-center">
    <h1 className="text-5xl mb-4 font-mono">Calculator</h1>
      <div className="w-fit bg-gray-800 shadow-2xl rounded-2xl p-6 border border-gray-700">
        <div className="h-16 w-full bg-gray-900 rounded-lg flex justify-end items-center px-4 text-4xl font-mono text-green-400 overflow-x-hidden ">
          {getBody}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-5 w-fit mb-3">
          <div
            onClick={() => handleUndo()}
            className="cursor-pointer h-16 w-16 text-gray-300 rounded-lg shadow-md flex justify-center items-center text-xl bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={24} />
          </div>
          {["%", "/", "*"].map((op) => (
            <div
              key={op}
              onClick={() => handleClick(op)}
              className="cursor-pointer h-16 w-16 text-gray-300 rounded-lg shadow-md flex justify-center items-center text-xl bg-gray-700 hover:bg-gray-600 transition-colors"
              style={{
                pointerEvents: getBody.length > maxLength ? "none" : "auto",
              }}
            >
              {op}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 w-fit gap-3">
          <div className="col-span-3 grid grid-cols-3 gap-3">
            {calBody.map((bodyItem) => (
              <div
                key={bodyItem}
                onClick={() => handleClick(bodyItem)}
                className={`cursor-pointer h-16 w-16 text-gray-300 rounded-lg shadow-md flex justify-center items-center text-xl ${
                  bodyItem === "C"
                    ? "bg-red-900 hover:bg-red-800"
                    : "bg-gray-700 hover:bg-gray-600"
                } transition-colors`}
                style={{
                  pointerEvents: getBody.length > maxLength ? "none" : "auto",
                }}
              >
                {bodyItem}
              </div>
            ))}
            <button
              onClick={() => deleteAll()}
              className="h-16 w-16 rounded-lg shadow-md flex justify-center items-center text-xl text-gray-300 bg-red-900 hover:bg-red-800 transition-colors"
            >
              AC
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {["-", "+"].map((op) => (
              <div
                key={op}
                onClick={() => handleClick(op)}
                className="h-16 w-16 rounded-lg shadow-md flex justify-center items-center text-xl text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
                style={{
                  pointerEvents: getBody.length > maxLength ? "none" : "auto",
                }}
              >
                {op}
              </div>
            ))}
            <button
              onClick={() => handleEqualsTo()}
              className="flex-1 h-16 w-16 rounded-lg shadow-md flex justify-center items-center text-xl text-gray-300 bg-emerald-800 hover:bg-emerald-700 transition-colors"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
