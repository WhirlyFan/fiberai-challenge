import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import ConfirmationPopover from "./ConfirmationPopover";
import { ButtonsProps } from "@/lib/types";
import { pluralize } from "@/lib/utils";

/**
 * Functional component representing a set of buttons for domain management.
 * @param {ButtonsProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function Buttons({
  cart,
  setCart,
  purchaseDomains,
  removeUnavailableDomains,
  copyToClipboard,
  clearCart,
  keepBestDomains,
  numDomainsRequired,
}: ButtonsProps) {
  return (
    <Box mt={4}>
      {cart.length > numDomainsRequired && (
        <Tooltip
          label={`
          You can only purchase ${numDomainsRequired} domains at a time.`}
        >
          <Alert status='error'>
            <AlertIcon />
            {`Please remove ${pluralize(
              cart.length - numDomainsRequired,
              "domain"
            )} from your cart`}
          </Alert>
        </Tooltip>
      )}
      <Text>
        Total Domains: {cart.length}/{numDomainsRequired}
      </Text>
      <Stack direction='row' spacing={4} mt={4} wrap='wrap'>
        <Button
          isDisabled={cart.length !== numDomainsRequired}
          onClick={() => purchaseDomains()}
          colorScheme='green'
        >
          Purchase Domains
        </Button>
        <Button onClick={() => removeUnavailableDomains()}>
          Remove Unavailable Domains
        </Button>
        <Button onClick={() => copyToClipboard()}>Copy Domains</Button>
        <Button
          onClick={() => setCart(keepBestDomains(cart, numDomainsRequired))}
        >
          Keep Top Domains
        </Button>
        <ConfirmationPopover
          onConfirm={clearCart}
          buttonText='Clear Cart'
          size='md'
          message='Are you sure you want to clear your cart?'
        />
      </Stack>
    </Box>
  );
}
