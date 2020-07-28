import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { genGrid, getId, isEqual } from "../utils/GenGrid";

function Warehouse(props) {
  const rows = props.rows,
    columns = props.cols,
    groups = props.groups;
  const [start, setStart] = useState([-1, -1, -1]);
  const [end, setEnd] = useState([-1, -1, -1]);
  const [path, setPath] = useState([]);
  const [direction, setDirection] = useState(1);
  const [icons, setIcons] = useState({});

  const handleClick = (event, row, col, k) => {
    event.preventDefault();
    let id = getId(row, col, k);
    setPath([]);

    if (isEqual(start, [-1, -1, -1])) {
      setStart([row, col, k]);
    } else if (isEqual(end, [-1, -1, -1])) {
      setEnd([row, col, k]);
    } else {
      setStart([row, col, k]);
      setEnd([-1, -1, -1]);
      setIcons({});
    }
  };

  const toggleDirection = (event) => {
    setDirection((prevDir) => -prevDir);
    setIcons({});
  };

  const genPath = (start, end, dir) => {
    if (isEqual(start, end)) return end;

    let path = [start];
    let [currR, currC, currK] = start;
    let [endR, endC, endK] = end;

    while ((dir === 1 && currR < props.rows) || (dir === -1 && currR > 1)) {
      currR += dir;
      path.push([currR, currC, currK]);
      if (isEqual([currR, currC, currK], end)) return path;
      let id = getId(currR, currC, currK);
      setIcons((prevIcons) => ({ ...prevIcons, [id]: dir === 1 ? "angle down" : "angle up" }));
    }
    if (currC === endC) {
      if (currK < endK) {
        let id = getId(currR, currC, currK);
        setIcons((prevIcons) => ({ ...prevIcons, [id]: "angle right" }));
        currK++;
      } else {
        let id = getId(currR, currC, currK);
        setIcons((prevIcons) => ({ ...prevIcons, [id]: "angle left" }));
        currK--;
      }
    } else if (currC < endC) {
      let id = getId(currR, currC, currK);
      setIcons((prevIcons) => ({ ...prevIcons, [id]: "angle right" }));
      if (currK < groups[currC - 1]) currK++;
      else {
        currC++;
        currK = 1;
      }
    } else {
      let id = getId(currR, currC, currK);
      setIcons((prevIcons) => ({ ...prevIcons, [id]: "angle left" }));
      if (currK > 1) currK--;
      else {
        currC--;
        currK = groups[currC - 1];
      }
    }

    let id = getId(currR, currC, currK);
    setIcons((prevIcons) => ({ ...prevIcons, [id]: currR === 1 ? "angle down" : "angle up" }));

    path.push(...genPath([currR, currC, currK], end, -dir));
    return path;
  };

  useEffect(() => {
    if (!isEqual(start, [-1, -1, -1]) && !isEqual(end, [-1, -1, -1]))
      setPath(genPath(start, end, direction));
    if (!isEqual(start, [-1, -1, -1]))
      setIcons((prevIcons) => ({ ...prevIcons, [getId(...start)]: "star" }));
    if (!isEqual(end, [-1, -1, -1]))
      setIcons((prevIcons) => ({ ...prevIcons, [getId(...end)]: "stop circle" }));
  }, [start, end, direction]);

  let grid = genGrid(rows, columns, groups, icons, handleClick, toggleDirection);

  return (
    <Grid textAlign="center" columns="equal">
      {grid}
    </Grid>
  );
}

export default Warehouse;
