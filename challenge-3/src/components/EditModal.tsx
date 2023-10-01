import { Domain, EditModalProps } from "@/lib/types";
import { normalizedData } from "@/lib/utils";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";

/**
 * Functional component representing a modal for editing a domain.
 * @param {EditModalProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function EditModal({
  oldDomain,
  cart,
  setCart,
  notification,
  handleErrors,
}: EditModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [domain, setDomain] = useState<Domain>(oldDomain);

  const handleEdit = () => {
    const validDomain = handleErrors(domain.domain);
    if (!validDomain) return;
    // Create a new array with the updated domains
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(oldDomain);

    if (index !== -1) {
      // Replace the old domain with the new one at the same index and normalize the domain
      updatedCart[index] = { ...domain, domain: normalizedData(domain.domain) };

      // Update the state with the new array
      setCart(updatedCart);

      notification("Domain Edited", "Your domain has been edited", "success");
      onClose();
    } else {
      notification("Error", "Old domain not found in the cart", "error");
    }
  };

  return (
    <>
      <Button size='sm' onClick={onOpen}>
        <AiOutlineEdit />
        &nbsp;
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Domain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={domain.domain}
              onChange={(e) => setDomain({ ...domain, domain: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents the default form submission behavior (Although there is no form, this is just habit)
                  handleEdit();
                }
              }}
              placeholder='Enter a domain'
            />
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleEdit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
