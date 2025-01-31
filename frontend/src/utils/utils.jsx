export default function shortenAddress(address) {
  if (address) {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  }
  return undefined;
}
