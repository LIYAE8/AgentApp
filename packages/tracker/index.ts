export class Tracker {
  private config: any
  private userId: string | null = null

  constructor(config: any) {
    this.config = config
  }

  setUserId(userId: string) {
    this.userId = userId
  }
}
