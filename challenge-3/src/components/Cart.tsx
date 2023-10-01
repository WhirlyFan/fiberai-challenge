import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import EditModal from "./EditModal";
import ConfirmationPopover from "./ConfirmationPopover";
import { STATUS } from "@/lib/constants";
import { CartProps } from "@/lib/types";

/**
 * Functional component representing the shopping cart.
 * @param {CartProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function Cart({
  cart,
  setCart,
  notification,
  handleErrors,
  removeFromCart,
}: CartProps) {
  return (
    <>
      <Text fontWeight='bold' mb={2}>
        Shopping Cart
      </Text>
      {cart.map((item) => (
        <HStack key={item.domain} justifyContent='space-between' py={2}>
          {/* Tooltip to display the full domain name */}
          <Tooltip label={item.domain}>
            <Text isTruncated maxWidth='30ch'>
              {item.domain}
            </Text>
          </Tooltip>
          <Box
            color={item.status === STATUS.AVAILABLE ? "green" : "red"}
            fontSize='md'
            fontWeight='bold'
          >
            {item.status}
          </Box>
          <EditModal
            oldDomain={item}
            cart={cart}
            setCart={setCart}
            notification={notification}
            handleErrors={handleErrors}
          />
          <ConfirmationPopover
            onConfirm={() => removeFromCart(item.domain)}
            message={`Are you sure you want to remove ${item.domain} from your cart?`}
          />
        </HStack>
      ))}
    </>
  );
}
