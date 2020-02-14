import React from "react"
import { Popover, OverlayTrigger, Image } from "react-bootstrap"

const CardImagePopover = props => {
  const { index, image, name } = props
  return (
    <OverlayTrigger
      placement="right"
      overlay={
        <Popover id="card-popover">
          <Popover.Content>
            <Image src={image}></Image>
            <div style={{ fontSize: "0.7rem", textAlign: "center" }}>
              <span style={{ display: "inline-block" }}>
                Shift + dblclick to add 4
              </span>
            </div>
          </Popover.Content>
        </Popover>
      }
    >
      <td className="py-0" key={`${index}name`}>
        {name}
      </td>
    </OverlayTrigger>
  )
}

export default CardImagePopover
