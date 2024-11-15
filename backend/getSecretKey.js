

    import fs from 'fs';
import bs58 from 'bs58';

// Read the keypair file (replace the path if necessary)
const keypair = JSON.parse(fs.readFileSync('/Users/temitopearoyewon/.config/solana/id.json'));

// Encode the full keypair (64 bytes) to Base58
const fullKeyBase58 = bs58.encode(Uint8Array.from(keypair));
console.log("Full Key (Private + Public) in Base58:", fullKeyBase58);
