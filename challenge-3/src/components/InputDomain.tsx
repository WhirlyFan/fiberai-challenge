import { InputDomainProps } from "@/lib/types";
import { Button, Flex, Input } from "@chakra-ui/react";

/**
 *  Functional component representing the input domain field and add to cart button.
 * @param {InputDomainProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function InputDomain({
  inputValue,
  updateInputValue,
  addToCart,
  isValidateLoading,
}: InputDomainProps) {
  return (
    <Flex>
      {/* If this was a real API call I would disable the add to cart while isLoading is true */}
      <Input
        placeholder='Enter a domain'
        value={inputValue}
        isDisabled={isValidateLoading}
        onChange={(e) => updateInputValue(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevents the default form submission behavior, although there is no form, this is just habit
            addToCart();
          }
        }}
      />
      <Button ml={2} onClick={() => addToCart()} isDisabled={isValidateLoading}>
        Add to Cart
      </Button>
    </Flex>
  );
}
