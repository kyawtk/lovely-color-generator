import { useRef, useState } from "react";

const getRandomColors = (n) => {
  let colors = [];

  const letters = "0123456789ABCDEF";
  for (let i = 0; i < n; i++) {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }

  return colors;
};

function RandomColorGenerator() {
  const inputRef = useRef();
  const [colors, setColors] = useState([]);

  function getColors(event) {
    event.preventDefault();
    const numColors = parseInt(inputRef.current.value);
    const generatedColors = getRandomColors(numColors);
    setColors(generatedColors);
  }

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <form onSubmit={getColors}>
        <input type="text" ref={inputRef} placeholder="Number of Colors You Want." className="rounded-lg "/>
        <input type="submit" value="Generate" className="text-white font-bold px-3 py-2 rounded-lg border-teal-50 border-4 mx-3 hover:scale-110 active:scale-100 active:border-red-300"/>
      </form>
      <ColorList colors={colors} />
    </div>
  );
}
export default RandomColorGenerator;
function ColorList({ colors }) {
  return (
    <div className=" my-6 flex flex-wrap mx-auto w-5/6 justify-center items-center">
      {colors.map((color) => {
        return <ColorCard key={color} color={color}></ColorCard>;
      })}
   </div>
  );
}

function ColorCard({ color }) {
    const [copied, setCopied ] = useState(false)
    const handleCopy = () => {
       
        setCopied(true);
    
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      };
  return (
    <div
      className={`group w-36 h-36 card flex justify-center items-center m-3 rounded-md shadow-lg `}
      style={{ backgroundColor: `${color}` }} onClick={handleCopy}
    >
      <p className="font-bold relative group-hover:scale-110 text-white shadow-lg cursor-pointer inline-block bg-[rgba(255,255,255,0.1)] group-active:scale-100 backdrop-blur-sm rounded-md px-2 drop-shadow-md" onClick={() => {navigator.clipboard.writeText(color)}}>
        {color}
         <small className="hidden bg-inherit backdrop-blur-md shadow-md absolute left-1 top-[-20px] group-hover:inline-block ">{copied ? 'Copied' :"ClickCopy" }</small>
      </p>
       
    </div>
  );
}
