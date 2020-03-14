import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row } from "react-bootstrap"
import SideGuideCard from "./SideGuideContainer/SideGuideCard"
import axios from "axios"
import { SideGuideContext } from "../../contexts/SideGuideContext"
import BasicPagination from "../BasicPagination"

const SideGuideContainer = () => {
  const [guidesDisplay, setGuidesDisplay] = useState([])
  const {
    sideGuides,
    setSideGuides,
    setMatchupGuide,
    setPages,
    page,
    pages,
    setPage
  } = useContext(SideGuideContext)

  let params = useParams()
  let guidesArr = []

  useEffect(() => {
    getSideGuides()
  }, [page])

  useEffect(() => {
    renderGuides(sideGuides)
    setMatchupGuide(sideGuides[0])
  }, [sideGuides])

  const getSideGuides = async () => {
    try {
      const response = await axios.get(`/api/decks/${params.id}/sideguides/`, {
        params: { deckId: params.id, page: page }
      })
      setSideGuides(response.data.docs)
      setPages(response.data.totalPages)
    } catch (error) {
      console.error(error.message)
    }
  }

  const renderGuides = sideGuides => {
    if (sideGuides) {
      for (let guide of sideGuides) {
        guidesArr.push(
          <SideGuideCard key={`sgCard${guide._id}`} guide={guide} />
        )
      }
    }
    setGuidesDisplay(guidesArr)
  }

  return (
    <Container>
      <Row>{guidesDisplay}</Row>
      <BasicPagination page={page} setPage={setPage} pages={pages} />
    </Container>
  )
}

export default SideGuideContainer
