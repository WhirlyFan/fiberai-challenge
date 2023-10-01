import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ConfirmationPopoverProps } from "@/lib/types";
import { AiOutlineDelete } from "react-icons/ai";

/**
 * A confirmation popover that displays a confirmation message and calls a function when the user confirms the action.
 * @param {ConfirmationPopoverProps} props
 * @example
 * <ConfirmationPopover
 *  onConfirm={() => console.log('confirmed')}
 *  buttonText='Remove'
 *  size='sm'
 *  colorScheme='red'
 *  message='Are you sure you want to perform this action?'
 *  />
 */
export default function ConfirmationPopover({
  onConfirm,
  buttonText = "Remove",
  size = "sm",
  colorScheme = "red",
  message = "Are you sure you want to perform this action?",
}: ConfirmationPopoverProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={triggerButtonRef}
      >
        <PopoverTrigger>
          <Button
            ref={triggerButtonRef}
            colorScheme={colorScheme}
            size={size}
            onClick={onOpen}
          >
            <AiOutlineDelete />
            &nbsp;
            {buttonText}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Confirmation</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{message}</PopoverBody>
          <PopoverFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme={colorScheme} onClick={handleConfirm}>
              Confirm
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
