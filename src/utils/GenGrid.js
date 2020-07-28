import React from "react";
import { Grid, Button, Icon, Label } from "semantic-ui-react";

function genGrid(totalrows, columns, groups, icons, handleClick, toggleDirection) {
  let rows = [];
  rows.push(
    <Grid.Column style={{ flex: "0 0 10px" }} key={"labelcol" + 0}>
      <Button color="yellow" style={{ padding: "5px" }} inverted onClick={toggleDirection}>
        Dir
      </Button>
    </Grid.Column>
  );
  for (let j = 1; j <= columns; j++)
    rows.push(
      <Grid.Column key={"labelcol" + j}>
        <Label.Group key={"label" + j}>{genLabels(j, groups[j - 1])}</Label.Group>
      </Grid.Column>
    );
  for (let i = 1; i <= totalrows; i++)
    rows.push(
      <Grid.Row key={"row" + i}>{genCols(i, columns, groups, icons, handleClick)}</Grid.Row>
    );
  return rows;
}

function genLabels(col, size) {
  let labels = [];
  for (let k = 1; k <= size; k++)
    labels.push(
      <Label color="purple" key={k}>
        {String.fromCharCode("A".charCodeAt(0) + col - 1) + k}
      </Label>
    );
  return labels;
}

function genCols(row, columns, groups, icons, handleClick) {
  let cols = [];
  cols.push(
    <Grid.Column style={{ flex: "0 0 10px" }} key={"labelrow" + row}>
      <Label color="purple">{row}</Label>
    </Grid.Column>
  );
  for (let j = 1; j <= columns; j++)
    cols.push(
      <Grid.Column key={"col" + j}>
        <Button.Group>{genGroups(row, j, groups[j - 1], icons, handleClick)}</Button.Group>
      </Grid.Column>
    );
  return cols;
}

function getId(row, col, k) {
  return "R" + row + "C" + String.fromCharCode("A".charCodeAt(0) + col - 1) + k;
}

function genGroups(row, col, size, icons, handleClick) {
  let group = [];
  for (let k = 1; k <= size; k++) {
    let id = getId(row, col, k);
    group.push(
      <Button
        id={id}
        color={getColor(id, icons)}
        onClick={(e) => handleClick(e, row, col, k)}
        key={k}>
        <Icon name={icons[id] || "boxes"} />
      </Button>
    );
  }
  return group;
}

function getColor(id, icons) {
  if (icons[id] === undefined) return "grey";
  else if (icons[id] === "star") return "green";
  else if (icons[id] === "stop circle") return "red";
  else return "blue";
}

function isEqual(c1, c2) {
  return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
}

export { genGrid, genLabels, genCols, getId, genGroups, isEqual };
