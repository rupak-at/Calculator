"use client";
import { RotateCcw } from "lucide-react";
import React, { useState } from "react";

const Calculator = () => {
  const [getBody, setGetBody] = useState([]);
  const maxLength = 12
  const calBody = [9, 8, 7, 6, 5, 4, 3, 2, 1, ".", 0];
  const handleClick = (bodyItem) => {
    setGetBody([...getBody, bodyItem]);
  };

  const handleEqualsTo = () => {
    try {
      if (getBody) {
        const numToBeConverted = getBody.join("");
        const calculation = eval(numToBeConverted);
        setGetBody([calculation.toString()]);
      }
    } catch (error) {
      setGetBody(["ERROR"]);
    }
  };

  const deleteAll = () => {
    setGetBody([]);
  };

  const handleUndo = ()=>{
    const body = [...getBody]
    const undo = body.slice(0,-1)
    setGetBody(undo)
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-neutral-900 flex flex-col justify-center items-center">
      <div className="w-fit bg-zinc-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-zinc-700/50">
        <div className="h-20 w-full bg-zinc-900/90 rounded-2xl flex justify-end items-center px-6 text-4xl font-mono text-cyan-400 mb-6 shadow-inner">
          {getBody}
        </div>
        
        <div className="grid grid-cols-4 gap-4 w-fit mb-4">
          <div onClick={handleUndo} className="cursor-pointer h-16 w-16 text-cyan-300 rounded-2xl shadow-lg flex justify-center items-center text-xl bg-zinc-700/90 hover:bg-zinc-600/90 active:scale-95 transition-all duration-150 backdrop-blur-sm">
            <RotateCcw size={24} />
          </div>
          {['%', '/', '*'].map((op) => (
            <div 
              key={op}
              style={{ pointerEvents: getBody.length > maxLength ? 'none' : 'auto' }}
              onClick={() => handleClick(op)} 
              className="cursor-pointer h-16 w-16 text-cyan-300 rounded-2xl shadow-lg flex justify-center items-center text-xl bg-zinc-700/90 hover:bg-zinc-600/90 active:scale-95 transition-all duration-150 backdrop-blur-sm font-medium"
            >
              {op}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 w-fit gap-4">
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {calBody.map((bodyItem) => (
              <div
                key={bodyItem}
                onClick={() => handleClick(bodyItem)}
                style={{ pointerEvents: getBody.length > maxLength ? 'none' : 'auto' }}
                className={`cursor-pointer h-16 w-16 rounded-2xl shadow-lg flex justify-center items-center text-xl transition-all duration-150 backdrop-blur-sm font-medium active:scale-95 ${
                  bodyItem === "C"
                    ? "bg-rose-900/90 hover:bg-rose-800/90 text-rose-100"
                    : "bg-zinc-700/90 hover:bg-zinc-600/90 text-cyan-300"
                }`}
              >
                {bodyItem}
              </div>
            ))}
            <button
              onClick={deleteAll}
              className="h-16 w-16 rounded-2xl shadow-lg flex justify-center items-center text-xl text-rose-100 bg-rose-900/90 hover:bg-rose-800/90 transition-all duration-150 backdrop-blur-sm font-medium active:scale-95"
            >
              AC
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {['-', '+'].map((op) => (
              <div 
                key={op}
                style={{ pointerEvents: getBody.length > maxLength ? 'none' : 'auto' }}
                onClick={() => handleClick(op)} 
                className="h-16 w-16 rounded-2xl shadow-lg flex justify-center items-center text-xl text-cyan-300 bg-zinc-700/90 hover:bg-zinc-600/90 transition-all duration-150 backdrop-blur-sm font-medium active:scale-95"
              >
                {op}
              </div>
            ))}
            <button 
              onClick={handleEqualsTo} 
              className="flex-1 h-16 w-16 rounded-2xl shadow-lg flex justify-center items-center text-xl text-emerald-50 bg-emerald-600/90 hover:bg-emerald-500/90 transition-all duration-150 backdrop-blur-sm font-medium active:scale-95"
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