import React, { useEffect, useState } from "react";
import { Grid, Button, Icon, Label } from "semantic-ui-react";

function Warehouse(props) {
  const [grid, setGrid] = useState([]);
  const row = props.rows,
    columns = props.cols,
    groups = props.groups;

  const genGrid = () => {
    let rows = [];
    rows.push(<Grid.Column></Grid.Column>);
    for (let j = 1; j <= columns; j++)
      rows.push(
        <Grid.Column key={0}>
          <Label.Group>{genLabels(j, groups[j - 1])}</Label.Group>
        </Grid.Column>
      );
    for (let i = 1; i <= row; i++) rows.push(<Grid.Row key={i}>{genCols(i)}</Grid.Row>);
    return rows;
  };

  const genLabels = (col, size) => {
    let labels = [];
    for (let k = 1; k <= size; k++)
      labels.push(<Label>{String.fromCharCode("A".charCodeAt(0) + col - 1) + k}</Label>);
    return labels;
  };

  const genCols = (row) => {
    let cols = [];
    cols.push(
      <Grid.Column key={0}>
        <Label>{row}</Label>
      </Grid.Column>
    );
    for (let j = 1; j <= columns; j++)
      cols.push(
        <Grid.Column key={j}>
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
          key={k}>
          <Icon name="boxes" />
        </Button>
      );
    return group;
  };

  useEffect(() => {
    let grid = genGrid(props.rows, props.cols, props.groups);
    setGrid(grid);
  }, []);

  return (
    <Grid textAlign="center" columns="equal">
      {grid}
    </Grid>
  );
}

export default Warehouse;
