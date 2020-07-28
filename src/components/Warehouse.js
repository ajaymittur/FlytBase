import React, { useEffect, useState } from "react";
import { Grid, Button, Icon, Label } from "semantic-ui-react";

function Warehouse(props) {
  const row = props.rows,
    columns = props.cols,
    groups = props.groups;
  const [start, setStart] = useState([-1, -1, -1]);
  const [end, setEnd] = useState([-1, -1, -1]);
  const [path, setPath] = useState([]);
  const [dir, setDir] = useState(1);

  const genGrid = () => {
    let rows = [];
    rows.push(<Grid.Column key={0}></Grid.Column>);
    for (let j = 1; j <= columns; j++)
      rows.push(
        <Grid.Column key={"labelcol" + j}>
          <Label.Group key={"label" + j}>{genLabels(j, groups[j - 1])}</Label.Group>
        </Grid.Column>
      );
    for (let i = 1; i <= row; i++) rows.push(<Grid.Row key={"row" + i}>{genCols(i)}</Grid.Row>);
    return rows;
  };

  const genLabels = (col, size) => {
    let labels = [];
    for (let k = 1; k <= size; k++)
      labels.push(<Label key={k}>{String.fromCharCode("A".charCodeAt(0) + col - 1) + k}</Label>);
    return labels;
  };

  const genCols = (row) => {
    let cols = [];
    cols.push(
      <Grid.Column key={"labelrow" + row}>
        <Label>{row}</Label>
      </Grid.Column>
    );
    for (let j = 1; j <= columns; j++)
      cols.push(
        <Grid.Column key={"col" + j}>
          <Button.Group>{genGroups(row, j, groups[j - 1])}</Button.Group>
        </Grid.Column>
      );
    return cols;
  };

  const genGroups = (row, col, size) => {
    let group = [];
    for (let k = 1; k <= size; k++)
      group.push(
        <Button
          id={"R" + row + "C" + String.fromCharCode("A".charCodeAt(0) + col - 1) + k}
          color="grey"
          onClick={(e) => handleClick(e, row, col, k)}
          key={k}>
          <Icon name={getIcon(row, col, k)} />
        </Button>
      );
    return group;
  };

  const getIcon = (row, col, k) => {
    if (isEqual([row, col, k], start)) return "star";
    else if (isEqual([row, col, k], end)) return "stop circle";
    else if (inPath([row, col, k])) return "arrows alternate";
    else return "boxes";
  };

  const isEqual = (c1, c2) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
  };

  const inPath = (c1) => {
    for (let i = 0; i < path.length; i++) if (isEqual(path[i], c1)) return true;
    return false;
  };

  const handleClick = (event, row, col, k) => {
    event.preventDefault();
    setPath([]);

    if (isEqual(start, [-1, -1, -1])) {
      setStart([row, col, k]);
    } else if (isEqual(end, [-1, -1, -1])) {
      setEnd([row, col, k]);
    } else {
      setStart([row, col, k]);
      setEnd([-1, -1, -1]);
    }
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
    }
    if (currC === endC) {
      if (currK < endK) currK++;
      else currK--;
    } else if (currC < endC) {
      if (currK < groups[currC - 1]) currK++;
      else {
        currC++;
        currK = 1;
      }
    } else {
      if (currK > 1) currK--;
      else {
        currC--;
        currK = groups[currC - 1];
      }
    }

    path.push(...genPath([currR, currC, currK], end, -dir));
    console.log(path);
    return path;
  };

  useEffect(() => {
    if (!isEqual(start, [-1, -1, -1]) && !isEqual(end, [-1, -1, -1]))
      setPath(genPath(start, end, dir));
  }, [start, end]);

  let grid = genGrid(props.rows, props.cols, props.groups);

  return (
    <Grid textAlign="center" columns="equal">
      {grid}
    </Grid>
  );
}

export default Warehouse;
