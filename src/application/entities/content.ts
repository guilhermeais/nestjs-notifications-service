export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    if (!isContentLengthValid) {
      throw new Error('Content length must be between 5 and 240 characters');
    }

    this.content = content;
  }

  [Symbol.toPrimitive](): string {
    return this.content;
  }

  public toString(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
