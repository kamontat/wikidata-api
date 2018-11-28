export type GetResultType = {
  id: string;
  type: string;
  labels: object;
  pageid: number;
  ns: number;
};

export type RawGetResultType = {
  entities: {
    [id: string]: GetResultType;
  };
};

export class GetResult {
  private id: string;

  constructor(result: GetResultType) {
    this.id = result.id;
  }
}
