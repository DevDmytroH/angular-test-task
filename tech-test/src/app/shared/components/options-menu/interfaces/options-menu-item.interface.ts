export interface IOptionsMenuItem {
  icon: string,
  text: string,
  isDisabled?: boolean,
  handler: () => void
}
