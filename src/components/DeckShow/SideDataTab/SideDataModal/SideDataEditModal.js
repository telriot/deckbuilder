import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import { SideGuideContext } from "../../../../contexts/SideGuideContext"
import SideDataModalFormGroup from "./SideDataModalFormGroup"

const SideDataEditModal = props => {
  const { setSideGuides, matchupGuide, setPages } = useContext(SideGuideContext)
  const [sideGuideData, setSideGuideData] = useState({
    matchup: "",
    sideIn: "",
    sideOut: "",
    comments: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  useEffect(() => {
    matchupGuide &&
      setSideGuideData(prevState => {
        const { matchup, sideIn, sideOut, comments } = matchupGuide
        return { ...prevState, matchup, sideIn, sideOut, comments }
      })
  }, [matchupGuide])

  const handleEditSubmit = async () => {
    try {
      setIsLoading(true)
      const { matchup, sideIn, sideOut, comments } = sideGuideData
      console.log(matchup, sideIn, sideOut, comments)
      await axios.put(
        `/api/decks/${params.id}/sideguides/${matchupGuide._id}`,
        {
          matchup,
          sideIn,
          sideOut,
          comments
        },
        {
          "Content-Type": "raw"
        }
      )
    } catch (error) {
      setIsLoading(false)

      console.log("Server error", error)
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SideDataModalFormGroup
          sideGuideData={sideGuideData}
          setSideGuideData={setSideGuideData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button disabled={isLoading} onClick={() => handleEditSubmit()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SideDataEditModal
