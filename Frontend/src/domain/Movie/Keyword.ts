import { KeywordDTO } from "../dto/KeywordDTO";

export class Keyword {
    public keywordId: string;
    public name: string;
  
    constructor(data: KeywordDTO) {
      this.keywordId = data.keywordId;
      this.name = data.name;
    }
  }