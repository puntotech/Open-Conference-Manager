import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Talk } from "src/app/shared/models/talk.model";
import { User } from "src/app/shared/models/user";
import { UserService } from "../../../user/services/user.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-speaker-list",
  templateUrl: "./speaker-list.component.html",
  styleUrls: ["./speaker-list.component.css"],
})
export class SpeakerListComponent implements OnInit {
  speaker$ = this.userService.getSpeakers();

  constructor(
    private userService: UserService,
    private readonly liveAnnouncer: LiveAnnouncer,
    private readonly router: Router
  ) {}

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns: string[] = ["name", "email", "image"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.speaker$
      .pipe(tap((speakers) => (this.dataSource.data = speakers)))
      .subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  navigateToDetail({ id }) {
    this.router.navigate([`/dashboard/organiser/speaker/${id}`]);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce("Sorting cleared");
    }
  }
}
