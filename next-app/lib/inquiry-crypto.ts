import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  hkdfSync,
  randomBytes,
} from "node:crypto";

const VERSION = "oaktime-inquiry-v1";

function masterKey() {
  const encoded = process.env.INQUIRY_ENCRYPTION_KEY || "";
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32 || key.toString("base64") !== encoded)
    throw new Error("Inquiry encryption is not configured");
  return key;
}

export function encryptionConfigured() {
  try {
    masterKey();
    return true;
  } catch {
    return false;
  }
}

// Derive separate encryption and fingerprint keys from the private master key.
function keyFor(purpose: string) {
  return Buffer.from(hkdfSync("sha256", masterKey(), VERSION, purpose, 32));
}

export function inquiryHash(value: string) {
  return createHmac("sha256", keyFor("fingerprint"))
    .update(value)
    .digest("hex");
}

export function encryptRecord(recordKey: string, value: unknown) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyFor("record"), iv, {
    authTagLength: 16,
  });
  // Bind ciphertext to its record: moving it to a different inquiry must fail.
  cipher.setAAD(Buffer.from(`${VERSION}:${recordKey}`));
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return JSON.stringify({
    version: VERSION,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  });
}

export function decryptRecord<T>(recordKey: string, stored: string): T {
  try {
    const envelope = JSON.parse(stored);
    if (
      !envelope ||
      envelope.version !== VERSION ||
      typeof envelope.iv !== "string" ||
      typeof envelope.tag !== "string" ||
      typeof envelope.ciphertext !== "string"
    )
      throw new Error("Invalid envelope");
    const iv = Buffer.from(envelope.iv, "base64");
    const tag = Buffer.from(envelope.tag, "base64");
    if (iv.length !== 12 || tag.length !== 16)
      throw new Error("Invalid envelope");
    const decipher = createDecipheriv("aes-256-gcm", keyFor("record"), iv, {
      authTagLength: 16,
    });
    decipher.setAAD(Buffer.from(`${VERSION}:${recordKey}`));
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(envelope.ciphertext, "base64")),
      decipher.final(),
    ]);
    return JSON.parse(plaintext.toString("utf8")) as T;
  } catch {
    // No plaintext fallback, and no customer details or credentials in errors.
    throw new Error("Inquiry record could not be authenticated");
  }
}
