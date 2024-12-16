import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { Concept } from "src/concept/concept.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ConceptService {
  constructor(
    @InjectModel(Concept.name) private conceptModel: Model<Concept>,
    private jwtService: JwtService
  ) {}

  async getAllConcepts(token: string): Promise<Concept[]> {
    const decodedToken: any = this.jwtService.decode(token);
    const concepts = await this.conceptModel.find({ user: decodedToken.sub }).populate("words", "value language");
    if (!concepts || concepts.length == 0) {
      throw new NotFoundException("Words data not found!");
    }
    return concepts;
  }

  async getConceptWords(conceptName: string): Promise<string[]> {
    const concept = await this.conceptModel
      .findOne({ name: conceptName })
      .populate("words", "value")
      .exec();
    if (!concept) {
      throw new NotFoundException("Concept was not found!");
    }
    return concept.words.map((word) => word.value);
  }

  async remove(conceptId: string): Promise<Concept> {
    return this.conceptModel.findOneAndDelete({ _id: conceptId });
  }
}
