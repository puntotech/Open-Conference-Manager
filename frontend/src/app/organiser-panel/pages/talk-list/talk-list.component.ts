import { Component, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Talk } from "src/app/shared/models/talk.model";
import { TalksService } from "src/app/talks/services/talks.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-talk-list",
  templateUrl: "./talk-list.component.html",
  styleUrls: ["./talk-list.component.css"],
})
export class TalkListComponent {
  public dataSource = new MatTableDataSource<Talk>();
  public displayedColumns: string[] = ["title", "status"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private talk$ = this.talksService.getTalks();

  constructor(
    private readonly talksService: TalksService,
    private readonly liveAnnouncer: LiveAnnouncer,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.talk$.pipe(tap((talks) => (this.dataSource.data = talks))).subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  navigateToDetail({ id }) {
    this.router.navigate([`/dashboard/talks/${id}`]);
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
