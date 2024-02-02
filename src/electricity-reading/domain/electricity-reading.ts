interface Period {
  year: number;
  month: number;
}

export class ElectricityReading {
  private readonly _clientId: string;
  private readonly _period: Period;
  private readonly _amount: number;

  constructor(clientId: string, period: Period, amount: number) {
    this._clientId = clientId;
    this._period = period;
    this._amount = amount;
  }

  get clientId(): string {
    return this._clientId;
  }

  get period(): Period {
    return this._period;
  }

  get amount(): number {
    return this._amount;
  }
}
