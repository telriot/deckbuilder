import React, { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import { SideGuideContext } from "../../../../contexts/SideGuideContext"
import SideDataModalFormGroup from "./SideDataModalFormGroup"

const SideDataModal = props => {
  const { setSideGuides, setPages } = useContext(SideGuideContext)
  const [isLoading, setIsLoading] = useState(false)
  const [sideGuideData, setSideGuideData] = useState({
    matchup: "",
    sideIn: "",
    sideOut: "",
    comments: ""
  })

  const sideGuideDataInitialState = {
    matchup: "",
    sideIn: "",
    sideOut: "",
    comments: ""
  }

  const params = useParams()

  const handleSubmit = async () => {
    const { matchup, sideIn, sideOut, comments } = sideGuideData
    try {
      setIsLoading(true)
      await axios.post(
        `/api/decks/${params.id}/sideguides/`,
        {
          matchup,
          sideIn,
          sideOut,
          comments,
          deckId: params.id
        },
        {
          "Content-Type": "raw"
        }
      )
    } catch (error) {
      setIsLoading(false)
      console.error(error.response)
    }
    setSideGuideData(sideGuideDataInitialState)
    try {
      const response = await axios.get(`/api/decks/${params.id}/sideguides/`, {
        params: { deckId: params.id }
      })
      setSideGuides(response.data.docs)
      setPages(response.data.totalPages)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      console.error(error.message)
    }
    props.onHide()
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a matchup guide
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SideDataModalFormGroup
          sideGuideData={sideGuideData}
          setSideGuideData={setSideGuideData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button disabled={isLoading} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SideDataModal
