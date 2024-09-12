import { FunctionComponent } from "react";
import JewelCard from "./JewelCard";

interface GridProps {}

const Grid: FunctionComponent<GridProps> = () => {
  const array = [1, 2];
  return (
    <div>
      {array.map((item) => {
        return <JewelCard key={item} />;
      })}
    </div>
  );
};

export default Grid;
