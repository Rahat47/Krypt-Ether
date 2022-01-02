export const shortenAddress = (address) => {
    if (address.length > 8) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
}