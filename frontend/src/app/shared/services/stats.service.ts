import { map, mergeAll, reduce, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Talk } from "src/app/talks/models/talk";
import { TalksService } from "src/app/talks/services/talks.service";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  private videogames = this.talksService.getTalks();
  constructor(private talksService: TalksService) {}

  /*   totalReviews() {
    return this.videogames.pipe(
      mergeAll(),
      map(({ reviews }) => reviews),
      reduce((acc: number, reviews: Review[]) => {
        return acc + reviews.length;
      }, 0)
    );
  }

  averageGrade(reviews: Review[]) {
    const average =
      reviews.reduce((acc: number, review: Review) => acc + review.grade, 0) /
      reviews.length;

    return +average.toFixed(1);
  }

  sortGrades(grades: number[]) {
    return grades
      .sort((a, b) => a - b)
      .reduce(
        (acc, grade) => acc.set(`${grade}`, acc.get(`${grade}`) + 1),
        new Map<string, number>([
          ["0", 0],
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
          ["6", 0],
          ["7", 0],
          ["8", 0],
          ["9", 0],
          ["10", 0],
        ])
      );
  } */
}
