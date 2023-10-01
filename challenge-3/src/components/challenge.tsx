import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { isDomainAvailable } from "@/lib/resources";
import { ChallengeProps, Domain } from "@/lib/types";
import { STATUS, TLD_PRIORITY } from "@/lib/constants";
import { normalizedData } from "@/lib/utils";
import Cart from "./Cart";
import Buttons from "./Buttons";
import InputDomain from "./InputDomain";

export function Challenge({ maxDomains, numDomainsRequired }: ChallengeProps) {
  const toast = useToast();
  // State to manage the input value
  const [inputValue, setInputValue] = useState<string>("");
  // State to manage the cart
  const [cart, setCart] = useState<Domain[]>([]);
  // State to manage the loading state of the isDomainAvailable API call
  const [isValidateLoading, setIsValidateLoading] = useState<boolean>(false);

  /**
   * Displays a notification to the user.
   *
   * @function
   * @param {string} [title="Error"] - The title of the notification.
   * @param {string} [description="Error"] - The description of the notification.
   * @param {"success" | "error" | "warning" | "info"} [status="error"] - The status of the notification.
   * @example
   * // Show an error notification
   * notification('Error Message', 'Failed Action', 'error');
   * @example
   * // Show a success notification
   * notification('Success Message', 'Successful Action', 'success');
   */
  const notification = (
    title: string = "Error",
    description: string = "Error",
    status: "success" | "error" | "warning" | "info" = "error"
  ) => {
    toast({
      title,
      description,
      status,
      // Duration in milliseconds
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  /**
   * Checks if a domain is valid.
   *
   * @function
   * @param {string} domain The domain to check.
   * @returns {boolean} Whether or not the domain is valid.
   * @example isValidDomain('example.com') // true
   */
  const isValidDomain = (domain: string): boolean => {
    const trimmedDomain = normalizedData(domain);
    const validTLDs = [".com", ".xyz", ".app"];

    return (
      validTLDs.some((tld) => trimmedDomain.endsWith(tld)) &&
      // Regex generated with ChatGPT because learning Regex is painful
      /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)?$/.test(trimmedDomain)
    );
  };

  const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /**
   * Handles errors based on the provided value.
   *
   * @param {string} value - The value to check for errors.
   * @returns {string | undefined} If an error is detected, a string describing the error; otherwise, undefined.
   */
  const handleErrors = (value: string): string | undefined => {
    const normalized = normalizedData(value);
    // Using switch statement as it's more readable than if/else
    switch (
      true
    ) {
      case normalized === "":
        notification("Empty Domain", "Please enter a domain", "error");
        return;
      case cart.length >= maxDomains:
        notification(
          "Max Domains",
          `You have reached the max number of domains (${maxDomains})`,
          "error"
        );
        return;
      case cart.some((item) => item.domain === normalized):
        notification(
          "Duplicate Domain",
          "You have already added this domain",
          "error"
        );
        return;
      case normalized.includes("https://") || normalized.includes("http://"):
        notification(
          "Invalid Domain",
          "Please remove http and https from the domain",
          "error"
        );
        return;
      case !isValidDomain(normalized):
        notification("Invalid Domain", "Please enter a valid domain", "error");
        return;
      default:
        return normalized;
    }
  };

  /**
   * Adds a domain to the cart and displays a notification.
   * @returns {void}
   */
  const addToCart = async (): Promise<void> => {
    const value = handleErrors(inputValue);
    if (!value) return;
    setInputValue("");
    setIsValidateLoading(true);
    const status = (await isDomainAvailable(value))
      ? STATUS.AVAILABLE
      : STATUS.TAKEN;
    setIsValidateLoading(false);
    setCart([...cart, { domain: value, status }]);
    notification("Domain Added", "Your domain has been added", "success");
  };

  /**
   * Removes a domain from the cart and displays a notification.
   * @param {string} domain - The domain to be removed.
   * @returns {void}
   */
  const removeFromCart = (domain: string): void => {
    setCart(cart.filter((item) => item.domain !== domain));
    notification("Domain Removed", "Your domain has been removed", "success");
  };

  /**
   * Clears all domains from the cart and displays a notification.
   * @returns {void}
   */
  const clearCart = (): void => {
    if (cart.length === 0) {
      notification("Empty Cart", "Your cart is empty", "error");
      return;
    }
    setCart([]);
    notification("Cart Cleared", "Your cart has been cleared", "success");
  };

  /**
   * Purchases domains in the cart, provided they meet certain conditions, and displays a notification.
   * @returns {void}
   */
  const purchaseDomains = (): void => {
    if (cart.length === 0) {
      notification("Empty Cart", "Your cart is empty", "error");
      return;
    }

    if (cart.some((item) => item.status === STATUS.TAKEN)) {
      notification(
        "Unavailable Domains",
        "Please remove all unavailable domains from your cart",
        "error"
      );
      return;
    }

    if (cart.length > maxDomains) {
      notification(
        "Max Domains",
        `Please remove ${cart.length - maxDomains} domains from your cart`,
        "error"
      );
      return;
    }

    setCart([]);
    notification(
      "Domains Purchased",
      "Your domains have been purchased",
      "success"
    );
  };

  /**
   * Removes unavailable domains from the cart and displays a notification.
   * @returns {void}
   */
  const removeUnavailableDomains = (): void => {
    if (cart.length === 0) {
      notification("Empty Cart", "Your cart is empty", "error");
      return;
    }
    if (cart.every((item) => item.status === STATUS.AVAILABLE)) {
      notification(
        "No Unavailable Domains",
        "All domains are available",
        "success"
      );
      return;
    }
    const updatedCart = cart.filter((item) => item.status === STATUS.AVAILABLE);
    setCart(updatedCart);
    notification(
      "Unavailable Domains Removed",
      "Your unavailable domains have been removed",
      "success"
    );
  };

  // Partially Generated by ChatGPT
  /**
   * Keeps the best domains based on specified criteria.
   * @param {Domain[]} cart - The array of domains to be considered.
   * @param {number} numDomainsRequired - The number of domains to keep.
   * @returns {Domain[]} - The array of best domains.
   */
  const keepBestDomains = (
    cart: Domain[],
    numDomainsRequired: number
  ): Domain[] => {
    if (cart.length === 0) {
      notification("Empty Cart", "Your cart is empty", "error");
      return [];
    }
    // Sorting domains based on the specified criteria
    const sortedDomains = cart.sort((a: Domain, b: Domain) => {
      // Extracting domain endings safely
      const aEnding = a.domain.split(".").pop() || "";
      const bEnding = b.domain.split(".").pop() || "";

      // First, compare domain endings based on priority
      const endingComparison = TLD_PRIORITY[aEnding] - TLD_PRIORITY[bEnding];

      // If endings have different priorities, use that for comparison
      if (endingComparison !== 0) {
        return endingComparison;
      }

      // If endings are the same, compare domain lengths
      return a.domain.length - b.domain.length;
    });

    // Keeping only the top N domains
    const bestDomains = sortedDomains.slice(0, numDomainsRequired);

    return bestDomains;
  };

  // Generated by ChatGPT
  /**
   * Copies domains from the cart to the clipboard and displays a notification.
   * @returns {void}
   */
  const copyToClipboard = (): void => {
    if (cart.length === 0) {
      notification("Empty Cart", "Your cart is empty", "error");
      return;
    }
    // Extracting domains from the cart
    const domains = cart.map((item) => item.domain).join(", ");

    try {
      // Attempt to use navigator.clipboard.writeText
      navigator.clipboard.writeText(domains);
      notification(
        "Copied",
        "Your domains have been copied to the clipboard",
        "success"
      );
    } catch (err) {
      // Fallback: create a temporary input element
      const tempInput = document.createElement("textarea");
      tempInput.value = domains;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      notification("Copied", "Your domains have been copied", "success");
    }
  };

  return (
    // Used ChatGPT to generate some of the layout of the page and css properties. The logic is written by me.
    <Box>
      <Text fontSize='2xl' fontWeight='bold' mb={4}>
        Domain Shopper
      </Text>
      {/* Input bar to add domains */}
      <InputDomain
        inputValue={inputValue}
        updateInputValue={updateInputValue}
        addToCart={addToCart}
        isValidateLoading={isValidateLoading}
      />
      <VStack mt={4} align='start'>
        {/* Display the list of domains in the cart */}
        <Cart
          cart={cart}
          setCart={setCart}
          notification={notification}
          handleErrors={handleErrors}
          removeFromCart={removeFromCart}
        />
        {/* Display total and buttons */}
        <Buttons
          cart={cart}
          setCart={setCart}
          purchaseDomains={purchaseDomains}
          removeUnavailableDomains={removeUnavailableDomains}
          copyToClipboard={copyToClipboard}
          clearCart={clearCart}
          keepBestDomains={keepBestDomains}
          numDomainsRequired={numDomainsRequired}
        />
      </VStack>
    </Box>
  );
}
