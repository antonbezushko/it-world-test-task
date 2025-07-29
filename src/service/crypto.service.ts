import CryptoJS from 'crypto-js';

export class CryptoService {
  static encrypt(data: string, secret: string): string {
    return CryptoJS.AES.encrypt(data, secret).toString();
  }

  static decrypt(encrypted: string, secret: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypted, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static validateEncryptedData(encrypted: string, secret: string): boolean {
    try {
      const decrypted = this.decrypt(encrypted, secret);
      JSON.parse(decrypted);
      return true;
    } catch {
      return false;
    }
  }
}
