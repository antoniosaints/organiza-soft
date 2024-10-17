import qz from "qz-tray";

let selectedPrinter: string | null = null;

// Certificados assinados (adicione aqui os seus certificados)
const privateKey: string = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnMG5DhOdl1n9v
EHcVFAe7KFJERuRCoPIiP8pvKRbhvbz8foxccxL1l4OdPrbi5XACfxXJxDhWxE8R
5OuV3s21J6hkWFlHiUxx0lb1lmhsaOUMVxBjSr4kexLGysgr6vS8hI34Ta1EQ/UH
gIAH4iRp2O0xV8lNGq75vZxN7QRvwjHTXuemoJWHMnBK+ZOEbJn8cfCb+Ok4RBVY
CPumHwW93m52MYK+ZEvgmmVsUTRwOzowhAz0JMRv2/CU/sMBbCU/g29kyyJ7HbiJ
PCylwkbLw9f8sZxtkq0BYgqfDNQ9ExbaXMwDLQSkroBvwNodtjkKwburIFqRgpmh
HOp+YUsRAgMBAAECggEAGksGR1SOsqTWAm4ndPS9ulnoHU7IuBEw6JdDsSfFq+/V
1guYcA1AW0EbnV8cEqsQdaA5fKR92dRiv8C+0GEyGQfFHYB0yu+BC7Ll4/Fyt92o
KyKdwQUnoeODa6t1X5VNt0EGGnbPHWPzMqK5LOxZwtYCh+mZgdTmkI2xgKVTq1f9
ynXmMqI8yXMrLkf1qJQYyG+rlOgMfFxhv9X1oxgR0IfIRth9pJmgd3KA2xd1ZghG
c3hRMaBuZN9Rb8/YCW7zxxynidJM4uKMv0fUO0+8i75rXvJIVVMxCltU2ZMghM6p
ODLISHEP+KB3pQ+M1+l3sNJnToIopkiXcJ+9BMMf/wKBgQD97oeErXlyv/VsE4kk
SMYhrfplIRania2RWFOZVlqDWH8Ye+knWG5PP0r/+ydPNUQm8QC+CZDeO+DCrHgO
5vP2naAOfR3bGV1umv2B7pAJEoLp9WKB/tOUGE6NuShSYY7pg79vx/48j+oRLdHd
87aW3LDHT+o47u4EFPZaOH2u0wKBgQDpEnsk7PHrRKwoE2e2bnlX/EuL8OkLLXNS
9kpcqOgCZrEAMYT6hX+pX0fLmg8sovWvSsCKxEKZ0twaPZefz/kGZLyqRPvst+2a
qtrSYXgSbktIANRXDNMKOctWH9GCs4OO1cgfPd33v0x4jBj+aj/xgomklw+fsBrE
dQMlzK0YCwKBgCYtP2ieIB01aPN3uG2hF1Cm9HdR0zMbCuJIMkFibzdCDdGjh3kn
3WXCsUbs/or1CisEnsTzcTlILVF3VpF+/Xy9U/v5qYxwMtDXMnffYv5KLy53evjq
U+r3AJBkHwDLtA29hgGLQtjeFiXBCsVgx7nEsjs085TdryEj+am0xoiLAoGBAIfc
CABcRiB4JUovFZOYDg+lt3vZcF7dnY3Ml0gwBR3xMlgEhZlq3CGksrsSEKpaS5Bk
qJu7D3+PFFIPeSTlHCoH6pnuIFO6Wzx/P5LG0jEcLbHJGf2sMhCR499OKNhhP9yw
7TiY3Zye3Dqgn6kd0iw7hXR1wdu50cCW3MDZ8ERFAoGAY5iuGs6Q5UcWJvcD5qN2
NxEpPoHrefpPb7AcxThUUN62+yoHvt0o2brV1iSPuR7D6Ct45rMB9Oea1JFkr9Ss
tKevW2CkekKpkTPmUXUCNVSIIun330D4s7Ritel9zWDr5Mre0rWf/wdi1S4LNFgD
bhc95eoLPCLV1UDAR3wSo44=
-----END PRIVATE KEY-----
`;
const certificate: string = `
-----BEGIN CERTIFICATE-----
MIIECzCCAvOgAwIBAgIGAZKU/BSuMA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG
EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS
UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx
HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg
RGVtbyBDZXJ0MB4XDTI0MTAxNTExMDAwMVoXDTQ0MTAxNTExMDAwMVowgaIxCzAJ
BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD
VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs
IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog
VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn
MG5DhOdl1n9vEHcVFAe7KFJERuRCoPIiP8pvKRbhvbz8foxccxL1l4OdPrbi5XAC
fxXJxDhWxE8R5OuV3s21J6hkWFlHiUxx0lb1lmhsaOUMVxBjSr4kexLGysgr6vS8
hI34Ta1EQ/UHgIAH4iRp2O0xV8lNGq75vZxN7QRvwjHTXuemoJWHMnBK+ZOEbJn8
cfCb+Ok4RBVYCPumHwW93m52MYK+ZEvgmmVsUTRwOzowhAz0JMRv2/CU/sMBbCU/
g29kyyJ7HbiJPCylwkbLw9f8sZxtkq0BYgqfDNQ9ExbaXMwDLQSkroBvwNodtjkK
wburIFqRgpmhHOp+YUsRAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD
VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBQFIUjfgxcdFa6qBiRZ15q8LlonFjANBgkq
hkiG9w0BAQsFAAOCAQEAic0FWynHVgytIu+uz1uLL53LtKekC950wp68WeJvvgVu
X66ue3QTYzi8/AyRxpKaFaQxBkfCKZ1a2IyY1k4gycXa87F3+PscBEu/oC+23eGi
y5kiXxU4R+K8MSLvPMoDLvuqMrLnRAcKCw8OQvfrg+tyVueqht7EY4SPjQtVwQyb
aItNY7w/Kth70K8GjYlQ5lLIcwH3o3qNphO2/mB/UlpY84ESf6b59W85dPiw/CQB
bbsYyeb91LarmgaLgOefjKwth6l/Y5po35BCTUFASQOxKWp8fhwEW7UR3fJAgyef
Ucn/sPUh5KSj6LyS6Db3Df26k+HgTYsezt/Xr7QRQg==
-----END CERTIFICATE-----
`;

// Inicia a conexão com o QZ Tray
const startQz = (): Promise<void> => {
  return qz.websocket
    .connect()
    .then(() => {
      console.log("QZ Tray connected");
    })
    .catch((err: Error) => {
      console.error("Error connecting to QZ Tray:", err);
    });
};

// Assinatura de requisição
const signRequest = (toSign: string): Promise<string> => {
  return window.crypto.subtle
    .importKey(
      "raw",
      new TextEncoder().encode(privateKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )
    .then((key: CryptoKey) => {
      return window.crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(toSign)
      );
    })
    .then((signature: ArrayBuffer) => {
      return Buffer.from(new Uint8Array(signature)).toString("base64");
    });
};

// Define as promessas de assinatura e certificado
const setSignature = (): void => {
  qz.security.setCertificatePromise(() => {
    return Promise.resolve(certificate);
  });

  qz.security.setSignaturePromise((toSign: string) => {
    return new Promise((resolve, reject) => {
      signRequest(toSign).then(resolve).catch(reject);
    });
  });
};

// Lista as impressoras disponíveis
const listPrinters = (): Promise<string[]> => {
  return qz.printers
    .find()
    .then((printers: string[]) => {
      console.log("Available printers:", printers);
      return printers;
    })
    .catch((err: Error) => {
      console.error("Error listing printers:", err);
      return [];
    });
};

// Define a impressora selecionada
const setPrinter = (printerName: string): void => {
  selectedPrinter = printerName;
  console.log("Selected printer:", selectedPrinter);
};

// Envia dados para a impressora selecionada
const printData = (data: string[]): Promise<void> | void => {
  if (!selectedPrinter) {
    console.error("No printer selected");
    return;
  }

  const config = qz.configs.create(selectedPrinter);
  return qz
    .print(config, data)
    .then(() => {
      console.log("Print successful");
    })
    .catch((err: Error) => {
      console.error("Error printing:", err);
    });
};

export default {
  startQz,
  setSignature,
  listPrinters,
  setPrinter,
  printData,
};
