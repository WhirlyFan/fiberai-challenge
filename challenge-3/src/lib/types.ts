export type Domain = {
  domain: string;
  status: string;
};

export interface ChallengeProps {
  /**
   * The maximum number of domains the user is allowed to have
   * in their cart. Invalid domains count toward this limit as well.
   */
  maxDomains: number;
  /**
   * The number of domains the user must have in their cart
   * before they can purchase them.
   */
  numDomainsRequired: number;
}

export interface ButtonsProps {
  /** Array of domains in the cart. */
  cart: Domain[];

  /** Function to set the cart. */
  setCart: React.Dispatch<React.SetStateAction<Domain[]>>;

  /** Function to handle the purchase of domains. */
  purchaseDomains: () => void;

  /** Function to remove unavailable domains from the cart. */
  removeUnavailableDomains: () => void;

  /** Function to copy domains to the clipboard. */
  copyToClipboard: () => void;

  /** Function to clear all domains from the cart. */
  clearCart: () => void;

  /**
   * Function to keep the top domains based on specified criteria.
   * @param {Domain[]} cart - The array of domains to consider.
   * @param {number} numDomainsRequired - The number of domains to keep.
   * @returns {Domain[]} - The array of best domains.
   */
  keepBestDomains: (cart: Domain[], numDomainsRequired: number) => Domain[];

  /** The number of domains required. */
  numDomainsRequired: number;
}

export interface ConfirmationPopoverProps {
  /**
   * The function to call when the user confirms the action.
   * @type Function
   * @example <ConfirmationPopover onConfirm={() => console.log('confirmed')} />
   */
  onConfirm: Function;
  /**
   * The text to display on the button.
   * @default Remove
   * @type string
   * @example <ConfirmationPopover buttonText='Remove' />
   */
  buttonText?: string;
  /**
   * The size of the button.
   * @default sm
   * @type string
   * @example
   * <ConfirmationPopover size='sm' />
   */
  size?: string;
  /**
   * The color scheme of the button.
   * @default red
   * @type string
   * @example
   * <ConfirmationPopover colorScheme='red' />
   */
  colorScheme?: string;
  /**
   * The message to display in the popover.
   * @default 'Are you sure you want to perform this action?'
   * @type string
   * @example
   * <ConfirmationPopover message='Are you sure you want to clear the cart?' />
   */
  message?: string;
}

export interface CartProps {
  /**
   * The array of domains in the cart.
   * @type Domain[]
   * @example <Cart cart={[{ domain: 'example.com', status: 'available' }]} />
   */
  cart: Domain[];
  /**
   * The function to call when the user removes a domain from the cart.
   * @type Function
   * @example <Cart removeFromCart={(domain) => console.log(domain)} />
   */
  setCart: Function;
  /**
   * The function that displays a notification to the user.
   * @type Function
   * @example <Cart notification={(title, description, status) => console.log(title, description, status)} />
   */
  notification: Function;
  handleErrors: Function;
  removeFromCart: Function;
}

export interface InputDomainProps {
  /**
   * The value of the input field
   * @type {string}
   * @default ''
   * @example
   * <InputDomain inputValue='example.com' />
   */
  inputValue: string;
  /**
   * Function to update the input value
   * @type {Function}
   * @example
   * <InputDomain updateInputValue={() => console.log('updated')} />
   */
  updateInputValue: Function;
  /**
   * Function to add the domain to the cart
   * @type {Function}
   * @example
   * <InputDomain addToCart={() => console.log('added')} />
   */
  addToCart: Function;
  /**
   * Boolean to determine loading state of isDomainAvailable API call
   * @type {boolean}
   */
  isValidateLoading: boolean;
}

export interface EditModalProps {
  /**
   * The domain to edit.
   * @type {Domain}
   * @memberof EditModalProps
   * @required
   * @example
   * {
   * domain: 'example.com',
   * status: 'available'
   * }
   * @see {@link Domain}
   */
  oldDomain: Domain;
  /**
   * The current cart of domains.
   * @type {Domain[]}
   * @memberof EditModalProps
   * @required
   * @example
   * [
   *  {
   * domain: 'example.com',
   * status: 'available'
   *  },
   *  {
   * domain: 'example.xyz',
   * status: 'available'
   *  }
   * ]
   * @see {@link Domain}
   */
  cart: Domain[];
  /**
   * Function to update the cart.
   * @type {Function}
   * @memberof EditModalProps
   * @required
   * @example
   * setCart(newCart)
   */
  setCart: Function;
  /**
   * Function to display a notification.
   * @type {Function}
   * @memberof EditModalProps
   * @required
   * @example
   * notification('Domain Edited', 'Your domain has been edited', 'success')
   */
  notification: Function;
  /**
   * Function to handle errors.
   * @type {Function}
   * @memberof EditModalProps
   * @required
   * @example
   * handleErrors(domain.domain)
   */
  handleErrors: Function;
}
