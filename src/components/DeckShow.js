import React, { useContext, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { SearchContext } from "../contexts/SearchContext"
import { DecklistContext } from "../contexts/DecklistContext"
import { AuthContext } from "../contexts/AuthContext"
import {
  Container,
  Button,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap"
import axios from "axios"

const DeckShow = () => {
  const { setIsLoading, deckInfo, setDeckInfo } = useContext(SearchContext)
  const {
    groupByName,
    comment,
    setComment,
    commentsArr,
    setCommentsArr
  } = useContext(DecklistContext)
  const { auth } = useContext(AuthContext)
  let params = useParams()
  let history = useHistory()

  let creaturesShow = []
  let spellsShow = []
  let landsShow = []
  let sideboardShow = []
  let commentsShow = []

  useEffect(() => {
    showDeck()
  }, [])

  useEffect(() => {
    setCommentsArr(commentsShow)
    createComments()
  }, [deckInfo.comments])

  async function showDeck() {
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/decks/${params.id}`)
      setDeckInfo(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error(error.response)
      }
    }
    setIsLoading(false)
  }

  const editHandleClick = e => {
    e.preventDefault()
    history.push(`/decks/${params.id}/edit`)
  }

  const createComments = () => {
    if (deckInfo.comments && deckInfo.comments.length) {
      for (let comment of deckInfo.comments) {
        commentsShow.push(
          <div key={`commentDiv${comment._id}`}>
            <h5 key={`commentH5${comment._id}`}>
              <Link to={`users/${comment.author._id}`}>
                {comment.author.username}
              </Link>
            </h5>
            <p key={`commentP${comment._id}`}>{comment.text}</p>
            {comment.author._id === auth.authUserId && (
              <div>
                <Button
                  data-commentid={comment._id}
                  onClick={e => {
                    destroyComment(e)
                  }}
                >
                  Delete me!
                </Button>
              </div>
            )}
          </div>
        )
      }
    }
  }

  const commentHandleSubmit = e => {
    e.preventDefault()
    axios
      .post(`/api/decks/${params.id}/comments`, {
        text: comment,
        deckId: params.id
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response)
          axios
            .get(`/api/decks/${params.id}`)
            .then(response => {
              if (response.status === 200) {
                setDeckInfo(prevState => {
                  return { ...prevState, comments: response.data.comments }
                })
              }
            })
            .catch(error => {
              console.log("Server error", error)
            })
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
    setComment("")
  }

  const deleteHandleClick = e => {
    e.preventDefault()

    axios
      .delete(`/api/decks/${params.id}`)
      .then(response => {
        if (response.status === 200) {
          history.push("/")
          console.log("deck successfully deleted")
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
  }

  const destroyComment = e => {
    e.persist()
    console.log(e.target.dataset.commentid)
    axios
      .post(`/api/decks/${params.id}/comments/${e.target.dataset.commentid}`, {
        deckId: params.id,
        commentId: e.target.dataset.commentid
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response)
          axios
            .get(`/api/decks/${params.id}`)
            .then(response => {
              if (response.status === 200) {
                setDeckInfo(prevState => {
                  return { ...prevState, comments: response.data.comments }
                })
              }
            })
            .catch(error => {
              console.log("Server error", error)
            })
        }
      })
      .catch(error => {
        console.log("Server error", error)
      })
  }

  const filterByType = (array, type) => {
    let filteredArray = []

    if (type) {
      for (let card of array) {
        if (
          card.type_line
            .toString()
            .toLowerCase()
            .includes(type)
        ) {
          filteredArray.push(card)
        }
      }
    } else {
      for (let card of array) {
        if (
          card.type_line
            .toString()
            .toLowerCase()
            .includes("creature") === false &&
          card.type_line
            .toString()
            .toLowerCase()
            .includes("land") === false
        ) {
          filteredArray.push(card)
        }
      }
    }
    return filteredArray
  }

  const objToArray = obj => {
    return Object.entries(obj).map(array => {
      return {
        copies: array[1].length,
        cardname: array[0],
        img: array[1][0].image_small,
        mana_cost: array[1][0].mana_cost,
        cmc: array[1][0].cmc,
        type: array[1][0].type_line
      }
    })
  }

  const sort = array => {
    let nameSortedArray = array.sort((a, b) => {
      if (a.cardname < b.cardname) {
        return -1
      }
      if (a.cardname > b.cardname) {
        return 1
      }
      return 0
    })
    let CMCSortedArray = nameSortedArray.sort((a, b) => {
      if (a.cmc < b.cmc) {
        return -1
      }
      if (a.cmc > b.cmc) {
        return 1
      }
      return 0
    })
    return CMCSortedArray
  }

  const createList = sortedList => {
    let showList = []
    for (let card of sortedList) {
      showList.push(
        <div key={`maindiv${card.cardname}`}>
          <span>{card.copies} </span>
          <a href="#">{card.cardname}</a>
        </div>
      )
    }
    return showList
  }

  if (deckInfo.mainboard) {
    let filteredCreatures = filterByType(deckInfo.mainboard, "creature")
    let creaturesObj = groupByName(filteredCreatures)
    let creaturesArray = objToArray(creaturesObj)
    let creaturesSorted = sort(creaturesArray)
    creaturesShow = createList(creaturesSorted)
    let filteredSpells = filterByType(deckInfo.mainboard, "")
    let spellsObj = groupByName(filteredSpells)
    let spellsArray = objToArray(spellsObj)
    let spellsSorted = sort(spellsArray)
    spellsShow = createList(spellsSorted)
    let filteredLands = filterByType(deckInfo.mainboard, "land")
    let landsObj = groupByName(filteredLands)
    let landsArray = objToArray(landsObj)
    let landsSorted = sort(landsArray)
    landsShow = createList(landsSorted)
    let sideObj = groupByName(deckInfo.sideboard)
    let sideArray = objToArray(sideObj)
    let sideSorted = sort(sideArray)
    sideboardShow = createList(sideSorted)
  }

  return (
    <Container>
      <div className="row">
        <div className="col-md-9">
          {" "}
          <h3>
            {deckInfo.name} - A {deckInfo.format} deck by{" "}
            <Link to={`/users/${deckInfo.author}`}>
              {deckInfo.authorUsername}
            </Link>
          </h3>
        </div>
        <div className="col-md-3">
          {deckInfo.author === auth.authUserId && (
            <div className="float-md-right">
              <Button className="btn-sm" onClick={e => editHandleClick(e)}>
                Edit
              </Button>
              <Button
                className="btn-sm btn-danger "
                onClick={e => deleteHandleClick(e)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h5>Creatures</h5>
            {creaturesShow}
            <h5>Spells</h5>
            {spellsShow}
          </div>
          <div className="col-md-6">
            <h5>Lands</h5>
            {landsShow}
            <h5>Sideboard</h5>
            {sideboardShow}
          </div>
        </div>
      </div>

      {auth.isAuthenticated && (
        <div>
          <h3>Leave a comment!</h3>
          <Form onSubmit={e => commentHandleSubmit(e)}>
            <InputGroup>
              <FormControl
                as="textarea"
                value={comment}
                onChange={e => setComment(e.target.value)}
                aria-label="With textarea"
              />
              <InputGroup.Append>
                <Button type="submit" variant="outline-secondary">
                  Button
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      )}
      <h3>Comments</h3>
      <div>{commentsArr}</div>
    </Container>
  )
}

export default DeckShow
