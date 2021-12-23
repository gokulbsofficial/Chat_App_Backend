class ErrorResponse extends Error {
  code?: number | string;
  statusCode?: number;
  // function getErrorData(): { success: boolean; message: string };

  constructor(message?: string, code?: number | string, statusCode?: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }
  }

  public getErrorData = (): { success: boolean; message: string } => {
    if (this.code === 11000) {
      this.message = `Duplicate field value entered`;
    }

    if (this.code === "EAI_AGAIN") {
      this.message = `Check your Internet Connection`;
    }

    if (this.code === 20404) {
      this.message = `OTP request not found, Try again!!`;
    }
    return {
      success: false,
      message: this.message || "Server Error",
    };
  }
}

export default ErrorResponse;
