export class ApiError extends Error {
  constructor(
    public type: string,
    public message: string,
    public data: Record<string, unknown>
  ) {
    super(message);
  }
}