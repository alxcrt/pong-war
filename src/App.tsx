import { useEffect, useMemo, useRef } from "react";
import p5 from "p5";
import { Grid } from "./Grid";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  // const [scores, setScores] = useState({ white: 0, black: 0 });

  const width = 600;
  const height = 600;
  const grid = useMemo(() => new Grid(width, height), [width, height]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(width, height);
      };

      p.draw = () => {
        grid.draw(p);
        // Update scores in state so they can be displayed in the UI
        // setScores({
        //   white: grid.getWhiteScore(),
        //   black: grid.getBlackScore(),
        // });
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, [grid]);

  // return <div ref={canvasRef} className=""></div>;
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-neutral-100">
      <div
        ref={canvasRef}
        className="shadow-md border-2 border-neutral-200"
      ></div>
      {/* <div className="mt-4 text-2xl font-bold">
        White: {scores.white} | Black: {scores.black}
      </div> */}
    </main>
  );
}

export default App;
