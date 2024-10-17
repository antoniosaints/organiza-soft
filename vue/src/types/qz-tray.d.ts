declare module "qz-tray" {
  // Tipagem para qz-tray

  export interface Config {
    create(printerName: string): Config;
  }

  export interface Printers {
    find(): Promise<string[]>;
  }

  export interface WebSocket {
    connect(): Promise<void>;
  }

  export interface Security {
    setCertificatePromise(callback: () => Promise<string>): void;
    setSignaturePromise(callback: (toSign: string) => Promise<string>): void;
  }

  export interface QZTray {
    websocket: WebSocket;
    printers: Printers;
    configs: Config;
    security: Security;
    print(config: Config, data: string[]): Promise<void>;
  }

  const qz: QZTray;
  export default qz;
}
