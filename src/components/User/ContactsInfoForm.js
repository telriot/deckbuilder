import React from "react"
import { Form } from "react-bootstrap"

const ContactsInfoForm = (media, text) => {
  return (
    <Form.Group controlId={media}>
      <Form.Label>{text}</Form.Label>
      <Form.Control
        size="sm"
        type="url"
        pattern={`.*\.${media}\..*"`}
        placeholder={`https://www.${media}.com/example"`}
        title={`The URL must be that of a ${text} page`}
        name={media}
        value={userInfo[media]}
        onChange={e => handleChange(e)}
      />
    </Form.Group>
  )
}

export default ContactsInfoForm
