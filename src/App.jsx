import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // function for copying the text to clipboard
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+{}~`";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div
        className="w-screen max-w-2xl ms-auto shadow-md 
      rounded-lg px-4 my-8 text-white bg-gray-600"
      >
        <h1 className="text-2xl text-center text-white p-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 px-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mr-1 bg-white text-black rounded-lg"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none focus:outline-none bg-blue-500  text-white
           shrink-0 transform transition duration-200 hover:scale-95 active:scale-90"
          >
            Copy
          </button>
        </div>
        <div className="flex text-md gap-x-2 px-4">
          <div className="flex items-center gap-x-3 my-4">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>

            <div className="flex items-center gap-x-3 my-4">
              <input
                type="checkbox"
                className="ml-7"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="Numbers">Numbers</label>
            </div>
            <div className="flex items-center gap-x-3 my-4">
              <input
                type="checkbox"
                className="ml-8"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="Characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
