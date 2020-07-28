import React from "react";
import { Grid, Button, Icon, Label } from "semantic-ui-react";

function genGrid(totalrows, columns, groups, icons, cb) {
  let rows = [];
  rows.push(<Grid.Column key={0}></Grid.Column>);
  for (let j = 1; j <= columns; j++)
    rows.push(
      <Grid.Column key={"labelcol" + j}>
        <Label.Group key={"label" + j}>{genLabels(j, groups[j - 1])}</Label.Group>
      </Grid.Column>
    );
  for (let i = 1; i <= totalrows; i++)
    rows.push(<Grid.Row key={"row" + i}>{genCols(i, columns, groups, icons, cb)}</Grid.Row>);
  return rows;
}

function genLabels(col, size) {
  let labels = [];
  for (let k = 1; k <= size; k++)
    labels.push(<Label key={k}>{String.fromCharCode("A".charCodeAt(0) + col - 1) + k}</Label>);
  return labels;
}

function genCols(row, columns, groups, icons, cb) {
  let cols = [];
  cols.push(
    <Grid.Column key={"labelrow" + row}>
      <Label>{row}</Label>
    </Grid.Column>
  );
  for (let j = 1; j <= columns; j++)
    cols.push(
      <Grid.Column key={"col" + j}>
        <Button.Group>{genGroups(row, j, groups[j - 1], icons, cb)}</Button.Group>
      </Grid.Column>
    );
  return cols;
}

function getId(row, col, k) {
  return "R" + row + "C" + String.fromCharCode("A".charCodeAt(0) + col - 1) + k;
}

function genGroups(row, col, size, icons, cb) {
  let group = [];
  for (let k = 1; k <= size; k++) {
    let id = getId(row, col, k);
    group.push(
      <Button id={id} color="grey" onClick={(e) => cb(e, row, col, k)} key={k}>
        <Icon name={icons[id] || "boxes"} />
      </Button>
    );
  }
  return group;
}

function isEqual(c1, c2) {
  return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
}

export { genGrid, genLabels, genCols, getId, genGroups, isEqual };
