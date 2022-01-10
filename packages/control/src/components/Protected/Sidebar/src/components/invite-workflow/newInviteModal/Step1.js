import React, { useState } from "react";

import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Container,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  FormLabel,
  Text
} from "@chakra-ui/react";
import { InfoOutlineIcon, LinkIcon } from "@chakra-ui/icons";
import { BASE_URL } from "@zuri/utilities";

export const Step1 = ({
  name,
  onClo,
  forerr,
  listEmail,
  handleDelete,
  setForerr,
  validateEmail,
  currentWorkspace,
  sendButton,
  val,
  setVal,
  handleSubmit
}) => {
  const [foc, setFoc] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setVal(e.target.value);
    if (!e.target.value) {
      setForerr("");
      setCanSend(true);
    } else {
      setForerr(validateEmail(e.target.value));
      setCanSend(false);
    }
  };

  const handleSend = e => {
    e.preventDefault();
    if (!canSend) {
      handleSubmit(e);
      setCanSend(!canSend);
    } else {
      sendButton(e);
    }
  };

  const handleBlur = e => {
    setFoc(false);
    handleSubmit(e);
  };

  return (
    <ModalContent px="0.5rem" borderRadius="2px">
      <ModalHeader fontSize="20px">Invite People to {name}</ModalHeader>
      <ModalCloseButton onClick={onClo} />
      <ModalBody>
        <FormLabel fontWeight="bold">To:</FormLabel>
        <Container
          border="1px"
          spacing={4}
          p="3"
          borderRadius="2px"
          borderColor={foc ? (!forerr ? "green.300" : "red.200") : "gray.200"}
          maxW="container.xl"
          minH={120}
        >
          {listEmail?.map((e_mail, index) => (
            <Tag
              boxShadow="md"
              p="1"
              m="1"
              key={index}
              colorScheme={!e_mail.error ? "green" : "red"}
            >
              {e_mail.error ? <InfoOutlineIcon mr="1" /> : null}
              <TagLabel>{e_mail.mail}</TagLabel>
              <TagCloseButton onClick={() => handleDelete(index)} />
            </Tag>
          ))}

          <form onSubmit={handleSubmit} style={{ display: "inline" }}>
            <Input
              maxW="40%"
              placeholder="name@gmail.com"
              variant="unstyled"
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              borderRadius="2px"
              onFocus={() => setFoc(true)}
              onBlur={handleBlur}
              value={val}
              pt={1}
            />
          </form>
        </Container>

        {forerr ? (
          <Text color="red.500" fontSize="sm">
            <InfoOutlineIcon mr="1" /> {forerr}
          </Text>
        ) : null}

        <div className={`mt-3 pt-3 d-flex my-auto justify-content-between`}>
          <p
            onClick={() => {
              window.navigator.clipboard.writeText(
                `${BASE_URL}/invite?organization=${currentWorkspace}`
              );
              alert(
                "link has been copied: " +
                  `${BASE_URL}/invite?organization=${currentWorkspace}`
              );
            }}
            className={`mb-0 align-items-center`}
            style={{ color: "#00B87C", fontSize: "15px" }}
          >
            <LinkIcon mr="1" />
            Copy invite link{" "}
            <span style={{ color: "black", fontSize: "15px" }}>
              {" "}
              - Edit link settings{" "}
            </span>
          </p>
          <button
            onClick={handleSend}
            style={{ color: "white", backgroundColor: "#00B87C" }}
            type="button"
            disabled={forerr ? true : false}
            className={`btn my-auto `}
          >
            Send
          </button>
        </div>
      </ModalBody>
    </ModalContent>
  );
};