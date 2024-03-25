import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../contexts/UserContext";

function PasswordGenerator() {
  const [password, setPassword] = useState({
    length: 8,
    allowNumbers: false,
    allowSpecialChars: false,
    password: "",
  });
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let newPassword = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (password.allowNumbers) string += "0123456789";
    if (password.allowSpecialChars) string += "~@#$%^&*?";

    for (let i = 1; i <= password.length; i++) {
      let random = Math.floor(Math.random() * string.length);
      newPassword += string.charAt(random);
    }
    setPassword((prevPassword) => ({ ...prevPassword, password: newPassword }));
  }, [password.length, password.allowNumbers, password.allowSpecialChars]);

  useEffect(() => {
    passwordGenerator();
  }, [password.length, password.allowNumbers, password.allowSpecialChars]);

  function copyPassword() {
    passwordRef.current.select();
    const copiedText = passwordRef.current.value;
    window.navigator.clipboard.writeText(copiedText);
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    const newValue = type === "checkbox" ? checked : parseInt(value);
    setPassword((prevPassword) => ({ ...prevPassword, [name]: newValue }));
  }

  const { user } = useContext(userContext);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-neutral-700 dark:text-white text-lg font-medium text-center">
        Hey {user ? user : "user"}, This is the app where you can generate
        random password of min 8 & max 100 characters.
        <br /> You can also choose to include numbers and special characters.
      </p>
      <div className="w-3/5 mt-10 h-60 py-4 px-10 rounded-xl bg-stone-700 border-2 border-black dark:border-white">
        <h1 className="text-center text-4xl text-white font-bold">
          Password Generator
        </h1>
        <div className="pt-5 my-4">
          <input
            type="text"
            name="password"
            ref={passwordRef}
            value={password.password}
            className="w-4/5 pl-3 focus:outline-none font-medium rounded-s-lg text-xl size-10 text-green-600"
            readOnly
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 hover:bg-blue-700 font-semibold px-2 py-2 rounded-e-lg active:font-bold absolute"
          >
            Copy
          </button>
        </div>
        <div className="flex mt-9 justify-evenly text-amber-300">
          <div>
            <input
              type="range"
              id="length"
              min="1"
              max="100"
              name="length"
              value={password.length}
              onChange={handleChange}
            />
            <label className="pl-1" htmlFor="length">
              Length {password.length}
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="allowNumbers"
              name="allowNumbers"
              checked={password.allowNumbers}
              onChange={handleChange}
            />
            <label className="pl-1" htmlFor="allowNumbers">
              Include Numbers
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="allowSpecialChars"
              name="allowSpecialChars"
              checked={password.allowSpecialChars}
              onChange={handleChange}
            />
            <label className="pl-1" htmlFor="allowSpecialChars">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
