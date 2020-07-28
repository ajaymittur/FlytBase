import React, { useState } from "react";
import Warehouse from "./components/Warehouse";
import { Form, Segment } from "semantic-ui-react";

function App() {
  const [dims, setDims] = useState({
    rows: 0,
    cols: 0,
    groups: [],
  });
  const [submittedDims, setSubmittedDims] = useState({
    rows: 0,
    cols: 0,
    groups: [],
  });

  const handleChange = (e, { name, value }) => {
    if (name === "groups") {
      value = value.split(",");
      value = value.map((val) => parseInt(val));
      setDims((prevDims) => ({ ...prevDims, [name]: value }));
    } else setDims((prevDims) => ({ ...prevDims, [name]: parseInt(value) }));
  };

  const handleSubmit = (e) => setSubmittedDims(dims);

  return (
    <div>
      <Segment inverted>
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Input fluid name="rows" label="Rows" placeholder="0" onChange={handleChange} />
            <Form.Input
              fluid
              name="cols"
              label="Main Columns"
              placeholder="0"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="groups"
              label="Groups (No. of subcolumns in each main column)"
              placeholder="1,1,1,..."
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Button color="green" inverted onClick={handleSubmit}>
            Submit
          </Form.Button>
        </Form>
      </Segment>
      <Segment inverted>
        <Warehouse
          rows={submittedDims.rows}
          cols={submittedDims.cols}
          groups={submittedDims.groups}
        />
      </Segment>
    </div>
  );
}

export default App;
