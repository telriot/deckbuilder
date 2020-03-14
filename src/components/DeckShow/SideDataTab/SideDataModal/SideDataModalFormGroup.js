import React from "react"
import { Form, Col, Row } from "react-bootstrap"

import SideDataModalForm from "./SideDataModalForm"

const SideDataModalFormGroup = props => {
  const { sideGuideData, setSideGuideData } = props

  return (
    <Form>
      <SideDataModalForm
        label="Matchup"
        placeholder="i.e. Dredge..."
        type="text"
        name="matchup"
        data={sideGuideData}
        func={setSideGuideData}
      />
      <Row>
        <Col>
          <SideDataModalForm
            label="In"
            placeholder="2 Ancient Grudge"
            type="text"
            name="sideIn"
            as="textarea"
            rows={4}
            data={sideGuideData}
            func={setSideGuideData}
          />
        </Col>
        <Col>
          <SideDataModalForm
            label="Out"
            placeholder="2 Prized Amalgam"
            type="text"
            name="sideOut"
            as="textarea"
            rows={4}
            data={sideGuideData}
            func={setSideGuideData}
          />
        </Col>
      </Row>
      <SideDataModalForm
        label="Comments"
        placeholder="Comments about the matchup"
        type="text"
        name="comments"
        as="textarea"
        rows={3}
        data={sideGuideData}
        func={setSideGuideData}
      />
    </Form>
  )
}

export default SideDataModalFormGroup
