import React, { useContext, Fragment } from "react"
import { DecklistContext } from "../../../contexts/DecklistContext"
import { Popover, OverlayTrigger, Image } from "react-bootstrap"
import { isMobile } from "react-device-detect"

const CardDataSpan = props => {
  const { handleCardDoubleClick, mainDeck, onDragStart } = useContext(
    DecklistContext
  )
  const { i, obj, deck, setDeck, setHover } = props

  const cardNameSpan = (
    <span
      onDragStart={e => onDragStart(e)}
      draggable
      data-origin={deck === mainDeck ? "main" : "side"}
      key={i}
      data-name={obj[i][0]["name"]}
      data-cmc={obj[i][0]["cmc"]}
      data-type={obj[i][0]["type_line"]}
      data-rarity={obj[i][0]["rarity"]}
      //data-legality={obj[i][0]["legalities"]}
      onDoubleClick={() => handleCardDoubleClick(deck, obj, i, setDeck)}
    >
      {i}
    </span>
  )

  return (
    <Fragment>
      {isMobile ? (
        cardNameSpan
      ) : (
        <OverlayTrigger
          placement={isMobile ? "bottom" : "right"}
          delay={150}
          onExit={() => setHover("")}
          overlay={
            <Popover id="card-popover">
              <Popover.Content>
                <Image src={obj[i][0].image_small}></Image>
              </Popover.Content>
            </Popover>
          }
        >
          {cardNameSpan}
        </OverlayTrigger>
      )}
    </Fragment>
  )
}

export default CardDataSpan
