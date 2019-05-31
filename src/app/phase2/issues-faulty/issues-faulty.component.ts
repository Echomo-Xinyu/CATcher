import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IssueService} from '../../core/services/issue.service';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {ErrorHandlingService} from '../../core/services/error-handling.service';
import {IssuesDataTable} from '../../shared/data-tables/IssuesDataTable';
import {Issue, STATUS} from '../../core/models/issue.model';
import {UserService} from '../../core/services/user.service';
import {UserRole} from '../../core/models/user.model';
import {PermissionService} from '../../core/services/permission.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-issues-faulty',
  templateUrl: './issues-faulty.component.html',
  styleUrls: ['./issues-faulty.component.css'],
})
export class IssuesFaultyComponent implements OnInit, OnChanges {
  issuesDataSource: IssuesDataTable;
  displayedColumns: string[];

  @Input() teamFilter: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public issueService: IssueService, private errorHandlingService: ErrorHandlingService, public userService: UserService,
              public permissions: PermissionService, private router: Router) {
    if (userService.currentUser.role === UserRole.Student) {
      this.displayedColumns = ['id', 'title', 'type', 'severity', 'responseTag', 'assignees', 'duplicatedIssues', 'actions'];
    } else if (userService.currentUser.role === UserRole.Tutor) {
      this.displayedColumns = ['id', 'title', 'teamAssigned', 'type', 'severity', 'responseTag', 'assignees', 'duplicatedIssues'];
    } else {
      this.displayedColumns = ['id', 'title', 'teamAssigned', 'type', 'severity', 'responseTag', 'assignees', 'duplicatedIssues',
        'actions'];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.teamFilter.isFirstChange()) {
      this.issuesDataSource.teamFilter = changes.teamFilter.currentValue;
    }
  }

  ngOnInit() {
    const filter = (issue: Issue): boolean => {
      return this.issueService.hasResponse(issue.id) &&
        (!!issue.duplicateOf && this.issueService.issues$.getValue().filter(childIssue => {
          return childIssue.duplicateOf === issue.id;
        }).length !== 0);
    };
    this.issuesDataSource = new IssuesDataTable(this.issueService, this.errorHandlingService, this.sort,
      this.paginator, this.displayedColumns, filter);
    this.issuesDataSource.loadIssues();
  }

  applyFilter(filterValue: string) {
    this.issuesDataSource.filter = filterValue;
  }
}
