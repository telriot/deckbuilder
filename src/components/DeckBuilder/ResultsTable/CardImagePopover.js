import React from "react"
import { Popover, OverlayTrigger, Image } from "react-bootstrap"
import { isMobile } from "react-device-detect"

const CardImagePopover = props => {
  const { image, name, setHover } = props
  return (
    <OverlayTrigger
      key={`overlay${name}`}
      placement={isMobile ? "bottom" : "right"}
      delay={150}
      onExit={() => setHover("")}
      overlay={
        <Popover
          onClick={() => {
            isMobile && setHover("")
          }}
          id="card-popover"
        >
          <Popover.Content>
            <Image src={image}></Image>
            <div style={{ fontSize: "0.7rem", textAlign: "center" }}>
              <span style={{ display: "inline-block" }}>
                Hold Shift to add 4
              </span>
            </div>
          </Popover.Content>
        </Popover>
      }
    >
      <span>{name}</span>
    </OverlayTrigger>
  )
}

export default CardImagePopover
