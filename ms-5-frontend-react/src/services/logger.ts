export class Logger {
  private static isDevelopment = import.meta.env.DEV;

  static info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data ?? "");
    }
  }

  static warn(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data ?? "");
    }
  }

  static error(message: string, error?: unknown): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error ?? "");
    }
  }

  static enter(methodName: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`>> Entering: ${methodName}`, data ?? "");
    }
  }

  static exit(methodName: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`<< Exiting: ${methodName}`, data ?? "");
    }
  }

  static apiRequest(
    method: string,
    url: string,
    payload?: unknown
  ): void {
    if (this.isDevelopment) {
      console.log(`[API REQUEST] ${method.toUpperCase()} ${url}`, payload ?? "");
    }
  }

  static apiResponse(
    method: string,
    url: string,
    response?: unknown
  ): void {
    if (this.isDevelopment) {
      console.log(
        `[API RESPONSE] ${method.toUpperCase()} ${url}`,
        response ?? ""
      );
    }
  }

  static apiError(
    method: string,
    url: string,
    error?: unknown
  ): void {
    if (this.isDevelopment) {
      console.error(
        `[API ERROR] ${method.toUpperCase()} ${url}`,
        error ?? ""
      );
    }
  }
}