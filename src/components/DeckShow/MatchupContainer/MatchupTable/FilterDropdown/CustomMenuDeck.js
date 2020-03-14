import React, { useContext } from "react"
import { MatchupContext } from "../../../../../contexts/MatchupContext"
import { DebounceInput } from "react-debounce-input"

const CustomMenuArchetype = React.forwardRef(
  ({ className, "aria-labelledby": labeledBy }, ref) => {
    const { deckFilter, setDeckFilter } = useContext(MatchupContext)

    return (
      <div
        ref={ref}
        className={className}
        style={{ padding: "2px 2px" }}
        aria-labelledby={labeledBy}
      >
        <DebounceInput
          autoFocus
          className="form-control form-control-sm"
          debounceTimeout="300"
          placeholder="Type to filter..."
          style={{ fontSize: "0.8rem" }}
          onChange={e => setDeckFilter(e.target.value)}
          value={deckFilter}
        />
      </div>
    )
  }
)

export default CustomMenuArchetype
